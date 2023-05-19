import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Head from 'next/head';
import { signIn } from '@/firebase/firebaseAuth';
import { useAppSelector } from '@/store/hooks/hooks';
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          {error && (
            <Typography variant="body1" align="center" color="error">
              {error}
            </Typography>
          )}
        </form>
      </Container>
    </>
  );
};

export default LoginPage;
