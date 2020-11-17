import React from 'react';
import { NextPage } from 'next';
import { Box, Typography } from '@material-ui/core';
import Layout from 'components/Layout';

type ErrorProps = {
  statusCode?: number;
  title?: string;
};

const Error: NextPage<ErrorProps> = ({ statusCode = 505, title = 'Yikes...', children }) => {
  return (
    <Layout disableSeo title={'😢 ' + title}>
      <Typography align="center" variant="h3" color="primary">
        {statusCode}
      </Typography>
      <Typography align="center" variant="h5">
        {'Yikes... that\'s awkward'}
      </Typography>
      {children && <Box mt={1}>{children}</Box>}
    </Layout>
  );
};

export default Error;
