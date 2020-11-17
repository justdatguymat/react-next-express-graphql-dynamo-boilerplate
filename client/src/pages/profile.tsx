import React from 'react';
import { NextPage } from 'next';
import { Container, Grid, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/AuthProvider';
import { withApollo } from 'components/withApollo';
import PostForm from 'components/PostForm';
import PostFeed from 'components/PostFeed';
import Layout from 'components/Layout';
import { withAuthGuard } from 'components/withAuthGuard';
import Loading from 'components/Loading';

interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
  const { user } = useAuth();
  if (!user) {
    return <Loading embedded />;
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Layout authRequired disableSeo title="Non-SEO title">
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
          <Grid item xs={12}>
            <PostForm />
          </Grid>
          <Grid item xs={12}>
            <PostFeed userId={user ? user.id : ''} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

const WithApollo = withApollo({ ssr: false })(Profile);
const WithAuthGuard = withAuthGuard({ ifNotAuth: '/login' })(WithApollo);

export default WithAuthGuard;
//export const getServerSideProps: GetServerSideProps = async (ctx) => WithAuthGuard.getSession(ctx);

/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;

  ///console.log('WithAuthGuard.getInitialProps, ifAuth ifNotAuth', ifAuth, ifNotAuth);

  const authUser = await Auth.getUser(req);
  console.log('getServerSideProps authUser', authUser);
  if (!authUser) {
    console.log('writing NOT 307 location');
    res.writeHead(307, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  return { props: { authUser } };
};
 */
