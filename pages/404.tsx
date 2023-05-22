import Head from 'next/head';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { PATHS } from '@/constants/PATHS';
import { useEffect } from 'react';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(PATHS.ERROR);
  }, [router]);

  return (
    <>
      <Head>
        <title>GraphiQL-app</title>
        <meta name="description" content="GraphiQL playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/graphql.ico" />
      </Head>
      <Box
        sx={{
          fontSize: 60,
          color: 'rgb(207, 108, 108)',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '10px 0',
          gap: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        404 - Page Not Found
      </Box>
    </>
  );
}
