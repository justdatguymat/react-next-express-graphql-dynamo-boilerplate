import { NextApiRequest, NextApiResponse } from 'next';
import { Auth } from 'lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await Auth.handle(req, res);
  } catch (error) {
    console.error('Auth handler', error);
    res.status(error.status || 500).end(error.message);
  }
}
