import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { DYNAMO_TABLE } from '@config/constants';
import { BaseRecord, ModelTypes } from '@controller/base/model';
import { Post } from '@controller/post/model';
import { hashKeyOptions, rangeKeyOptions, typeKeyOptions } from '@controller/options';
import { Field, ID, ObjectType } from 'type-graphql';
import { Role } from '@auth';

@ObjectType('User')
@table(DYNAMO_TABLE)
export class User extends BaseRecord {
  static __type__: ModelTypes = 'User';

  @Field(() => ID)
  @hashKey(hashKeyOptions(User.__type__))
  id: string;

  @Field(() => String)
  @hashKey(rangeKeyOptions(User.__type__))
  range: string;

  @Field(() => String)
  @attribute(typeKeyOptions(User.__type__))
  type: string;

  @Field(() => String)
  @attribute({ defaultProvider: () => Role.MEMBER })
  role: string;

  @Field(() => String)
  @attribute()
  firstName: string;

  @Field(() => String)
  @attribute()
  lastName: string;

  @attribute()
  password: string;

  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
