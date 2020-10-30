import AWS, { DynamoDB } from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { TableCreator } from './table';
import ClientWrapper from './wrapper';
import { logStream } from '@logger';
import { PROD } from '@config/constants';
/*
import mockdata from '../MOCK_DATA.json';
import { Post } from '@controller/post/model';
import { sleep } from '@utils';
 */

export let mapper: DataMapper;
export let client: DynamoDB;
export let wrapper: ClientWrapper;

type DynamoTableParams = {
  table: string;
  schema: CreateTableInput;
};

type DynamoClientParams = {
  endpoint: string;
  region: string;
};

type DynamoTuple = [DynamoDB, DataMapper, ClientWrapper];

export function createDynamoTable(options: DynamoClientParams & DynamoTableParams): void {
  const { endpoint, region, table, schema } = options;
  client = new AWS.DynamoDB({
    endpoint: endpoint,
    region: region,
    logger: logStream,
    sslEnabled: PROD,
  });
  TableCreator.create(client, table, schema);
  /*
  mapper = new DataMapper({ client });
  wrapper = new ClientWrapper(mapper);
  for (let index = 0; index < mockdata.length; index++) {
    const element = mockdata[index];
    const post = Object.assign(new Post(), element);
    post.range = 'Post#user_kgvdsa90epipp4n9kc';
    console.log('mock', index);
    wrapper.create(post);
  }
   */
}

export function initDynamoClient(config: DynamoClientParams): DynamoTuple {
  const { endpoint, region } = config;
  client = new AWS.DynamoDB({
    endpoint: endpoint,
    region: region,
    logger: logStream,
    sslEnabled: PROD,
  });
  mapper = new DataMapper({ client });
  wrapper = new ClientWrapper(mapper);

  return [client, mapper, wrapper];
}
