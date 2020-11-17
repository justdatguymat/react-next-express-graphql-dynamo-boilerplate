import React from 'react';
import { SEOType } from 'config';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SEO from './SEO';
import NavButtons from './NavButtons';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    main: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

type LayoutProps = Partial<SEOType> & {
  disableSeo?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <SEO {...props} />
        <header style={{ flexGrow: 0 }}>
          <NavButtons />
        </header>
        <main style={{ flexGrow: 1 }} className={classes.main}>
          {children}
        </main>
      </div>
      {/* 
      </div>
        Footer Component goes here 
      <footer style={{ height: 300, backgroundColor: 'teal' }}></footer>
      */}
    </>
  );
};

export default Layout;
