import { Box } from '@mui/system';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuthStatus, Logout } from '@/firebase/firebaseAuth';
import { PATHS } from '@/constants/PATHS';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setUserStatus } from '@/store/reducers/userReducer';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [authChanged, setAuthChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { asPath } = router;

    if (!authChanged) return;

    if (isLoggedIn) {
      if (asPath === PATHS.LOGIN || asPath === PATHS.REGISTRATION) {
        router.replace('/graphiql');
      }
    }

    if (!isLoggedIn && asPath === PATHS.EDITOR) {
      router.replace('/');
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
      } else {
        dispatch(setUserStatus(false));
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

  useEffect(() => {
    setIsLoading(false);
  }, [authChanged]);

  if (isLoading) {
    return <ProgressBar />;
  }

  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

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
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
