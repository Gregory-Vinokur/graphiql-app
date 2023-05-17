import { Box } from '@mui/system';
import Header from '@/components/molecules/Header/Header';
import Footer from '@/components/molecules/Footer/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthStatus, Logout } from '@/firebase/firebaseAuth';
import { PATHS } from '@/constants/PATHS';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setUserStatus } from '@/store/reducers/userReducer';
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const { asPath } = router;

    if (!authChanged) return;

    if (isLoggedIn) {
      if (asPath === PATHS.LOGIN || asPath === PATHS.REGISTRATION) {
        router.replace('/graphiql');
      }
    }

    if (!isLoggedIn) {
      if (asPath === PATHS.EDITOR) {
        console.log(isLoggedIn);
        router.replace('/');
      }
    }
  }, [authChanged, isLoggedIn, router]);

  useEffect(() => {
    checkAuthStatus((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          const expirationTime = idTokenResult.expirationTime;
          const remainingTime = new Date(expirationTime).getTime() - Date.now();
          localStorage.setItem('token', idTokenResult.token);
          localStorage.setItem('remainingTime', remainingTime.toString());
        });
        setAuthChanged(true);
        dispatch(setUserStatus(true));
        console.log('User is signed in:', user);
      } else {
        dispatch(setUserStatus(false));
        console.log('User is signed out');
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const checkLogout = () => {
      const storedRemainingTime = Number(localStorage.getItem('remainingTime'));
      const updatedRemainingTime = storedRemainingTime - 1000;
      localStorage.setItem('remainingTime', updatedRemainingTime.toString());
      if (updatedRemainingTime <= 0) {
        Logout();
        clearInterval(intervalId);
      }
    };

    const intervalId: NodeJS.Timeout = setInterval(checkLogout, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, isLoggedIn]);

  if (!authChanged) {
    return <ProgressBar />;
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '94.1vh',
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
