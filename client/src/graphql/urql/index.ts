import { ClientOptions, dedupExchange, fetchExchange, cacheExchange } from '@urql/core';
import { GRAPHQL_ENDPOINT } from 'config';
import { SSRExchange } from 'next-urql';

/*
type UrqlDataWindow = Window & typeof globalThis & { __URQL_DATA__: SSRData };

const WindowSSR = window ? (window as UrqlDataWindow) : null;
const isClient = !isServerSide();

const ssr = ssrExchange({
  isClient,
  initialState: isClient && WindowSSR ? WindowSSR.__URQL_DATA__ : undefined,
});

*/
export const urqlConfig = (ssrExchange: SSRExchange): ClientOptions => ({
  url: GRAPHQL_ENDPOINT,
  //preferGetMethod: isClient,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
