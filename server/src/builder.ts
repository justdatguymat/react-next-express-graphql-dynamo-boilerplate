import 'reflect-metadata';
import { ExpressApp } from '@app';
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
import ClientWrapper from '@dynamodb/wrapper';
import { Log } from '@logger';
import { HttpServer } from '@server';
import { ApolloResolverContext, Loaders, SessionRequest } from '@types';
import { ApolloServer } from 'apollo-server-express';
import { DynamoDB } from 'aws-sdk';
import { buildSchema } from 'type-graphql';
import DataLoader from 'dataloader';
import { User } from '@controller/user/model';

type BuildObjects = {
  apollo: ApolloServer;
  dynamoClient: DynamoDB;
  dynamoMapper: DataMapper;
  dynamoWrapper: ClientWrapper;
  express: ExpressApp;
  server: HttpServer;
};

function createLoaders(mapper: DataMapper): Loaders {
  const usersLoader = new DataLoader<string, User>(async (userIds) => {
    const range = 'profile';
    const toFetch = userIds.map((id) => Object.assign(new User(), { id, range }));
    const users: User[] = [];
    for await (const user of mapper.batchGet(toFetch)) {
      users.push(user);
    }
    return users;
  });

  return {
    users: usersLoader,
  };
}

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
      validate: {
        validationError: {
          value: !PROD,
          target: !PROD,
        },
      },
    }),
    context: ({ req, res }): ApolloResolverContext => {
      const sessionReq = { ...req } as SessionRequest;
      return {
        loaders: createLoaders(dynamoMapper),
        dynamo: dynamoClient,
        mapper: dynamoMapper,
        db: dynamoWrapper,
        req: sessionReq,
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
