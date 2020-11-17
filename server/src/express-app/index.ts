import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import routes from '@routes';
import { redisStore } from '@auth';
import { Log, logStream, morganTokens } from '@logger';
import { errorHandler, logError, logRequest, notFoundHandler } from '@middleware';

type ExpressAppOptions = {
  production?: boolean;
  sessionSecret: string;
  cookieName: string;
  corsOrigin: string;
};

class ExpressApp {
  private target: Application;
  private production: boolean;
  private sessionSecret: string;
  private cookieName: string;
  private corsOrigin: string;

  constructor({ production = false, sessionSecret, cookieName, corsOrigin }: ExpressAppOptions) {
    Log.info('Initializing the express app');
    this.target = express();
    this.production = production;
    this.sessionSecret = sessionSecret;
    this.cookieName = cookieName;
    this.corsOrigin = corsOrigin;
  }

  setupMiddleware(): void {
    Log.info('Setting express middleware');
    this.target.set('trust proxy', 1);
    this.target.use(logRequest);
    this.target.use(morgan(morganTokens, { stream: logStream }));
    this.target.use(express.urlencoded({ extended: false }));
    this.target.use(cookieParser());
    this.target.use(bodyParser.json());
    this.target.use(compression());
    this.target.use(cors({ origin: this.corsOrigin, credentials: true }));

    this.target.use(
      session({
        name: this.cookieName, // default: connect.sid
        store: redisStore,
        secret: this.sessionSecret,
        resave: true,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
          httpOnly: true,
          sameSite: 'lax',
          secure: this.production, // use only in https
          //domain: 'http://localhost:9000',
        },
      })
    );

    Log.info('Setting express routes');
    this.target.use('/', routes);
  }

  setupErrorHandlers(): void {
    Log.info('Setting express error handlers');
    this.target.use(notFoundHandler);
    this.target.use(logError);
    this.target.use(errorHandler);
  }

  getApp(): Application {
    return this.target;
  }
}

export { ExpressApp };
