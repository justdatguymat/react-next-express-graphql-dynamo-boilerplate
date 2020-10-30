import { Request, Response } from 'express';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import ClientWrapper from '@dynamodb/wrapper';

export interface SessionRequest extends Request {
  session: Express.Session;
}

export type ApolloResolverContext = {
  dynamo: DynamoDB;
  mapper: DataMapper;
  db: ClientWrapper;
  res: Response;
  req: SessionRequest;
};
