import { OperationError } from '@controller/errors';
import { ApolloResolverContext } from '@types';
import { capitalizeFirstChar } from '@utils';
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { KeyArgs } from './input';
import { BaseRecord, ModelBaseType } from './model';
/*
interface CrudResolverInterface<T, I> {
  get: (ctx: ApolloResolverContext, keys: KeyArgs) => Promise<T>;
  getAll(ctx: ApolloResolverContext): Promise<T[]>;
  create(ctx: ApolloResolverContext, keys: KeyArgsOptional, input: I): Promise<T>;
  update(ctx: ApolloResolverContext, keys: KeyArgs, input: I): Promise<T>;
  delete(ctx: ApolloResolverContext, keys: KeyArgs): Promise<T>;
}
*/

export type ModelInputTypes<T> = { new (): Partial<T> };

export function crudResolverFactory<T extends BaseRecord, I>(
  ModelClass: ModelBaseType<T>,
  InputClass: ModelInputTypes<I>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const name = capitalizeFirstChar(ModelClass.__type__);

  @Resolver({ isAbstract: true })
  abstract class CrudResolver {
    @Query(() => ModelClass, { name: `get${name}` })
    async get(
      @Ctx() { db }: ApolloResolverContext,
      @Args(() => KeyArgs) keyAttr: KeyArgs
    ): Promise<T> {
      const item = await db.get<T>(ModelClass, keyAttr);

      if (!item) {
        throw new OperationError(`${name} not found`);
      }
      return item;
    }

    @Query(() => [ModelClass], { name: `list${name}s` })
    async list(@Ctx() { db }: ApolloResolverContext): Promise<T[]> {
      const items: T[] = await db.getAll<T>(ModelClass);
      return items;
    }

    @Mutation(() => ModelClass, { name: `create${name}` })
    async create(
      @Ctx() { db, req }: ApolloResolverContext,
      @Arg('input', () => InputClass) input: Partial<I>
    ): Promise<T> {
      const { userId } = req.session;
      const range = `${ModelClass.__type__}#${userId}`;
      let item: T | null;
      item = Object.assign(new ModelClass(), { range, ...input });
      item = await db.create(item);
      if (!item) {
        throw new OperationError(`${name} not created`);
      }
      return item;
    }

    @Mutation(() => ModelClass, { name: `update${name}` })
    async update(
      @Ctx() { db }: ApolloResolverContext,
      @Args(() => KeyArgs) keyAttr: KeyArgs,
      @Arg('input', () => InputClass) input: Partial<I>
    ): Promise<T> {
      let item: T | null;
      item = Object.assign(new ModelClass(), { ...keyAttr, ...input });
      item = await db.update<T>(item);
      if (!item) {
        throw new OperationError(`${name} not updated`);
      }
      return item;
    }

    @Authorized()
    @Mutation(() => ModelClass, { name: `delete${name}` })
    async delete(
      @Ctx() { db }: ApolloResolverContext,
      @Args(() => KeyArgs) keyAttr: KeyArgs
    ): Promise<T> {
      const item: T | null = await db.delete(ModelClass, keyAttr);
      if (!item) {
        throw new OperationError(`${name} not deleted`);
      }
      return item;
    }
  }

  return CrudResolver;
}
