import React from 'react';
import { ButtonBase, ButtonBaseProps, Card, CardContent, CardProps } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      color: theme.palette.text.secondary,
      //border: `0.0em ${theme.palette.text.secondary} solid`,
      borderRadius: '1em',
      '&:hover': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        //border: `0.1em ${theme.palette.text.secondary} solid`,
      },
    },
    buttonBase: {
      padding: theme.spacing(2),
    },
  })
);

interface CardButtonProps {
  cardProps?: CardProps;
  buttonProps?: ButtonBaseProps;
}

const CardButton: React.FC<CardButtonProps> = ({ children, cardProps, buttonProps }) => {
  const classes = useStyles();
  const [elevation, setElevation] = React.useState(1);

  return (
    <Card
      {...cardProps}
      className={classes.root}
      onMouseOver={() => setElevation(4)}
      onMouseOut={() => setElevation(1)}
      elevation={elevation}
    >
      <ButtonBase {...buttonProps} className={classes.buttonBase}>
        <CardContent>{children}</CardContent>
      </ButtonBase>
    </Card>
  );
};

export default CardButton;
