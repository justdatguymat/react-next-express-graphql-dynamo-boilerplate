import { Typography } from '@material-ui/core';
import { Post, PostInput, useGetUserPostsQuery } from 'generated/graphql';
import useVisibility from 'hooks/useVisibility';
import React from 'react';
import Loading from './Loading';
import PostCard from './PostCard';

type PostFeedProps = {
  user: string;
};

type VariablesType = {
  user: string;
  lastKey?: PostInput | undefined | null;
};

const PostFeed: React.FC<PostFeedProps> = ({ user = '' }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [variables, setVariables] = React.useState<VariablesType>({ user });
  const [{ data, error, fetching }] = useGetUserPostsQuery({ variables });
  const [isVisible, currentElement] = useVisibility<HTMLDivElement>(-100);

  const getPosts = () => {
    if (posts.length > 0) {
      const last = posts[posts.length - 1];
      const { id, range, data } = last;
      const newVariables: VariablesType = { user, lastKey: { id, range, data } };
      setVariables(newVariables);
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      getPosts();
    }
  }, [isVisible]);

  React.useEffect(() => {
    if (error) {
      console.error('Failed to load posts.', error);
    }
  }, [error]);

  React.useEffect(() => {
    console.log('data changed, setting posts', data);
    if (data) {
      setPosts(posts.concat(data.getUserPosts as Post[]));
    }
  }, [data]);

  return (
    <>
      {error && <Typography>Failed to load posts...</Typography>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {fetching && <Loading embedded size={70} />}
      <div ref={currentElement} />
    </>
  );
};

export default PostFeed;
