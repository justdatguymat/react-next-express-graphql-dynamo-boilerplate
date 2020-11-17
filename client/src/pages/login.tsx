import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Button, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { AccountCircle, Lock, Person } from '@material-ui/icons';
import { LoginInput } from 'codegen/graphql-request';
import { useAuth } from 'contexts/AuthProvider';
import { testEmail } from 'utils';
import { GrowAlert } from 'components/Alert';
import { withApollo } from 'components/withApollo';
import TextFieldWithIcon from 'components/TextFieldWithIcon';
import LoadingButton from 'components/LoadingButton';
import Layout from 'components/Layout';
import { withAuthGuard } from 'components/withAuthGuard';

type LoginForm = {
  email: string;
  password: string;
};

interface LoginProps {
  initValues: LoginInput;
}

const Login: NextPage<LoginProps, LoginProps> = ({ initValues = {} as LoginForm }) => {
  const theme = useTheme();
  const router = useRouter();
  const { login, loading } = useAuth();
  const [message, setMessage] = React.useState('');
  const [form, setForm] = React.useState(initValues);
  const [formErrors, setFormErrors] = React.useState(initValues);

  const { email, password } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    if (validateForm()) {
      const { error, user, message } = await login(form);
      if (message) {
        setMessage(message);
      }
      if (error) {
        setFormErrors(error);
      } else if (user) {
        //router.push('/profile');
      }
    }
  };

  const validateForm = () => {
    const errors = {} as LoginForm;
    let valid = true;
    if (!testEmail(email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <Layout title="Login &">
      <Container maxWidth="xs">
        <Typography align="center" variant="h6">
          <AccountCircle fontSize="large" color="primary" style={{ fontSize: '7em' }} />
        </Typography>
        {message && (
          <GrowAlert active={!!message} severity="error">
            {message}
          </GrowAlert>
        )}
        <form onSubmit={handleSubmit}>
          <TextFieldWithIcon
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            icon={<Person fontSize="large" />}
            value={email ? email : ''}
            onChange={handleChange}
            autoComplete="email"
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextFieldWithIcon
            required
            password
            fullWidth
            id="password"
            name="password"
            label="Password"
            icon={<Lock fontSize="large" />}
            value={password ? password : ''}
            onChange={handleChange}
            autoComplete="current=password"
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <Grid container spacing={1} justify="flex-end">
            <Grid item xs={8}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant={theme.buttonVariant.primary}
                loading={loading}
              >
                🚀 Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

/*
export default withAuthGuard<LoginProps>({ ifAuth: '/profile' })(
  withApollo<LoginProps>({ ssr: false })(Login)
);
*/

const WithApollo = withApollo<LoginProps>({ ssr: false })(Login);
const WithAuthGuard = withAuthGuard<LoginProps>({ ifAuth: '/profile' })(WithApollo);

export default WithAuthGuard;
