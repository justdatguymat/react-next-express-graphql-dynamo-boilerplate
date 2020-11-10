import React from 'react';
import { Paper, Typography, Container } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import Layout from 'components/Layout';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { SDK } from 'lib/graphql-request';
import { Post } from 'codegen/graphql-request';
import Loading from 'components/Loading';
import { useRouter } from 'next/dist/client/router';
import ErrorPage from 'pages/_error';

const useStyles = makeStyles((theme) =>
  createStyles({
    postRoot: {
      width: '100%',
      padding: theme.spacing(3),
    },
    post: {
      margin: theme.spacing(2, 0),
    },
    card: {},
  })
);

type PostParams = ParsedUrlQuery & { id: string };
type PostProps = {
  post: Post | null;
};

const PostPage: React.FC<PostProps> = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();

  console.log('router.isFallback', router.isFallback);
  if (router.isFallback) {
    return <Loading backdrop size={50} />;
  }

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  const createdAt = new Date(post.createdAt).toLocaleString();
  const author = `${post.author.firstName} ${post.author.lastName}`;

  return (
    <Layout title={post.title}>
      <Container maxWidth="md">
        <Paper className={classes.postRoot}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="subtitle1">
            <Link href={`/user/${post.author.id}`}>{author}</Link>
          </Typography>
          <Typography variant="subtitle2">{createdAt}</Typography>
          <div className={classes.post}>
            <Typography style={{ whiteSpace: 'pre-line' }}>{post.content}</Typography>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const sdk = SDK();
    const { listPosts } = await sdk.listPosts();
    const paths = listPosts.map((post) => ({ params: { id: post.id } }));
    return { paths, fallback: true };
  } catch (error) {
    console.error('Failed to obtain list of posts', error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
  let post: Post | null = null;
  try {
    if (!context.params) {
      throw new Error('Missing params');
    }
    const { id } = context.params;
    const sdk = SDK();
    const { getPost } = await sdk.getPost({ id });
    post = getPost as Post;
  } catch (error) {
    console.error('Failed to fetch the post', error);
  }
  return { props: { post: post }, revalidate: 10 };
};

export default PostPage;
