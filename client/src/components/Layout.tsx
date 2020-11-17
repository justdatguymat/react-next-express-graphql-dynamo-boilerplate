import React from 'react';
import { SEOType } from 'config';
import Main from './Main';
import SEO from './SEO';
import NavButtons from './NavButtons';

type LayoutProps = Partial<SEOType> & {
  disableSeo?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <SEO {...props} />
      {/* Header Component goes here */}
      <Main>
        <NavButtons />
        {children}
      </Main>
      {/* Footer Component goes here */}
    </>
  );
};

export default Layout;
