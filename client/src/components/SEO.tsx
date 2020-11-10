import React from 'react';
import Head from 'next/head';
import { DEFAULT_SEO, SEOType, SITE_NAME } from 'config';

type SEOProps = Partial<SEOType> & { disableSeo?: boolean };

function genPageTitle(title: string): string {
  if (title.trim()[title.length - 1] === '&') {
    return title.substring(title.length - 1).trim() + ' | ' + SITE_NAME;
  }
  return title;
}

const SEO: React.FC<SEOProps> = ({ disableSeo = false, ...props }) => {
  const seo = { ...DEFAULT_SEO, ...props };
  const { title, description, image, url, type, locale, siteName, twitterCreator } = seo;

  return (
    <Head>
      <title>{genPageTitle(title)}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      {disableSeo && <meta name="robots" content="noindex" />}
      <meta name="description" content={description} />
      {/* Open Graph | FB */}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={twitterCreator} />
      )}
    </Head>
  );
};

export default SEO;
