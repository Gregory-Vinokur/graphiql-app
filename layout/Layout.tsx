import { Box } from '@mui/system';
import Header from '@/components/molecules/Header/Header';
import Footer from '@/components/molecules/Footer/Footer';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
