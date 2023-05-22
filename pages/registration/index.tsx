import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { css } from '@emotion/react';
import Head from 'next/head';
import { signUp } from '@/firebase/firebaseAuth';
import { useAppSelector } from '@/store/hooks/hooks';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      'Password must contain at least one letter, one digit and one special character'
    )
    .required('Password is required'),
});

const RegisterForm = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signUp(values.email, values.password);
    },
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

  if (isLoggedIn) {
    return <ProgressBar />;
  }

  return (
    <>
      <Head>
        <title>Registration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container component="main" maxWidth="xs">
        <div css={formContainerStyle}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form css={formStyle} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
