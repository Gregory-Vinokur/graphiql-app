import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { List, IconButton, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import SelectLanguage from '@/lang/SelectLanguage';
import { useAppSelector } from '@/store/hooks/hooks';
import { Logout } from '@/firebase/firebaseAuth';
import { useRouter } from 'next/router';
import { PATHS } from '@/constants/PATHS';
import { FormattedMessage } from 'react-intl';
import MenuIcon from '@mui/icons-material/Menu';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

interface ElevationScrollProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      transition: 'height 0.3s ease',
      height: trigger ? '4.5rem' : '5rem',
      bgcolor: trigger ? '#813648' : '#c87084',
    },
  });
}

const Header = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  React.useEffect(() => {
    const { asPath } = router;

    if (asPath === PATHS.EDITOR) {
      setIsVisible(false);
    }

    if (asPath !== PATHS.EDITOR) {
      setIsVisible(true);
    }
  }, [router]);

  const handleLogOut = (event: React.SyntheticEvent) => {
    event.preventDefault();
    Logout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href={PATHS.DEFAULT}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    scale: '1.05',
                    color: 'antiquewhite',
                  },
                }}
              >
                GraphiQL
              </Typography>
            </Link>
            <List>
              {!isMobile && <SelectLanguage />}
              {!isLoggedIn && (
                <>
                  <Link href={PATHS.SIGN_IN}>
                    <Button
                      variant="contained"
                      sx={{
                        mr: 2,
                        bgcolor: '#99419c',
                        '&:hover': {
                          bgcolor: '#b151b7',
                        },
                        display: { xs: 'none', sm: 'inline-flex' },
                      }}
                    >
                      <FormattedMessage id="SIGN_IN" />
                    </Button>
                  </Link>
                  <Link href={PATHS.SIGN_UP}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#605cb1',
                        '&:hover': {
                          bgcolor: '#48448d',
                        },
                        display: { xs: 'none', sm: 'inline-flex' },
                      }}
                    >
                      <FormattedMessage id="SIGN_UP" />
                    </Button>
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#605cb1',
                      '&:hover': {
                        bgcolor: '#48448d',
                      },
                      display: { xs: 'none', sm: 'inline-flex' },
                    }}
                    onClick={handleLogOut}
                  >
                    <FormattedMessage id="SIGN_OUT" />
                  </Button>

                  {isVisible && (
                    <Link href={PATHS.EDITOR}>
                      <Button
                        variant="contained"
                        sx={{ ml: 2, display: { xs: 'none', sm: 'inline-flex' } }}
                      >
                        <FormattedMessage id="GO_TO_MAIN_PAGE" />
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </List>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="end"
              onClick={handleMenuToggle}
              sx={{ display: { sm: 'none' }, marginRight: '20px' }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <BurgerMenu
        isLoggedIn={isLoggedIn}
        isMenuOpen={isMenuOpen}
        isVisible={isVisible}
        handleMenuClose={handleMenuClose}
        handleLogOut={handleLogOut}
      />
    </React.Fragment>
  );
};

export default Header;
