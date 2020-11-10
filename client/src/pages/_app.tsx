import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import AuthProvider from 'contexts/authProvider';
import theme from 'theme';
import ToasterProvider from 'contexts/toasterProvider';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider>
        <AuthProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </AuthProvider>
      </ToasterProvider>
    </ThemeProvider>
  );
};

//export default withApollo({ ssr: false })(App);
export default App;
