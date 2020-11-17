import { SDK } from 'lib/graphql-request';
import { User } from 'codegen/graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage } from 'http';

//function parseCookieHeader(req: IncomingMessage | NextApiRequest): Record<string, string> | null {
function parseCookieHeader(req: NextApiRequest): Record<string, string> | null {
  if (req.cookies.sid) {
    console.log('req cookies', req.cookies);
    const session = `sid=${req.cookies.sid};`;
    //header['cookie'] = session;
    return { cookie: session };
  }
  return null;
}

export class Auth {
  public static async getUser(req: IncomingMessage): Promise<User | null> {
    const headers = {
      cookie: req.headers.cookie || '',
    };
    if (!headers.cookie) {
      console.log('Cookie header not defined.');
      return null;
    }
    try {
      const sdk = SDK({ headers });
      const { myself } = await sdk.Myself();
      return myself as User;
    } catch (error) {
      console.log('Failed to obtain a user.', error);
      return null;
    }
  }

  public static async handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const headers = parseCookieHeader(req);
    if (!headers) {
      return;
    }
    const sdk = SDK({ headers });

    for (const slug of req.query['slug']) {
      console.log('slug', slug);
    }

    const operation = req.query['slug'][0];

    let data, error, result;
    try {
      switch (operation) {
        case 'myself':
          result = await sdk.Myself();
          data = result.myself;
          break;

        case 'login':
          result = await sdk.Login(req.body);
          data = result.login;
          break;

        case 'register':
          result = await sdk.Register(req.body);
          data = result.register;
          break;

        case 'logout':
          result = await sdk.Logout();

          break;

        default:
          break;
      }
    } catch (err) {
      error = err;
    }

    res.status(200).json({ data, error });
    res.end();
  }

  /*
  private static async myself(): Promise<User> {
    try {
      const { myself } = await this.sdk.Myself();
      return myself as User;
    } catch (error) {
      console.log('Failed to obtain myself', error);
      throw error;
    }
  }

  private static async login(input: LoginInput): Promise<User> {
    try {
      const { login } = await this.sdk.Login(input);
      return login as User;
    } catch (error) {
      console.log('Failed to login', error);
      throw error;
    }
  }

  private static async register(input: RegisterInput): Promise<User> {
    try {
      const { register } = await this.sdk.Register(input);
      return register as User;
    } catch (error) {
      console.log('Failed to register', error);
      throw error;
    }
  }

  private static async logout(): Promise<boolean> {
    try {
      const { logout } = await this.sdk.Logout();
      return logout;
    } catch (error) {
      console.log('Failed to logout', error);
      return false;
    }
  }
  */
}
