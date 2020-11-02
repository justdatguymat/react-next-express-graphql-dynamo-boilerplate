import { crudResolverFactory } from '@controller/base/resolver';
import { OperationError } from '@controller/errors';
import { User } from '@controller/user/model';
import { ApolloResolverContext } from '@types';
import { sleep } from '@utils';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { PostInput } from './input';
import { Post } from './model';

const PostResolverBase = crudResolverFactory<Post, PostInput>(Post, PostInput);

@Resolver(() => Post)
export class PostResolver extends PostResolverBase {
  @Query(() => [Post])
  async getUserPosts(
    @Ctx() { db }: ApolloResolverContext,
    @Arg('user', () => String, { nullable: true }) userId?: string,
    @Arg('lastKey', () => PostInput, { nullable: true }) startKey?: PostInput
  ): Promise<Post[]> {
    const posts = await db.pagination<Post>(Post, userId, 'ACTIVE', { startKey });
    await sleep(1500);
    return posts;
  }

  @FieldResolver(() => User, { name: 'author' })
  async getAuthor(@Ctx() { loaders }: ApolloResolverContext, @Root() post: Post): Promise<User> {
    const owner = post.range.split('#')[1]; // Post#user_sdfsdfsdf => user_sdfsdfsdf
    const author = await loaders.users.load(owner);

    if (!author) {
      throw new OperationError('Author not found');
    }

    return author;
  }
}
