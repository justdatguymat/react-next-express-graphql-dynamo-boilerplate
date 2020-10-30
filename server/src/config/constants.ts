import { join } from 'path';

export const APP_NAME = process.env.APP_NAME || 'expressApp';
export const PROD = process.env.NODE_ENV === 'production';

export const PORT: number = parseInt(process.env.PORT || '9001');

export const CORS_URL = process.env.CORS_URL || 'http://localhost:9000/';

export const LOG_PATH = process.env.LOG_PATH || join('.', 'logs');
export const LOG_LEVEL = process.env.LOG_LEVEL || 'trace';

export const DYNAMO_TABLE = process.env.DYNAMO_TABLE || APP_NAME;
export const DYNAMO_REGION = process.env.DYNAMO_REGION || 'eu-west-1';
export const DYNAMO_URL = process.env.DYNAMO_URL || 'https://dynamodb.eu-west-1.amazonaws.com';

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretsession';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'sid';
export const HASH_SALT = process.env.HASH_SALT || 4;

const CONSTANTS = {
  APP_NAME,
  PROD,
  PORT,
  CORS_URL,
  LOG_PATH,
  LOG_LEVEL,
  DYNAMO_TABLE,
  DYNAMO_REGION,
  DYNAMO_URL,
  REDIS_URL,
  SESSION_SECRET,
  COOKIE_NAME,
  HASH_SALT,
};

export default CONSTANTS;
