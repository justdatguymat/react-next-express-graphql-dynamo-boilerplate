import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Log } from '@logger';
import { REDIS_URL } from '@config/constants';

export const RedisStore = connectRedis(session);
export const client = redis.createClient({ url: REDIS_URL });
client.on('error', (err) => Log.error('RedisClient:', err));
client.on('connect', () => Log.info('Redis client connected'));

export const redisStore = new RedisStore({
  client: client,
  disableTTL: false,
});

/*
export class Auth {
  wrapper: ClientWrapper

  constructor(wrapper: ClientWrapper) {
    this.wrapper = wrapper;
  }

  authUser(email: string, password: string) : boolean {

  }
}
*/
