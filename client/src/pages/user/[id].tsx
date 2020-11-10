import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/authProvider';
import { useRouter } from 'next/dist/client/router';
import PostFeed from 'components/PostFeed';
import Layout from 'components/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { User } from 'codegen/graphql-request';
import { SDK } from 'lib/graphql-request';
import { ParsedUrlQuery } from 'querystring';
import Loading from 'components/Loading';
import ErrorPage from 'pages/_error';

type UserProfileParams = ParsedUrlQuery & { id: string };
type UserProfileProps = {
  user: User | null;
};

const UserProfile: NextPage<UserProfileProps> = ({ user }) => {
  const router = useRouter();
  const { user: authUser } = useAuth();

  console.log('router.isFallback', router.isFallback);
  if (router.isFallback) {
    return <Loading backdrop size={50} />;
  }

  if (!user) {
    return <ErrorPage statusCode={404} />;
  }

  if (authUser.id === user.id) {
    router.push('/profile');
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Layout title={`${fullName} | Profile`}>
      <Container maxWidth="md">
        <Typography align="center" variant="h3" color="textSecondary">
          Profile
        </Typography>
        <Typography align="center" variant="h6" color="textSecondary">
          {fullName}
        </Typography>
        <Button
          fullWidth
          variant="text"
          color="primary"
          onClick={() => router.push('/')}
          size="small"
        >
          Home
        </Button>
        <PostFeed userId={user.id} />
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const sdk = SDK();
    const { listUsers } = await sdk.listUsers();
    const paths = listUsers.map((user) => ({ params: { id: user.id } }));
    return { paths, fallback: true };
  } catch (error) {
    console.error('Failed to obtain list of users', error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<UserProfileProps, UserProfileParams> = async (
  context
) => {
  let user: User | null = null;
  try {
    if (!context.params) {
      throw new Error('Missing params');
    }
    const { id } = context.params;
    const sdk = SDK();
    const { getUser } = await sdk.getUser({ id });
    user = getUser as User;
  } catch (error) {
    console.info('Failed to fetch the user ', error);
  }

  return { props: { user: user }, revalidate: 10 };
};

export default UserProfile;
