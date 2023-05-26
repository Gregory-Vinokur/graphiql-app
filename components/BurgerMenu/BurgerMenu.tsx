import SelectLanguage from '@/lang/SelectLanguage';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

type BurgerMenuProps = {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
  isVisible: boolean;
  handleMenuClose: () => void;
  handleLogOut: (event: React.SyntheticEvent) => void;
};

const BurgerMenu = ({
  isLoggedIn,
  isMenuOpen,
  isVisible,
  handleMenuClose,
  handleLogOut,
}: BurgerMenuProps) => {
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#c87084',
        },
      }}
      anchor="right"
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <List
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          marginTop: '24px',
        }}
        onClick={handleMenuClose}
      >
        <SelectLanguage />
        {!isLoggedIn && (
          <>
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  bgcolor: '#99419c',
                  '&:hover': {
                    bgcolor: '#b151b7',
                  },
                }}
              >
                <FormattedMessage id="SIGN_IN" />
              </Button>
            </Link>
            <Link href="/registration">
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#605cb1',
                  '&:hover': {
                    bgcolor: '#48448d',
                  },
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
              }}
              onClick={handleLogOut}
            >
              <FormattedMessage id="SIGN_OUT" />
            </Button>

            {isVisible && (
              <Link href="/graphiql">
                <Button variant="contained" sx={{ ml: 2 }}>
                  <FormattedMessage id="GO_TO_MAIN_PAGE" />
                </Button>
              </Link>
            )}
          </>
        )}
      </List>
    </Drawer>
  );
};

export default BurgerMenu;
