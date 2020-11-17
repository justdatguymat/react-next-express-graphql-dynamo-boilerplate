import { isServerSide } from 'utils';

export type SEOType = {
  title: string;
  description: string;
  image: string;
  url: string;
  locale: string;
  type: string;
  siteName: string;
  twitterCreator: string;
};

export const PROD = process.env.NODE_ENV === 'production';

export const SITE_URL = 'http://localhost:9000/';
export const SERVER_ENDPOINT = isServerSide()
  ? 'http://express-server:9001'
  : 'http://localhost:9001';

export const GRAPHQL_ENDPOINT = `${SERVER_ENDPOINT}/graphql`;

export const SITE_NAME = 'Boiler Plate';
export const TITLE = 'Boiler Plate by Matt Koltun';
export const DESCRIPTION =
  'Next.js GraphQL DynamoDB boiler plate created by Matt Koltun (@justdatguymat)';
export const IMG_URL = 'http://some.url.img';

export const DEFAULT_SEO: SEOType = {
  title: TITLE,
  description: DESCRIPTION,
  image: IMG_URL,
  url: SITE_URL,
  type: 'website',
  locale: 'en_IE',
  siteName: SITE_NAME,
  twitterCreator: '@justdatguymat', // site
};
