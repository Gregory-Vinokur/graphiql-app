import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { List } from '@mui/material';
import Link from 'next/link';

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
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/">
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
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#605cb1',
                  '&:hover': {
                    bgcolor: '#48448d',
                  },
                }}
              >
                Sign Up
              </Button>
              <Link href="/graphiql">
                <Button variant="contained" sx={{ ml: 2 }}>
                  Go to Main Page
                </Button>
              </Link>
            </List>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
