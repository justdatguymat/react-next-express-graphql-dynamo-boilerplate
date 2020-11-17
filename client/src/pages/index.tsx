import React from 'react';
import { Typography, Box, Link, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import { useAuth } from 'contexts/AuthProvider';
import { NextPage } from 'next';
import PostFeed from 'components/PostFeed';
import { withApollo } from 'components/withApollo';

const useTechnologyLinks = () => [
  {
    name: 'React',
    href: 'https://reactjs.org/',
  },
  {
    name: 'Next',
    href: 'https://nextjs.org/',
  },
  {
    name: 'Express',
    href: 'https://expressjs.com/',
  },
  {
    name: 'GraphQL',
    href: 'https://graphql.org/',
  },
  {
    name: 'DynamoDB',
    href: 'https://aws.amazon.com/dynamodb/',
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      padding: theme.spacing(2),
    },
  })
);

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const classes = useStyles();
  const links = useTechnologyLinks();
  const { user, isAuthenticated } = useAuth();

  const header = isAuthenticated
    ? `✌ Welcome back ${user ? user.firstName : ''}! ✌`
    : '🚀 Webapp Boilerplate 🚀';

  return (
    <Layout title="Home &">
      <Typography variant="h2" align="center" color="textSecondary">
        {header}
      </Typography>

      <Box display="flex" justifyContent="center" width="100%">
        {links.map((link) => (
          <Typography key={link.name} className={classes.list} align="center">
            <Link href={link.href} target="_blank" rel="noopener">
              {link.name}
            </Link>
          </Typography>
        ))}
      </Box>

      <Container maxWidth="sm">
        <Typography align="center" variant="body2" color="textSecondary">
          created by{' '}
          <Link
            variant="body2"
            color="inherit"
            href="https://github.com/justdatguymat"
            target="_blank"
            rel="noopener"
          >
            Matt Koltun 😎
          </Link>
        </Typography>
        {isAuthenticated && <PostFeed />}
      </Container>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
