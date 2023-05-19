import Head from 'next/head';
import { Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar';
import QueryWindow from '@/components/molecules/QueryWindow/QueryWindow';
import Response from '@/components/molecules/Response/Response';
import { IBodyQuery, useLazyGetResponseQuery } from '@/store/api/graphQLRequest';
import { setResponseValue } from '@/store/reducers/redactorValue';
import { useEffect } from 'react';
import Variables from '@/components/molecules/Variables/Variables';
import Schema from '@/components/molecules/Documentation/Schema';

export default function MainPage() {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const disp = useAppDispatch();
  const { queryValue, variablesValue, responseValue } = useAppSelector(
    (store) => store.redactorValue
  );
  const [getResponce, { data }] = useLazyGetResponseQuery();

  const getRes = () => {
    try {
      const bodyQueryValue: IBodyQuery = {
        bodyQuery: queryValue,
        var: JSON.parse(variablesValue),
      };
      getResponce(bodyQueryValue);
    } catch (e) {
      if (e instanceof Error) {
        disp(setResponseValue(e.message));
      }
    }
  };

  useEffect(() => {
    if (data) {
      disp(setResponseValue(JSON.stringify(data, null, 2)));
    }
  }, [data, disp]);

  if (!isLoggedIn) {
    return <ProgressBar />;
  }

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
          color: 'rgb(207, 108, 108)',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '40px 0',
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <QueryWindow />
        <Button
          variant="contained"
          sx={{ width: 'fit-content', alignSelf: 'center', mt: 1 }}
          onClick={getRes}
        >
          Send request
        </Button>
        <Response response={responseValue} />
      </Box>
      <Variables />
      <Schema />
    </>
  );
}
