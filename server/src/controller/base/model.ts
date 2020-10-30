import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { Field, ID, ObjectType } from 'type-graphql';
import { DYNAMO_TABLE } from '@config/constants';
import {
  hashKeyOptions,
  rangeKeyOptions,
  dataKeyOptions,
  typeKeyOptions,
  dateKeyOptions,
} from '@controller/options';

export type ModelTypes = 'User' | 'Post' | '';
export type ModelBaseType<T> = { new (): T; __type__: ModelTypes };

@ObjectType({ isAbstract: true })
@table(DYNAMO_TABLE)
export class BaseRecord {
  static __type__: ModelTypes = '';

  @Field(() => ID)
  @hashKey(hashKeyOptions())
  id: string;

  @Field(() => ID)
  @rangeKey(rangeKeyOptions())
  range: string;

  @Field(() => String)
  @attribute(dataKeyOptions())
  data: string;

  @Field(() => String)
  @attribute(typeKeyOptions())
  type: string;

  @Field(() => Date)
  @attribute(dateKeyOptions())
  createdAt: Date;

  @Field(() => Date)
  @attribute(dateKeyOptions())
  updatedAt: Date;
}
