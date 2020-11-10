import React from 'react';
import { SEOType } from 'config';
import Main from './Main';
import SEO from './SEO';
import { useAuth } from 'contexts/authProvider';
import { useRouter } from 'next/dist/client/router';

type LayoutProps = Partial<SEOType> & {
  disableSeo?: boolean;
  authRequired?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, authRequired = false, ...props }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (authRequired && !isAuthenticated) {
    router.push('/login');
  }
  console.log('props', props);

  return (
    <>
      <SEO {...props} />
      {/* Header Component goes here */}
      <Main>{children}</Main>
      {/* Footer Component goes here */}
    </>
  );
};

export default Layout;
