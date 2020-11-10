import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/authProvider';
import PostForm from 'components/PostForm';
import PostFeed from 'components/PostFeed';
import { useRouter } from 'next/dist/client/router';
import Layout from 'components/Layout';
import { withApollo } from 'lib/apollo/withApollo';
import { NextPage } from 'next';

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Layout disableSeo authRequired title="Non-SEO title">
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h3" color="textSecondary">
              {fullName}
            </Typography>
            <Typography align="center" variant="body2" color="textSecondary">
              {user.id} - {user.range}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant="text"
              color="primary"
              onClick={() => router.push('/')}
              size="small"
            >
              Home
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth size="small" variant="text" color="primary" onClick={logout}>
              Logout
            </Button>
          </Grid>
          <Grid item xs={12}>
            <PostForm />
          </Grid>
          <Grid item xs={12}>
            <PostFeed userId={user.id ? user.id : ''} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default withApollo<ProfileProps>({ ssr: false })(Profile);
