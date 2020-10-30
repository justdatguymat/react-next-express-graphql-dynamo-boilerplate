import { Box, Grid, TextField, useTheme } from '@material-ui/core';
import { useToaster } from 'contexts/toasterProvider';
import { useCreatePostMutation } from 'generated/graphql';
import React from 'react';
import { GrowAlert } from './Alert';
import LoadingButton from './LoadingButton';

type PostForm = {
  title: string;
  content: string;
};

type PostFormProps = {
  initValues?: PostForm;
};

const PostForm: React.FC<PostFormProps> = ({ initValues = {} as PostForm }) => {
  const theme = useTheme();
  const toast = useToaster();
  const [message, setMessage] = React.useState('');
  const [form, setForm] = React.useState(initValues);
  const [formErrors] = React.useState(initValues);
  const [{ fetching }, createPost] = useCreatePostMutation();

  const { title, content } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createPost(form);
    console.log('createPost response', response);

    if (response.error?.message) {
      setMessage(response.error?.message);
    } else {
      setMessage('');
    }
    if (response.data?.createPost) {
      toast.success('Post created');
    } else {
      setMessage('Something went wrong, try again');
    }
  };

  return (
    <form>
      {/*
      <Typography align="center" variant="h5">
        Create a new post
      </Typography>
         */}
      {message && (
        <GrowAlert active={!!message} severity="error">
          {message}
        </GrowAlert>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="title"
            id="title"
            label="Title"
            placeholder="A title..."
            value={title ? title : ''}
            onChange={handleChange}
            InputLabelProps={{ required: false }}
            error={!!formErrors.title}
            variant={theme.inputVariant}
            helperText={formErrors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="content"
            id="content"
            label="Content"
            placeholder="Write a post..."
            value={content ? content : ''}
            onChange={handleChange}
            variant={theme.inputVariant}
            InputLabelProps={{ required: false }}
            multiline
            rows={3}
            error={!!formErrors.content}
            helperText={formErrors.content}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Box width="50%">
              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                onClick={handleSubmit}
                loading={fetching}
              >
                Create a post
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
