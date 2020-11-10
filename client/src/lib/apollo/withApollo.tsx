import React, { ReactNode } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { initApolloClient, initOnContext, NextPageContextApp } from '.';
import { isServerSide } from 'utils';

/*
type ApolloPageProps = PageProps & {
  apolloClient?: ApolloClient<NormalizedCacheObject> | null;
  apolloState?: NormalizedCacheObject;
};
 Creates a withApollo HOC
 that provides the apolloContext
 to a next.js Page or AppTree.
 @param  {Object} withApolloOptions
 @param  {Boolean} [withApolloOptions.ssr=false]
 @returns {(PageComponent: ReactNode) => ReactNode}

    const WithApollo = ({
      apolloClient,
      apolloState,
      ...pageProps
    }: WithApolloProps<Props>): ReactNode => {

 */

//type WithApolloProps<P> = P & {
type WithApolloProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
};

//export const withApollo = <Props extends Object>({ ssr = false } = {}) => (
export function withApollo<P>({ ssr = false } = {}): (C: NextPage<P>) => ReactNode {
  //return (PageComponent: NextPage<Props>): ReactNode => {
  return function (PageComponent: NextPage<P>): ReactNode {
    function WithApollo({ apolloClient, apolloState, ...pageProps }: WithApolloProps) {
      // Happens on: getDataFromTree & next.js ssr
      // or
      // Happens on: next.js csr
      const client = apolloClient || initApolloClient(apolloState);

      return (
        <ApolloProvider client={client}>
          <PageComponent {...pageProps} />
        </ApolloProvider>
      );
    }

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
      const displayName = PageComponent.displayName || PageComponent.name || 'Component';
      WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async function (ctx: NextPageContextApp) {
        const inAppContext = Boolean(ctx.ctx);
        const { apolloClient } = initOnContext(ctx);

        // Run wrapped getInitialProps methods
        let pageProps = {};
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        } else if (inAppContext) {
          pageProps = await App.getInitialProps(ctx);
        }

        // Only on the server:
        if (isServerSide()) {
          const { AppTree } = ctx;
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res?.writableEnded) {
            return pageProps;
          }

          // Only if dataFromTree is enabled
          if (ssr && AppTree) {
            try {
              // Import `@apollo/react-ssr` dynamically.
              // We don't want to have this in our client bundle.
              const { getDataFromTree } = await import('@apollo/react-ssr');

              // Since AppComponents and PageComponents have different context types
              // we need to modify their props a little.
              let props;
              if (inAppContext) {
                props = { ...pageProps, apolloClient };
                await getDataFromTree(<AppTree {...props} pageProps={props} />);
              } else {
                props = { pageProps: { ...pageProps, apolloClient } };
                await getDataFromTree(<AppTree {...props} />);
              }

              // Take the Next.js AppTree, determine which queries are needed to render,
              // and fetch them. This method can be pretty slow since it renders
              // your entire AppTree once for every query. Check out apollo fragments
              // if you want to reduce the number of rerenders.
              // https://www.apollographql.com/docs/react/data/fragments/
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
              console.error('Error while running `getDataFromTree`', error);
            }

            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind();
          }
        }

        return {
          ...pageProps,
          // Extract query data from the Apollo store
          apolloState: apolloClient.cache.extract(),
          // Provide the client for ssr. As soon as this payload
          // gets JSON.stringified it will remove itself.
          apolloClient: ctx.apolloClient,
        };
      };
    }

    return WithApollo;
  };
}
