import React from 'react';
import { Paper, Box, Typography, Container } from '@material-ui/core';
import { GetPostQuery, GetPostQueryVariables, ListPostsQuery, Post } from 'generated/graphql';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { request, gql } from 'graphql-request';
//import { GRAPHQL_ENDPOINT } from 'config';
const GRAPHQL_ENDPOINT = 'http://express-server:9001/graphql';

type PostParams = ParsedUrlQuery & { id: string };
type PostProps = {
  post: Post;
};

export const getAllPosts = async (): Promise<ListPostsQuery> => {
  const query = gql`
    query {
      listPosts {
        id
      }
    }
  `;

  try {
    //const response = await request<Post[]>(GRAPHQL_ENDPOINT, query);
    return await request<ListPostsQuery>(GRAPHQL_ENDPOINT, query);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getPost = async (id: string): Promise<GetPostQuery> => {
  const query = gql`
    query getPost($id: ID) {
      getPost(id: $id) {
        id
        range
        title
        content
        data
        createdAt
        updatedAt
      }
    }
  `;

  try {
    return await request<GetPostQuery, GetPostQueryVariables>(GRAPHQL_ENDPOINT, query, { id });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getAllPosts()).listPosts;
  const paths = posts.map((post) => ({ params: { id: post.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
  if (!context.params) {
    throw new Error('Failed to fetch the post, missing params');
  }
  const { id } = context.params;
  const post = (await getPost(id)).getPost as Post;

  if (!post) {
    throw new Error('Failed to fetch the post ' + id);
  }
  console.log('post', post);
  return { props: { post }, unstable_revalidate: true };
};

const PostPage: React.FC<PostProps> = ({ post }) => {
  //const router = useRouter();
  //const { id } = router.query;
  //const [postId] = React.useState(id as string);
  //const [] = usePostQuery({ variables });
  const createdAt = new Date(post.createdAt).toLocaleString();
  return (
    <Container maxWidth="sm">
      <Paper>
        <Box my={2} p={2}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="subtitle1">{createdAt}</Typography>
          <Typography style={{ whiteSpace: 'pre-line' }}>{post.content}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostPage;
