import Head from 'next/head';
import { Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import QueryWindow from '@/components/QueryWindow/QueryWindow';
import Response from '@/components/Response/Response';
import { IBodyQuery, useLazyGetResponseQuery } from '@/store/api/graphQLRequest';
import { setResponseValue } from '@/store/reducers/redactorValue';
import { useEffect, useState } from 'react';
import Variables from '@/components/Variables/Variables';

interface ResponseError {
  data: {
    errors: {
      message: string;
    }[];
  };
}

export default function MainPage() {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [errorMessage, setErrorMessage] = useState('');
  const disp = useAppDispatch();
  const { queryValue, variablesValue, responseValue } = useAppSelector(
    (store) => store.redactorValue
  );
  const [getResponce, { data }] = useLazyGetResponseQuery();

  const getRes = async () => {
    try {
      const bodyQueryValue: IBodyQuery = {
        bodyQuery: queryValue,
        var: JSON.parse(variablesValue),
      };
      const response = await getResponce(bodyQueryValue);
      if (response.error) {
        disp(setResponseValue(''));
        setErrorMessage((response.error as ResponseError).data?.errors[0].message);
      }
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
        <Response response={responseValue} message={errorMessage} />
      </Box>
      <Variables />
    </>
  );
}
