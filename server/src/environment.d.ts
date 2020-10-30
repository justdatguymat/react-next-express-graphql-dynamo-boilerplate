declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // required
      NODE_ENV: 'development' | 'production';
      DYNAMO_TABLE: string;

      // optional
      APP_NAME?: string;
      PORT?: string;
      CORS_URL?: string;
      LOG_PATH?: string;
      LOG_LEVEL?: 'all' | 'mark' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off';
      DYNAMO_REGION?: string;
      DYNAMO_URL?: string;
      REDIS_URL?: string;
      COOKIE_NAME?: string;
    }
  }
}

export {};
