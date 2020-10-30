import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Grow, Box } from '@material-ui/core';

export const Alert: React.FC<AlertProps> = ({ elevation = 5, variant = 'standard', ...props }) => {
  return <MuiAlert elevation={elevation} variant={variant} {...props} />;
};

type GrowAlertProps = AlertProps & { active: boolean };

export const GrowAlert: React.FC<GrowAlertProps> = ({ active, children, ...props }) => {
  return (
    <Grow in={active} timeout={1000}>
      <Box my={2}>
        <Alert elevation={0} {...props} draggable={true}>
          {children}
        </Alert>
      </Box>
    </Grow>
  );
};
