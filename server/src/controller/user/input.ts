//import { IsEmailAlreadyExist } from '@resolvers/validators';
import { BaseRecordInput } from '@controller/base/input';
import { User } from '@controller/user/model';
import { IsEmail, Length, Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput extends BaseRecordInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({ domain_specific_validation: false }, { message: 'Invalid email address' })
  //@IsUserExist()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @Length(2, 30, { message: 'First name must be 2 letters long' })
  firstName!: string;

  @Field()
  @Length(2, 30, { message: 'Last name must be 2 letters long' })
  lastName!: string;

  //@IsEmailAlreadyExist()
  @IsEmail({ domain_specific_validation: false }, { message: 'Invalid email address' })
  @Field()
  email!: string;

  @Field()
  @Length(8, 45, { message: 'Password must be at least 8 letters long' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lower case letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one upper case letter' })
  password: string;
}
