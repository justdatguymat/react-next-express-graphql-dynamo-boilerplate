import { getSdk, Sdk } from 'codegen/graphql-request';
import { GRAPHQL_ENDPOINT } from 'config';
import { GraphQLClient } from 'graphql-request';

const defaultOptions: Partial<RequestInit> = {
  credentials: 'include',
  mode: 'cors',
};

export function SDK(options: RequestInit = {}): Sdk {
  const cfg: RequestInit = { ...defaultOptions, ...options };
  const client = new GraphQLClient(GRAPHQL_ENDPOINT, cfg);
  const sdk = getSdk(client);
  return sdk;
}
