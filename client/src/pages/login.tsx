import React from 'react';
import { Button, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import TextFieldWithIcon from 'components/TextFieldWithIcon';
import { AccountCircle, Lock, Person } from '@material-ui/icons';
import { testEmail } from 'utils';
import { useAuth } from 'contexts/authProvider';
import { GrowAlert } from 'components/Alert';
import LoadingButton from 'components/LoadingButton';
import Layout from 'components/Layout';
import { withApollo } from 'lib/apollo/withApollo';
import { NextPage } from 'next';
import { LoginInput } from 'codegen/graphql-apollo';

type LoginForm = {
  email: string;
  password: string;
};

interface LoginProps {
  initValues: LoginInput;
}

const Login: NextPage<LoginProps, LoginProps> = ({ initValues = {} as LoginProps }) => {
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
    if (validateForm()) {
      const response = await login(form);
      console.log('login response', response);

      if (response.message) {
        setMessage(response.message);
      } else {
        setMessage('');
      }
      if (response.errors) {
        setFormErrors(response.errors);
      } else if (response.user) {
        console.log('ROUTER PUSH', router.query);
        router.push(`/user/${response.user.id}`);
      } else {
        setMessage('Something went wrong, try again');
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

          <Grid container spacing={1} justify="space-between">
            <Grid item xs={4}>
              <Button
                variant={theme.buttonVariant.secondary}
                fullWidth
                color="primary"
                onClick={() => router.push('/register')}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={8}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant={theme.buttonVariant.primary}
                loading={loading.login}
              >
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default withApollo<LoginProps>({ ssr: false })(Login);
