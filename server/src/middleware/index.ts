import { Request, Response, NextFunction } from 'express';
import { Log } from '@logger';
import { PROD } from '@config/constants';

interface ExpressError extends Error {
  status?: number;
}

export function logRequest(req: Request, _: Response, next: NextFunction): void {
  Log.debug(
    JSON.stringify({
      ip: req.ip,
      hostname: req.hostname,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      route: req.route,
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    })
  );
  next();
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  const error: ExpressError = {
    name: 'UrlNotFound',
    message: 'URL not found',
    status: 404,
  };
  next(error);
}

export function logError(
  err: ExpressError,
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  Log.error(err);
  next(err);
}

export function errorHandler(
  err: ExpressError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  res.locals.message = err.message;
  res.locals.error = PROD ? {} : err;
  res.status(err.status || 500);
  res.send(err);
  res.end();
}
