import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CenteredContent from './CenteredContent';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      position: 'relative',
    },
  })
);

interface MainProps {}

const Main: React.FC<MainProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <CenteredContent>
      <main className={classes.root}>{children}</main>
    </CenteredContent>
  );
};

export default Main;
