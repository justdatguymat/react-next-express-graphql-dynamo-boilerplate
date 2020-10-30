import React from 'react';
import Head from 'next/head';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/authProvider';
import Main from 'components/Main';
import { withUrqlClient } from 'next-urql';
import { urqlConfig } from 'graphql/urql';
import PostForm from 'components/PostForm';
import PostFeed from 'components/PostFeed';
import { useRouter } from 'next/dist/client/router';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { user, logout } = useAuth();
  const { firstName, lastName } = user;
  const router = useRouter();

  const fullName = `${firstName} ${lastName}`;

  return (
    <>
      <Head>
        <title>Profile | {fullName}</title>
      </Head>
      <Main>
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
              <PostFeed user={user.id ? user.id : ''} />
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Profile);
