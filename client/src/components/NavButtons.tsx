import { Box, Typography } from '@material-ui/core';
import { useAuth } from 'contexts/AuthProvider';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import CardButton from './CardButton';

interface NavButtonsProps {}

const NavButtons: React.FC<NavButtonsProps> = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  return (
    <Box height="50" my={2} display="flex" justifyContent="center" width="100%">
      <CardButton buttonProps={{ onClick: () => router.push('/') }}>
        <Typography variant="button">🏠 Home</Typography>
      </CardButton>
      {isAuthenticated && (
        <>
          <CardButton buttonProps={{ onClick: () => router.push('/profile') }}>
            <Typography variant="button">🤵 Profile</Typography>
          </CardButton>
          <CardButton buttonProps={{ onClick: logout }}>
            <Typography variant="button">❌ Logout</Typography>
          </CardButton>
        </>
      )}
      {!isAuthenticated && (
        <>
          <CardButton buttonProps={{ onClick: () => router.push('/login') }}>
            <Typography variant="button">🚀 Login</Typography>
          </CardButton>
          <CardButton buttonProps={{ onClick: () => router.push('/register') }}>
            <Typography variant="button">🌟 Register</Typography>
          </CardButton>
        </>
      )}
    </Box>
  );
};

export default NavButtons;
