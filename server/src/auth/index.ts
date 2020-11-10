import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Log } from '@logger';
import { REDIS_URL } from '@config/constants';
import { AuthChecker } from 'type-graphql';
import { ApolloResolverContext, SessionRequest } from '@types';
import DynamoWrapper from '@dynamodb/wrapper';
import { User } from '@controller/user/model';

export enum Role {
  MEMBER = 'Member',
  ADMIN = 'Admin',
}

export const RedisStore = connectRedis(session);
export const client = redis.createClient({ url: REDIS_URL });
client.on('error', (err) => Log.error('RedisClient:', err));
client.on('connect', () => Log.info('Redis client connected'));

export const redisStore = new RedisStore({
  client: client,
  disableTTL: false,
});

export const authChecker: AuthChecker<ApolloResolverContext> = ({ context }) => {
  return !!context.user;
};

export const getSessionUser = async (
  session: SessionRequest,
  db: DynamoWrapper
): Promise<User | null> => {
  const { userId: id, userRange: range } = session;
  if (!id || !range) {
    return null;
  }
  return await db.get(User, { id, range });
};
