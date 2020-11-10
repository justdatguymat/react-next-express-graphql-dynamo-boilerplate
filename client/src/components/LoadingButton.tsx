import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    progressIcon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
    },
  })
);

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  disabled,
  loading = false,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button disabled={loading || disabled} {...props}>
        {loading ? <p>&nbsp;</p> : children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progressIcon} />}
    </div>
  );
};

export default LoadingButton;
