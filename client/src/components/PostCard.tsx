import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Post } from 'generated/graphql';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      //padding: theme.spacing(2),
    },
    content: {
      whiteSpace: 'pre-line',
    },
  })
);

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();
  //const author = `${post.owner.lastName}`;
  const subheader = new Date(post.createdAt).toLocaleString();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <CardActionArea>
        <CardHeader title={post.title} subheader={subheader} />
        <CardContent>
          <Typography className={classes.content} variant="body2" color="textSecondary">
            {post.content.substring(0, 100)}
            {'...'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
