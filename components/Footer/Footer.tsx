import { Box, Container, Link, Typography } from '@mui/material';
import github from '../../assets/github.svg';
import rsLogo from '../../assets/rs_school_js_white.svg';
import { styled } from '@mui/system';
import SocialLink from './../SocialLink/SocialLink';
import Image from 'next/image';

const FooterWrap = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1200,
  width: '100%',
  margin: '0 auto',
});

const FooterYear = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  color: 'white',
});

const GithubLinks = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  flexDirection: 'row',
  '@media (max-width: 680px)': {
    flexDirection: 'column',
  },
}));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        mb: 0,
        bgcolor: '#c87084',
        width: { xs: '150vw', sm: '100vw' },
        p: { xs: '5px 10px', md: '5px 0' },
      }}
    >
      <Container maxWidth="lg">
        <FooterWrap>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <GithubLinks>
              <SocialLink link="https://github.com/M0rl0ck" text="SERGEY SERGEEV" source={github} />
              <SocialLink
                link="https://github.com/artemkamyshenkov"
                text="artemkamyshenkov"
                source={github}
              />
              <SocialLink
                link="https://github.com/Gregory-Vinokur"
                text="Gregory-Vinokur"
                source={github}
              />
            </GithubLinks>
            <FooterYear>
              <Typography variant="subtitle1" component="p" sx={{ fontWeight: 900 }}>
                2023 ®
              </Typography>
              <Link href="https://rs.school/react/" target="_blank" rel="noreferrer">
                <Image src={rsLogo} alt="RS School Logo" height="25" />
              </Link>
            </FooterYear>
          </Box>
        </FooterWrap>
      </Container>
    </Box>
  );
};

export default Footer;
