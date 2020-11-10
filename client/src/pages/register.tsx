import React from 'react';
import { Button, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { Person, AlternateEmail, Lock, LockOpen, Home } from '@material-ui/icons';
import TextFieldWithIcon from 'components/TextFieldWithIcon';
import { convertFromFullName, testEmail, testPassword } from 'utils';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'contexts/authProvider';
import { GrowAlert } from 'components/Alert';
import LoadingButton from 'components/LoadingButton';
import Layout from 'components/Layout';
import { withApollo } from 'lib/apollo/withApollo';
import { NextPage } from 'next';

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  repassword: string;
};

interface RegisterProps {
  initValues: RegisterForm;
}

const Register: NextPage<RegisterProps> = ({ initValues = {} as RegisterForm }) => {
  const theme = useTheme();
  const router = useRouter();
  const { register, loading } = useAuth();
  const [message, setMessage] = React.useState('');
  const [form, setForm] = React.useState(initValues);
  const [formErrors, setFormErrors] = React.useState(initValues);
  const [lockIcons, setLockIcons] = React.useState({
    password: <LockOpen fontSize="large" />,
    repassword: <LockOpen fontSize="large" />,
  });

  const { fullName, email, password, repassword } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const [firstName, lastName] = convertFromFullName(fullName);
      const response = await register({ firstName, lastName, ...form });

      if (response.message) {
        setMessage(response.message);
      } else {
        setMessage('');
      }
      if (response.errors) {
        const validation = { ...initValues, ...response.errors };
        validation.fullName = '';
        validation.fullName += validation.firstName ? validation.firstName + '. ' : '';
        validation.fullName += validation.lastName ? validation.lastName + '.' : '';
        setFormErrors(validation);
      } else if (response.user) {
        router.push(`/user/${response.user.id}`);
      } else {
        setMessage('Something went wrong, try again');
      }
    }
  };

  const validateForm = (): boolean => {
    const errors = {} as RegisterForm;
    let valid = true;
    if (fullName.split(' ').length < 2) {
      errors.fullName = 'Please provide your full name';
      valid = false;
    }
    if (!testEmail(email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (testPassword(password)) {
      if (password !== repassword) {
        errors.repassword = 'Password doesn\'t match';
        valid = false;
      }
    } else {
      errors.password = 'Password must contain a number, an upper and a lower case letter';
      valid = false;
    }
    valid = true;
    //setFormErrors(errors);
    return valid;
  };

  React.useEffect(() => {
    setLockIcons((prev) => ({
      ...prev,
      password: testPassword(password) ? <Lock fontSize="large" /> : <LockOpen fontSize="large" />,
    }));
  }, [password]);

  React.useEffect(() => {
    setLockIcons((prev) => ({
      ...prev,
      repassword:
        password === repassword && testPassword(repassword) ? (
          <Lock fontSize="large" />
        ) : (
          <LockOpen fontSize="large" />
        ),
    }));
  }, [password, repassword]);

  return (
    <Layout title="Register &">
      <Container maxWidth="xs">
        <Typography align="center" variant="h3" color="textSecondary">
          Register
        </Typography>
        <Typography align="center" variant="h6">
          Become a new member
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
            id="fullName"
            name="fullName"
            label="Full Name"
            icon={<Person fontSize="large" />}
            value={fullName ? fullName : ''}
            onChange={handleChange}
            autoComplete="name fname lname"
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
          />

          <TextFieldWithIcon
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            icon={<AlternateEmail fontSize="large" />}
            value={email ? email : ''}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <TextFieldWithIcon
            required
            fullWidth
            password
            id="password"
            name="password"
            label="Password"
            icon={lockIcons.password}
            value={password ? password : ''}
            autoComplete="new-password"
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <TextFieldWithIcon
            required
            fullWidth
            password
            id="repassword"
            name="repassword"
            label="Retype Password"
            icon={lockIcons.repassword}
            autoComplete="new-password"
            value={repassword ? repassword : ''}
            onChange={handleChange}
            error={!!formErrors.repassword}
            helperText={formErrors.repassword}
          />
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={4}>
              <Button
                variant={theme.buttonVariant.secondary}
                fullWidth
                color="primary"
                startIcon={<Home />}
                onClick={() => router.push('/')}
              >
                Home
              </Button>
            </Grid>
            <Grid item xs={8}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant={theme.buttonVariant.primary}
                loading={loading.register}
              >
                Create Account
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default withApollo<RegisterProps>({ ssr: true })(Register);
