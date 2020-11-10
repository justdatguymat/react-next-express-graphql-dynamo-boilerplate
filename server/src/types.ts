import { Request, Response } from 'express';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import DynamoWrapper from '@dynamodb/wrapper';
import DataLoader from 'dataloader';
//import { Post } from '@controller/post/model';
import { User } from '@controller/user/model';

export type SessionRequest = Express.Session & {
  userId?: string;
  userRange?: string;
};
export type RequestWithSession = Request & {
  session: SessionRequest;
};

export type Loaders = {
  users: DataLoader<string, User>;
};

export type ApolloResolverContext = {
  user: User | null;
  loaders: Loaders;
  dynamo: DynamoDB;
  mapper: DataMapper;
  db: DynamoWrapper;
  res: Response;
  req: RequestWithSession;
};
