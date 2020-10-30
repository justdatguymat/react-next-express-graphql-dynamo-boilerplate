import { COOKIE_NAME, HASH_SALT } from '@config/constants';
import { crudResolverFactory } from '@controller/base/resolver';
import { OperationError, UserAlreadyExistError, WrongPasswordError } from '@controller/errors';
import { Log } from '@logger';
import { ApolloResolverContext } from '@types';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { LoginInput, RegisterInput, UserInput } from './input';
import { User } from './model';

const UserResolverBase = crudResolverFactory<User, UserInput>(User, UserInput);

@Resolver(User)
export class UserResolver extends UserResolverBase {
  @Query(() => User)
  async myself(@Ctx() { db, req }: ApolloResolverContext): Promise<User> {
    const { userId: id, userRange: range } = req.session;
    if (!id || !range) {
      throw new AuthenticationError('You must be logged in');
    }

    const user = await db.get<User>(User, { id, range });
    if (!user) {
      throw new OperationError('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { db, req }: ApolloResolverContext
  ): Promise<User> {
    const { email: data } = input;
    let user = await db.get<User>(User, { data, range: 'profile' });

    if (user) {
      throw new UserAlreadyExistError();
    }

    input.password = await bcrypt.hash(input.password, HASH_SALT);

    user = Object.assign(new User(), { ...input, data });
    user = await db.create<User>(user);

    if (!user) {
      throw new OperationError('User not created');
    }

    req.session.userId = user.id;
    req.session.userRange = user.range;

    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg('input') input: LoginInput,
    @Ctx() { db, req }: ApolloResolverContext
  ): Promise<User> {
    const { email: data } = input;
    const user = await db.get<User>(User, { data, range: 'internal' });

    if (!user) {
      throw new OperationError('User not found');
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new WrongPasswordError();
    }

    req.session.userId = user.id;
    req.session.userRange = user.range;

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: ApolloResolverContext): Promise<boolean> {
    res.clearCookie(COOKIE_NAME);
    return new Promise<boolean>((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          Log.warn('Failed to destroy session: ', err);
        }
        resolve(true);
      })
    );
  }
}
