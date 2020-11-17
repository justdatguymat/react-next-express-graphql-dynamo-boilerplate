import React from 'react';
import { NextPage } from 'next';
import CustomError from './_error';
import { Typography } from '@material-ui/core';

type NotFoundPageProps = {
  title?: string;
};

const NotFoundPage: NextPage<NotFoundPageProps> = ({ title = 'Not here...' }) => {
  return (
    <CustomError title={title} statusCode={404}>
      <Typography align="center">Not found 😢</Typography>
    </CustomError>
  );
};

export default NotFoundPage;
