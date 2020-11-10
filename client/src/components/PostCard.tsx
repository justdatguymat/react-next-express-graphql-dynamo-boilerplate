import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import { Post } from 'codegen/graphql-apollo';
import { getRandom } from 'utils';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      //padding: theme.spacing(2),
    },
    content: {
      //whiteSpace: 'pre-line',
    },
    skeletonContainer: {
      width: '100%',
      margin: theme.spacing(5, 0),
    },
    skeleton: {
      marginTop: theme.spacing(1),
    },
  })
);

type PostCardProps = {
  post: Post;
};

export const PostCardSkeleton: React.FC = () => {
  const classes = useStyles();
  const [dims] = React.useState([
    [getRandom(25, 100) + '%', '2em'],
    [getRandom(15, 50) + '%', '1em'],
    [getRandom(10, 25) + '%', '0.5em'],
    ['100%', getRandom(50, 200) + 'px'],
  ]);

  return (
    <div className={classes.skeletonContainer}>
      {dims.map((d, i) => (
        <Skeleton
          key={i + ''}
          className={classes.skeleton}
          variant="rect"
          animation="wave"
          width={d[0]}
          height={d[1]}
        />
      ))}
    </div>
  );
};

const Subheader: React.FC<PostCardProps> = ({ post }) => {
  const author = `${post.author.firstName} ${post.author.lastName}`;
  const createdAt = new Date(post.createdAt).toLocaleString();
  return (
    <>
      <Typography variant="body2">{author}</Typography>
      <Typography variant="caption">{createdAt}</Typography>
    </>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <CardActionArea>
        <CardHeader title={post.title} subheader={<Subheader post={post} />} />
        <CardContent>
          <Typography className={classes.content} variant="body2" color="textSecondary">
            {post.content.substring(0, 80)}
            {'...'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
