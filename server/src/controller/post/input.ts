import { BaseRecordInput } from '@controller/base/input';
import { Field, InputType } from 'type-graphql';
import { Post } from './model';

@InputType()
export class PostInput extends BaseRecordInput implements Partial<Post> {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;
}
