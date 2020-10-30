import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { DYNAMO_TABLE } from '@config/constants';
import { BaseRecord, ModelTypes } from '@controller/base/model';
import { hashKeyOptions, typeKeyOptions } from '@controller/options';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@table(DYNAMO_TABLE)
export class Post extends BaseRecord {
  static __type__: ModelTypes = 'Post';

  @Field(() => ID)
  @hashKey(hashKeyOptions(Post.__type__))
  id: string;

  @Field(() => String)
  @attribute(typeKeyOptions(Post.__type__))
  type: string;

  @Field(() => String)
  @attribute()
  title: string;

  @Field(() => String)
  @attribute()
  content: string;
}
