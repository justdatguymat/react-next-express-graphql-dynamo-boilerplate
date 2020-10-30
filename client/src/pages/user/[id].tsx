import React from 'react';
import Head from 'next/head';
import { Button, Container, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/authProvider';
import Main from 'components/Main';
import { useRouter } from 'next/dist/client/router';
import { withUrqlClient } from 'next-urql';
import { urqlConfig } from 'graphql/urql';
import PostForm from 'components/PostForm';
import PostFeed from 'components/PostFeed';
import { useGetUserQuery, User } from 'generated/graphql';
import Loading from 'components/Loading';

interface UserProps {}

const UserProfile: React.FC<UserProps> = () => {
  const router = useRouter();
  const { user: authUser } = useAuth();
  const { id } = router.query;
  const [userId, setUserId] = React.useState<string>(id as string);
  const [user, setUser] = React.useState<User>({} as User);

  if (authUser.id === userId) {
    //router.push('/user', { href: 'profile' });
  }

  const [variables, setVariables] = React.useState({
    id: userId,
    range: 'profile',
  });

  const [{ data, error, fetching }] = useGetUserQuery({ variables });

  React.useEffect(() => {
    setVariables({
      id: userId,
      range: 'profile',
    });
  }, [userId]);

  React.useEffect(() => {
    setUserId(id as string);
  }, [id]);

  React.useEffect(() => {
    setUser(data?.getUser as User);
  }, [data]);

  if (error) {
    console.error(error);
    return <Typography> Failed to load the user profile</Typography>;
  }

  if (fetching) {
    return <Loading backdrop />;
  }

  if (!user) {
    return <Typography>still nada </Typography>;
  }
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Head>
        <title>{fullName} | Profile</title>
      </Head>
      <Main>
        <Container maxWidth="xs">
          <>
            <Typography align="center" variant="h3" color="textSecondary">
              Profile
            </Typography>
            <Typography align="center" variant="h6" color="textSecondary"></Typography>
            <Button
              fullWidth
              variant="text"
              color="primary"
              onClick={() => router.push('/')}
              size="small"
            >
              Home
            </Button>
            <PostFeed user={userId} />
            <PostForm />
          </>
        </Container>
      </Main>
    </>
  );
};

export default withUrqlClient(urqlConfig, { ssr: false })(UserProfile);
