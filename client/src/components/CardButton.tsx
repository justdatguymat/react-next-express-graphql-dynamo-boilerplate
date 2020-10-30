import { ButtonBase, ButtonBaseProps, Card, CardContent, CardProps } from '@material-ui/core';
import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      margin: theme.spacing(2),
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderWidth: '1rem',
        borderColor: theme.palette.primary.main,
      },
    },
    buttonBase: {
      padding: theme.spacing(3),
    },
  })
);

interface CardButtonProps {
  cardProps?: CardProps;
  buttonProps?: ButtonBaseProps;
}

const CardButton: React.FC<CardButtonProps> = ({ children, cardProps, buttonProps }) => {
  const classes = useStyles();
  return (
    <Card {...cardProps} className={classes.root} elevation={2}>
      <ButtonBase {...buttonProps} className={classes.buttonBase}>
        <CardContent>{children}</CardContent>
      </ButtonBase>
    </Card>
  );
};

export default CardButton;
