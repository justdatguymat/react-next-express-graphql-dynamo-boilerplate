import { DataMapper } from '@aws/dynamodb-data-mapper';
import { User } from '@controller/user/model';
import { Loaders } from '@types';
import DataLoader from 'dataloader';

export function createLoaders(mapper: DataMapper): Loaders {
  const usersLoader = new DataLoader<string, User>(async (userIds) => {
    const range = 'User';
    const toFetch = userIds.map((id) => Object.assign(new User(), { id, range }));
    const users: User[] = [];
    for await (const user of mapper.batchGet(toFetch)) {
      users.push(user);
    }
    return users;
  });

  return {
    users: usersLoader,
  };
}
