import { Request, Response } from 'express';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import ClientWrapper from '@dynamodb/wrapper';
import DataLoader from 'dataloader';
//import { Post } from '@controller/post/model';
import { User } from '@controller/user/model';

export interface SessionRequest extends Request {
  session: Express.Session;
}

export type Loaders = {
  //posts: DataLoader<string, Post>;
  users: DataLoader<string, User>;
};

export type ApolloResolverContext = {
  loaders: Loaders;
  dynamo: DynamoDB;
  mapper: DataMapper;
  db: ClientWrapper;
  res: Response;
  req: SessionRequest;
};
