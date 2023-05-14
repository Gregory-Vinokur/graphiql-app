import Head from 'next/head';
import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import TempSchema from '@/components/shema/TempSchema';

export default function WelcomePage() {
  return (
    <>
      <Head>
        <title>GraphiQL-app</title>
        <meta name="description" content="The clone app of GraphiQL playground" />
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
        <TempSchema />
        <FormattedMessage id="WELLCOM_TITEL" />
      </Box>
    </>
  );
}
