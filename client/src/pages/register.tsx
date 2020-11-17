import React from 'react';
import { Container, Grid, Typography, useTheme } from '@material-ui/core';
import { Person, AlternateEmail, Lock, LockOpen } from '@material-ui/icons';
import TextFieldWithIcon from 'components/TextFieldWithIcon';
import { convertFromFullName, testEmail, testPassword } from 'utils';
import { useAuth } from 'contexts/AuthProvider';
import { GrowAlert } from 'components/Alert';
import LoadingButton from 'components/LoadingButton';
import Layout from 'components/Layout';
import { NextPage } from 'next';
import { withApollo } from 'components/withApollo';
import { withAuthGuard } from 'components/withAuthGuard';

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
    setMessage('');
    if (validateForm()) {
      const [firstName, lastName] = convertFromFullName(fullName);
      const { error, message } = await register({ firstName, lastName, ...form });

      if (message) {
        setMessage(message);
      }
      if (error) {
        const { firstName, lastName } = error;
        let fullName = firstName ? firstName + '. ' : '';
        fullName += lastName ? lastName + '. ' : '';
        setFormErrors((prev) => ({ ...prev, fullName, ...error }));
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
    setFormErrors(errors);
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
          Join the gang 💪
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
          <Grid container spacing={1} justify="flex-end">
            <Grid item xs={8}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant={theme.buttonVariant.primary}
                loading={loading}
              >
                ✔ Create Account
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

const WithApollo = withApollo<RegisterProps>({ ssr: false })(Register);
const WithAuthGuard = withAuthGuard<RegisterProps>({ ifAuth: '/profile' })(WithApollo);

export default WithAuthGuard;
