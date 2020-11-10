import { COOKIE_NAME, HASH_SALT } from '@config/constants';
import { crudResolverFactory } from '@controller/base/resolver';
import { OperationError, UserAlreadyExistError, WrongPasswordError } from '@controller/errors';
import { Post } from '@controller/post/model';
import { Log } from '@logger';
import { ApolloResolverContext } from '@types';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { LoginInput, RegisterInput, UserInput } from './input';
import { User } from './model';

const UserResolverBase = crudResolverFactory<User, UserInput>(User, UserInput);

@Resolver(() => User)
export class UserResolver extends UserResolverBase {
  @FieldResolver(() => [Post], { name: 'posts' })
  async getPosts(@Ctx() { db }: ApolloResolverContext, @Root() user: User): Promise<Post[]> {
    const rangePrefix = 'Post#' + user.id;
    const userPosts = await db.getAll<Post>(Post, rangePrefix);

    return userPosts;
  }

  @Authorized()
  @Query(() => User)
  async myself(@Ctx() { user }: ApolloResolverContext): Promise<User> {
    if (!user) {
      throw new AuthenticationError('You must be logged in');
    }
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { db, req }: ApolloResolverContext
  ): Promise<User> {
    const { email: data } = input;
    let user = await db.get<User>(User, { data, range: User.__type__ });

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
    const user = await db.get<User>(User, { data, range: 'User' });

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

  @Authorized()
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
