import React from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { useRouter } from 'next/dist/client/router';
import { NextPageContext, NextPage } from 'next';
import { User } from 'codegen/graphql-request';
import { Auth } from 'lib/auth';
import Loading from './Loading';

export type WithAuthGuardOptions = {
  ifAuth?: string;
  ifNotAuth?: string;
};

export type WithAuthGuardPageProps<P> = P & {
  authUser?: User;
};

export function withAuthGuard<P>(options: WithAuthGuardOptions = {}) {
  return function (PageComponent: NextPage<P>): NextPage<P> {
    const { ifAuth, ifNotAuth } = options;
    const WithAuthGuard: NextPage<P> = (withAuthGuardProps: WithAuthGuardPageProps<P>) => {
      //function WithAuthGuard(withAuthGuardProps: WithAuthGuardPageProps<P>) {
      const { authUser, ...pageProps } = withAuthGuardProps;
      const router = useRouter();
      const { user } = useAuth();

      const isAuth = Boolean(authUser || user);

      React.useEffect(() => {
        if (isAuth && ifAuth && router.route !== ifAuth) {
          console.log('route is not ', ifAuth);
          router.push(ifAuth);
        } else if (!isAuth && ifNotAuth && router.route !== ifNotAuth) {
          console.log('route is not ', ifNotAuth);
          router.push(ifNotAuth);
        }
      }, [user, authUser]);

      console.log('returning from WithAuthGuard');
      if ((ifNotAuth && !isAuth) || (ifAuth && isAuth)) {
        return <Loading backdrop />;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <PageComponent {...((pageProps as any) as P)} />;
    };

    if (process.env.NODE_ENV !== 'production') {
      const displayName = PageComponent.displayName || PageComponent.name || 'Component';
      WithAuthGuard.displayName = `withAuthGuard(${displayName})`;
    }

    //WithAuthGuard.getSession = async (ctx: GetServerSidePropsContext) => {
    WithAuthGuard.getInitialProps = async (ctx: NextPageContext) => {
      const { req, res } = ctx;

      const props = PageComponent.getInitialProps ? PageComponent.getInitialProps(ctx) : ({} as P);
      if (!req || !res) {
        return { ...props };
      }

      const authUser = await Auth.getUser(req);
      console.log('WithAuthGuard.getInitialProps authUser', authUser);
      if (authUser && ifAuth) {
        console.log('writing 307 location', ifAuth);
        res.writeHead(307, { Location: ifAuth });
        res.end();
      } else if (!authUser && ifNotAuth) {
        console.log('writing NOT 307 location', ifNotAuth);
        res.writeHead(307, { Location: ifNotAuth });
        res.end();
      }

      return { authUser, ...props };
    };

    return WithAuthGuard;
  };
}
