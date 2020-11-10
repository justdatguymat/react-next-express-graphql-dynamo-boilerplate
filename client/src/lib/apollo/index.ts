import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';
import { GRAPHQL_ENDPOINT } from 'config';
import { isServerSide } from 'utils';
import { AppContext } from 'next/app';

export type NextPageContextWithApollo = NextPageContext & {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
  ctx: NextPageContextWithApollo;
};

export type NextPageContextApp = NextPageContextWithApollo & AppContext;

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export default function createApolloClient(
  initialState: NormalizedCacheObject = {},
  ctx?: NextPageContext,
  cookie?: string
): ApolloClient<NormalizedCacheObject> {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: 'include', // `credentials`, `headers`, `same-origin`
      headers: cookie ? { cookie } : undefined,
      fetch: fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */

export function initOnContext(ctx: NextPageContextApp): NextPageContextApp {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient: ApolloClient<NormalizedCacheObject> & { toJSON?: () => JSON | null } =
    ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
export function initApolloClient(
  initialState: NormalizedCacheObject,
  ctx?: NextPageContext,
  cookie?: string
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServerSide()) {
    return createApolloClient(initialState, ctx, cookie);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx);
  }

  return globalApolloClient;
}
