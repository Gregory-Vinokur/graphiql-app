import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { css } from '@emotion/react';
import Head from 'next/head';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const formContainerStyle = css`
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const formStyle = css`
    width: 100%;
    margin-top: 24px;
  `;

  const submitButtonStyle = css`
    margin: 24px 0 16px;
  `;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <div css={formContainerStyle}>
          <Typography component="h1" variant="h5" mt={10} mb={1}>
            Sign up
          </Typography>
          <form css={formStyle} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              css={submitButtonStyle}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default RegisterForm;
