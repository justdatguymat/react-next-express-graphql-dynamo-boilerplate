import React from 'react';
import { Backdrop, Box, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    spinner: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      backgroundColor: 'rgb(0,0,0,0)',
      position: 'absolute',
      display: 'flex',
      zIndex: 20000,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    backdrop: {
      backgroundColor: 'rgb(255,255,255, 0.65)',
    },
    backdropFull: {
      backgroundColor: 'rgb(255,255,255, 1)',
    },
    embedded: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      //height: '100%',
      width: '100%',
      margin: theme.spacing(10, 0),
    },
  })
);

interface LoadingProps {
  backdrop?: boolean;
  backdropFull?: boolean;
  embedded?: boolean;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({
  backdrop = false,
  backdropFull = false,
  embedded = false,
  size = '60',
}) => {
  const classes = useStyles();

  if (backdrop) {
    return (
      <Box className={classes.spinner}>
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress size={size} />
        </Backdrop>
      </Box>
    );
  }

  if (backdropFull) {
    return (
      <Box className={classes.spinner}>
        <Backdrop className={classes.backdropFull} open={backdropFull}>
          <CircularProgress size={size} />
        </Backdrop>
      </Box>
    );
  }

  if (embedded) {
    return (
      <div className={classes.embedded}>
        <CircularProgress size={size} />
      </div>
    );
  }

  return (
    <div className={classes.spinner}>
      <CircularProgress size={size} />
    </div>
  );
};

export default Loading;
