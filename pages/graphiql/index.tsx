import Head from 'next/head';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import QueryWindow from '@/components/QueryWindow/QueryWindow';
import Response from '@/components/Response/Response';
import { IBodyQuery, useGetShemaQuery, useLazyGetResponseQuery } from '@/store/api/graphQLRequest';
import { setResponseValue } from '@/store/reducers/redactorValue';
import { useEffect, useState } from 'react';
import Variables from '@/components/Variables/Variables';
import dynamic from 'next/dynamic';
import Article from '@mui/icons-material/Article';
import { Tooltip, Typography, useMediaQuery } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { FormattedMessage, useIntl } from 'react-intl';

const DynamicSchema = dynamic(() => import('@/components/Documentation/Schema'), {
  loading: () => <ProgressBar />,
});

interface ResponseError {
  data: {
    errors: {
      message: string;
    }[];
  };
}

export default function MainPage() {
  const { data: dataSchema } = useGetShemaQuery();
  const types = dataSchema?.data.__schema.types;
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const [errorMessage, setErrorMessage] = useState('');
  const disp = useAppDispatch();
  const { queryValue, variablesValue, responseValue } = useAppSelector(
    (store) => store.redactorValue
  );
  const [getResponce, { data }] = useLazyGetResponseQuery();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:899px)');
  const intl = useIntl();

  const handleDocClick = () => {
    setOpen(!open);
  };

  const getRes = async () => {
    try {
      const bodyQueryValue: IBodyQuery = {
        bodyQuery: queryValue,
        var: JSON.parse(variablesValue),
      };
      const response = await getResponce(bodyQueryValue);
      if (response.error) {
        disp(setResponseValue(''));
        const message = (response.error as ResponseError).data?.errors[0].message;
        setErrorMessage(message);
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
      <Grid container spacing={1} sx={{ padding: '50px 5px' }}>
        <Button color="inherit" sx={{ position: 'absolute', top: '76px' }} onClick={handleDocClick}>
          <Article sx={{ mr: 2, fill: 'grey', ...(open && { fill: 'black' }) }} />
          <Typography>
            {!open ? <FormattedMessage id="SHOW_DOCS" /> : <FormattedMessage id="HIDE_DOCS" />}
          </Typography>
        </Button>
        {!!dataSchema && open && (
          <Grid item xs={12} md={3}>
            <DynamicSchema types={types} />
          </Grid>
        )}
        <Grid item xs={12} md={!!dataSchema ? 4 : 6}>
          <Box>
            <QueryWindow />
            <Variables />
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex', paddingLeft: isMobile ? '45vw' : '8px' }}>
          <Tooltip title={intl.formatMessage({ id: 'SEND_REQUEST' })}>
            <Button
              variant="contained"
              sx={{ width: 'fit-content', alignSelf: 'center', mt: 1 }}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
                getRes();
              }}
            >
              {isLoading ? (
                <PauseCircleFilledIcon fontSize="large" />
              ) : (
                <PlayCircleIcon fontSize="large" />
              )}
            </Button>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={!!dataSchema ? 4 : 5}>
          <Response response={responseValue} message={errorMessage} />
        </Grid>
      </Grid>
    </>
  );
}
