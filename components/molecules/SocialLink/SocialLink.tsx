import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

type SocialLinkProps = {
  link: string;
  text: string;
  source: string;
};

const SocialLink = ({ link, text, source }: SocialLinkProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      underline="none"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box component="span" sx={{ mr: 1 }}>
        <Image src={source} alt={text} width={18} height={18} />
      </Box>
      <Typography
        variant="body2"
        sx={{
          textDecoration: 'none',
          color: 'white',
          borderBottom: '2px solid transparent',
          transition: 'border-bottom 0.2s',
          fontSize: '14px',
          '&:hover': {
            borderBottom: '0.5px solid white',
          },
        }}
      >
        {text}
      </Typography>
    </Link>
  );
};

export default SocialLink;
