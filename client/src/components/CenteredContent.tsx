import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100%',
      position: 'relative',
    },
  })
);

interface CenteredContentProps {}

const CenteredContent: React.FC<CenteredContentProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default CenteredContent;
