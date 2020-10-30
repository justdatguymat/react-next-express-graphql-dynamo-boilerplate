import {
  BinaryType,
  CustomType,
  DateType,
  NumberType,
  SchemaType,
  StringType,
} from '@aws/dynamodb-data-marshaller';
import { generateId, getEpochSeconds } from '@utils';
import { ModelTypes } from './base/model';
import { GSI, LSI } from '@config/tableSchema';

export type DynamoSecondaryIndexes = GSI | LSI;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HashKeyOptions = Partial<BinaryType | CustomType<any> | DateType | NumberType | StringType>;

export const hashKeyOptions = (type: ModelTypes = ''): HashKeyOptions => ({
  type: 'String',
  defaultProvider: () => generateId(type),
  indexKeyConfigurations: {
    [LSI.IdData]: 'HASH',
  },
});

export const rangeKeyOptions = (defaultValue = ''): HashKeyOptions => ({
  type: 'String',
  defaultProvider: () => defaultValue,
  indexKeyConfigurations: {
    [GSI.RangeData]: 'HASH',
  },
});

export const dataKeyOptions = (): Partial<SchemaType> => ({
  type: 'String',
  defaultProvider: () => `ACTIVE#${getEpochSeconds()}`,
  indexKeyConfigurations: {
    [GSI.RangeData]: 'RANGE',
    [LSI.IdData]: 'RANGE',
  },
});

export const typeKeyOptions = (type: ModelTypes = ''): Partial<SchemaType> => ({
  type: 'String',
  defaultProvider: () => type,
  indexKeyConfigurations: {
    [GSI.TypeRange]: 'HASH',
  },
});

export const dateKeyOptions = (): Partial<SchemaType> => ({
  type: 'Date',
  defaultProvider: () => new Date(),
});
