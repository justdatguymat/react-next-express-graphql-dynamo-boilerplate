import { ArgsType, Field, ID, InputType } from 'type-graphql';
import { BaseRecord } from './model';

@InputType({ isAbstract: true })
export abstract class BaseRecordInput implements Partial<BaseRecord> {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  range: string;

  @Field(() => String, { nullable: true })
  data: string;
}

@ArgsType()
export class KeyArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  range?: string;

  @Field(() => String, { nullable: true })
  data?: string;
}
