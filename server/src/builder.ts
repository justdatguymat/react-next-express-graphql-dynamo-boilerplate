import 'reflect-metadata';
import { ExpressApp } from '@express-app';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import {
  DYNAMO_URL,
  DYNAMO_REGION,
  PROD,
  SESSION_SECRET,
  COOKIE_NAME,
  CORS_URL,
  PORT,
} from '@config/constants';
import { PostResolver } from '@controller/post/resolver';
import { UserResolver } from '@controller/user/resolver';
import { initDynamoClient } from '@dynamodb';
import DynamoWrapper from '@dynamodb/wrapper';
import { Log } from '@logger';
import { HttpServer } from '@server';
import { ApolloResolverContext, RequestWithSession } from '@types';
import { ApolloServer } from 'apollo-server-express';
import { DynamoDB } from 'aws-sdk';
import { buildSchema } from 'type-graphql';
import { createLoaders } from '@loader';
import { authChecker, getSessionUser } from '@auth';

type BuildObjects = {
  apollo: ApolloServer;
  dynamoClient: DynamoDB;
  dynamoMapper: DataMapper;
  dynamoWrapper: DynamoWrapper;
  express: ExpressApp;
  server: HttpServer;
};

export async function buildServices(): Promise<BuildObjects> {
  const [dynamoClient, dynamoMapper, dynamoWrapper] = initDynamoClient({
    endpoint: DYNAMO_URL,
    region: DYNAMO_REGION,
  });

  const apollo = new ApolloServer({
    logger: Log,
    playground: !PROD,
    debug: !PROD,
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      authChecker: authChecker,
      validate: {
        validationError: {
          value: !PROD,
          target: !PROD,
        },
      },
    }),
    context: async ({ req, res }): Promise<ApolloResolverContext> => {
      const reqWithSession = { ...req } as RequestWithSession;
      const user = await getSessionUser(reqWithSession.session, dynamoWrapper);
      return {
        user: user,
        loaders: createLoaders(dynamoMapper),
        dynamo: dynamoClient,
        mapper: dynamoMapper,
        db: dynamoWrapper,
        req: reqWithSession,
        res,
      };
    },
  });

  const express = new ExpressApp({
    production: PROD,
    sessionSecret: SESSION_SECRET,
    cookieName: COOKIE_NAME,
    corsOrigin: CORS_URL,
  });

  // order of applying middlewares is important
  express.setupMiddlewares();
  apollo.applyMiddleware({
    app: express.getApp(),
    cors: false,
  });
  express.setupErrorHandlers();
  const server = new HttpServer(express.getApp(), PORT);
  server.setup().start();

  return { dynamoWrapper, dynamoMapper, dynamoClient, apollo, express, server };
}
