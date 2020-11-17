import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from 'theme';
import AuthProvider from 'contexts/AuthProvider';
import ToasterProvider from 'contexts/ToasterProvider';
import { User } from 'codegen/graphql-request';

interface Props {
  authUser?: User;
}

const MyApp = ({ Component, pageProps, authUser }: AppProps & Props): React.ReactElement => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  console.log('MyApp AuthUser PageProps', authUser, pageProps);

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider>
        <AuthProvider authUser={authUser}>
          <CssBaseline />
          <Component {...pageProps} />
        </AuthProvider>
      </ToasterProvider>
    </ThemeProvider>
  );
};

/*
MyApp.getInitialProps = async (appContext: AppContext) => {
  let authUser = null;
  const appProps = await App.getInitialProps(appContext);
  try {
    const cookie = appContext.ctx.req?.headers['cookie'];
    console.log('APP CONTEXT', appProps, cookie);
    if (cookie) {
      const sdk = SDK({ headers: { cookie } });
      const { myself } = await sdk.Myself();
      authUser = myself as User;
    }
  } catch (error) {
    console.log('user not auth');
  }
  //console.log('APP CONTEXT auth', authUser);
  return { authUser, ...appProps };
};
 */

export default MyApp;
