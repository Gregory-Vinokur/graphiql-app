import Head from 'next/head';
import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { IBodyQuery, useLazyGetResponceQuery } from '@/store/api/graphQLRequest';
import {
  setRedactorValue,
  setResponceValue,
  setVariablesValue,
} from '@/store/reducers/redactorValue';
import { useEffect } from 'react';

export default function WelcomePage() {
  const disp = useAppDispatch();
  const { queryValue, variablesValue, responceValue } = useAppSelector(
    (store) => store.redactorValue
  );
  const [getResponce, { data }] = useLazyGetResponceQuery();

  const getRes = () => {
    try {
      const bodyQueryValue: IBodyQuery = {
        bodyQuery: queryValue,
        var: JSON.parse(variablesValue),
      };
      getResponce(bodyQueryValue);
    } catch (e) {
      if (e instanceof Error) {
        disp(setResponceValue(e.message));
      }
    }
  };

  useEffect(() => {
    if (data) {
      disp(setResponceValue(JSON.stringify(data, null, 2)));
    }
  }, [data, disp]);
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
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <textarea
          style={{
            width: '1000px',
            minHeight: '60px',
            marginTop: '50px',
            maxHeight: '500px',
            border: '1px solid red',
            fontSize: '16px',
            overflowY: 'auto',
          }}
          value={queryValue}
          onChange={(e) => disp(setRedactorValue(e.target.value))}
        ></textarea>
        <textarea
          style={{
            width: '1000px',
            minHeight: '60px',
            maxHeight: '500px',
            border: '1px solid red',
            fontSize: '16px',
            overflowY: 'auto',
          }}
          value={variablesValue}
          onChange={(e) => disp(setVariablesValue(e.target.value))}
        />
        <pre
          style={{
            width: '1000px',
            minHeight: '60px',
            maxHeight: '300px',
            border: '1px solid red',
            fontSize: '16px',
            overflowY: 'auto',
          }}
        >
          {responceValue}
        </pre>
        <button onClick={getRes}>Get</button>
        <FormattedMessage id="WELLCOM_TITEL" />
      </Box>
    </>
  );
}
