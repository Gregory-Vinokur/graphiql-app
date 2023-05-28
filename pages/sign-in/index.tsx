import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Head from 'next/head';
import { signIn } from '@/firebase/firebaseAuth';
import { useAppSelector } from '@/store/hooks/hooks';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { FormattedMessage, useIntl } from 'react-intl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

const LoginPage = () => {
  const intl = useIntl();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const errorCode = await signIn(email, password);
    let authError = '';
    let emailError = '';
    let passwordError = '';
    if (errorCode) {
      if (errorCode === 'auth/wrong-password') {
        passwordError = intl.formatMessage({ id: 'AUTH_WRONG_PASSWORD' });
      }
      if (errorCode === 'auth/user-not-found') {
        emailError = intl.formatMessage({ id: 'AUTH_WRONG_USER' });
      }
      if (errorCode === 'auth/invalid-email') {
        emailError = intl.formatMessage({ id: 'AUTH_WRONG_EMAIL' });
      }
      if (errorCode === 'auth/too-many-requests') {
        authError = intl.formatMessage({ id: 'AUTH_TOO_MANY_REQUESTS' });
      }
      if (errorCode === 'auth/missing-password') {
        passwordError = intl.formatMessage({ id: 'AUTH_MISSING_PASSWORD' });
      }
      if (email.trim() === '') {
        emailError = intl.formatMessage({ id: 'EMAIL_IS_REQUIRED' });
      }
      if (password.trim() === '') {
        passwordError = intl.formatMessage({ id: 'PASSWORD_IS_REQUIRED' });
      }
      setAuthError(authError);
      setEmailError(emailError);
      setPasswordError(passwordError);
    }
  };

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ErrorBoundary>
        <Container maxWidth="xs">
          <Typography variant="h4" align="center" gutterBottom>
            <FormattedMessage id="SIGN_IN_TITLE" />
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label={intl.formatMessage({ id: 'EMAIL_LABEL' })}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label={intl.formatMessage({ id: 'PASSWORD_LABEL' })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              <FormattedMessage id="SIGN_IN" />
            </Button>
            {authError && (
              <Typography variant="body1" align="center" color="error">
                {authError}
              </Typography>
            )}
          </form>
        </Container>
      </ErrorBoundary>
    </>
  );
};

export default LoginPage;
