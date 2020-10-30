import { createServer as createHttp, Server, ServerOptions } from 'http';
import { createServer as createHttps } from 'https';
import { Application } from 'express';
import { PORT } from '@config/constants';
import { Log } from '@logger';

class HttpServer {
  app: Application;
  port: number;
  ssl: boolean;
  sslConfig: ServerOptions;
  server: Server;

  constructor(app: Application, port: number, ssl?: boolean, sslConfig?: ServerOptions) {
    if (ssl && !sslConfig) throw new Error('Missing SSL config parameter.');

    this.app = app;
    this.port = port;
    this.ssl = ssl || false;
    this.sslConfig = sslConfig || {};

    this.server = this.getServer();
  }

  private getServer(): Server {
    Log.info('Creating the http server. SSL:', this.ssl);
    if (this.ssl) {
      return createHttps(this.sslConfig, this.app);
    } else {
      return createHttp(this.app);
    }
  }

  setup(): HttpServer {
    Log.info('Setting up the server');
    this.server.on('listening', this.onListening);
    this.server.on('error', this.onError);
    return this;
  }

  start(): HttpServer {
    Log.info('Starting the server');
    this.server.listen(this.port);
    this.app.set('port', this.port);
    return this;
  }

  onListening(): void {
    Log.info('Listening on the port', PORT);
  }

  onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;

    switch (error.code) {
      case 'EACCES':
        Log.warn(`Port ${this.port} requires elevated privileges`);
        break;
      case 'EADDRINUSE':
        Log.warn(`Port ${this.port} is already in use`);
        break;
      default:
        Log.warn('Error not recognized');
    }
    throw error;
  }
}

export { HttpServer };
