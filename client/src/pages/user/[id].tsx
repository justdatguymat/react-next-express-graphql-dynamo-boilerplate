import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import PostFeed from 'components/PostFeed';
import Layout from 'components/Layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { User } from 'codegen/graphql-request';
import { SDK } from 'lib/graphql-request';
import { ParsedUrlQuery } from 'querystring';
import Loading from 'components/Loading';
import ErrorPage from 'pages/_error';
import { withApollo } from 'components/withApollo';

type UserProfileParams = ParsedUrlQuery & { id: string };
type UserProfileProps = {
  user: User | null;
};

const UserProfile: NextPage<UserProfileProps> = ({ user }) => {
  const router = useRouter();

  console.log('router.isFallback', router.isFallback);
  if (router.isFallback) {
    return <Loading />;
  }

  if (!user) {
    return <ErrorPage statusCode={404} />;
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
    return { paths, fallback: false };
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

  return { props: { user }, revalidate: 500 };
};

export default withApollo<UserProfileProps>({ ssr: false })(UserProfile);
