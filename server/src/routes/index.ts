import { asyncWrapper } from '@utils';
import { Router, Response, Request } from 'express';

const router = Router();

router.get('/', asyncWrapper(helloWorld));

async function helloWorld(_req: Request, res: Response) {
  res.send('hello world');
}

export default router;
