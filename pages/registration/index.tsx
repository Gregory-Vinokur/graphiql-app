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
import { FormattedMessage, useIntl } from 'react-intl';
import { IMessageID } from '@/lang/en-US';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'ENTER_VALID_EMAIL')
    .required('EMAIL_IS_REQUIRED'),
  password: yup
    .string()
    .min(8, 'PASSWORD_MIN_LENGTH')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/, 'PASSWORD_MATCH')
    .required('PASSWORD_IS_REQUIRED'),
});

const RegisterForm = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const intl = useIntl();

  function getTranslate(key: IMessageID | undefined) {
    if (!key) {
      return '';
    }
    return intl.formatMessage({ id: key });
  }

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
            <FormattedMessage id="SIGN_UP_TITLE" />
          </Typography>
          <form css={formStyle} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={intl.formatMessage({ id: 'EMAIL_LABEL' })}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email && getTranslate(formik.errors.email as IMessageID)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={intl.formatMessage({ id: 'PASSWORD_LABEL' })}
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={
                    formik.touched.password && getTranslate(formik.errors.password as IMessageID)
                  }
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              css={submitButtonStyle}
            >
              <FormattedMessage id="SIGN_UP" />
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default RegisterForm;
