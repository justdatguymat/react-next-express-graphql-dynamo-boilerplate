import React from 'react';
import { NextPage } from 'next';
import { Container, Grid, Typography } from '@material-ui/core';
import { User } from 'codegen/graphql-request';
import { useAuth } from 'contexts/AuthProvider';
import { withAuthGuard } from 'components/withAuthGuard';
import { withApollo } from 'components/withApollo';
import PostForm from 'components/PostForm';
import PostFeed from 'components/PostFeed';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

interface ProfileProps {
  authUser?: User;
}

const Profile: NextPage<ProfileProps> = ({ authUser }) => {
  const { user } = useAuth();
  console.log('Profile', authUser, user);
  if (!user && !authUser) {
    return <Loading embedded />;
  }

  const profileUser = user || authUser;

  if (!profileUser) return null;

  const fullName = `${profileUser.firstName} ${profileUser.lastName}`;

  return (
    <Layout disableSeo title={fullName}>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h3" color="textSecondary">
              {fullName}
            </Typography>
            <Typography align="center" variant="body2" color="textSecondary">
              {profileUser.id} - {profileUser.range}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PostForm />
          </Grid>
          <Grid item xs={12}>
            <PostFeed key="profile" userId={profileUser.id} />
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
