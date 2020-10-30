import { crudResolverFactory } from '@controller/base/resolver';
import { ApolloResolverContext } from '@types';
import { sleep } from '@utils';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { PostInput } from './input';
import { Post } from './model';

const PostResolverBase = crudResolverFactory<Post, PostInput>(Post, PostInput);

@Resolver(Post)
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
}
