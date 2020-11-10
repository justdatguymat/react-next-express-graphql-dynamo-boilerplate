import React from 'react';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';
import Layout from 'components/Layout';

type ErrorProps = {
  statusCode?: number;
  title?: string;
};

const Error: NextPage<ErrorProps> = ({ statusCode = 505, title = 'Yikes...' }) => {
  return (
    <Layout disableSeo title={title}>
      <Typography align="center" variant="h3" color="primary">
        {statusCode}
      </Typography>
      <Typography align="center" variant="h5">
        {'Yikes... that\'s awkward'}
      </Typography>
    </Layout>
  );
};

export default Error;
