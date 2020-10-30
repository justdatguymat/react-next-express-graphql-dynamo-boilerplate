import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { DYNAMO_TABLE } from '@config/constants';

const CAP_UNITS_TABLE = 10;
const CAP_UNITS_INDEX = 5;

export enum LSI {
  IdData = 'id-data-local',
  IdType = 'id-type-local',
}
export enum GSI {
  RangeData = 'range-data-global',
  TypeRange = 'type-range-global',
}

export const TABLE_SCHEMA: CreateTableInput = {
  TableName: DYNAMO_TABLE,
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' },
    { AttributeName: 'range', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'range', AttributeType: 'S' },
    { AttributeName: 'data', AttributeType: 'S' },
    { AttributeName: 'type', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: CAP_UNITS_TABLE,
    WriteCapacityUnits: CAP_UNITS_TABLE,
  },
  LocalSecondaryIndexes: [
    {
      IndexName: LSI.IdData,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'data', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: LSI.IdType,
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'type', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: GSI.RangeData,
      KeySchema: [
        { AttributeName: 'range', KeyType: 'HASH' },
        { AttributeName: 'data', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: CAP_UNITS_INDEX,
        WriteCapacityUnits: CAP_UNITS_INDEX,
      },
    },
    {
      IndexName: GSI.TypeRange,
      KeySchema: [
        { AttributeName: 'type', KeyType: 'HASH' },
        { AttributeName: 'range', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: CAP_UNITS_INDEX,
        WriteCapacityUnits: CAP_UNITS_INDEX,
      },
    },
  ],
};
