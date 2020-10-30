import { Request, Response, NextFunction, RequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function asyncWrapper(handler: AsyncHandler): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}

export function randomId(chars = 36): string {
  return Math.random().toString(chars).substring(2);
}

export function generateId(prefix = '', chars = 36): string {
  let id = Date.now().toString(chars) + randomId();
  if (prefix !== '') {
    id = prefix.toLowerCase() + '_' + id;
  }
  return id;
}

export function getEpochSeconds(date: Date = new Date()): number {
  return Math.floor(date.getTime() / 1000);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function capitalizeFirstChar(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
