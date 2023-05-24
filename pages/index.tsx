import Head from 'next/head';
import { Box, Container, Link, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import BlockInfo from '@/components/BlockInfo/BlockInfo';

export default function WelcomePage() {
  const intl = useIntl();
  return (
    <>
      <Head>
        <title>GraphiQL-app</title>
        <meta name="description" content="The clone app of GraphiQL playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <BlockInfo title={intl.formatMessage({ id: 'ABOUT_US' })}>
            <FormattedMessage id="ABOUT_US_FIRST" />{' '}
            <Link target="_blank" underline="hover" href="https://github.com/Gregory-Vinokur">
              <FormattedMessage id="LINK_GREGORY" />
            </Link>
            ,{' '}
            <Link target="_blank" underline="hover" href="https://github.com/M0rl0ck">
              <FormattedMessage id="LINK_SERGEY" />
            </Link>{' '}
            <FormattedMessage id="ABOUT_US_SECOND" />{' '}
            <Link target="_blank" underline="hover" href="https://github.com/artemkamyshenkov">
              <FormattedMessage id="LINK_ARTEM" />
            </Link>{' '}
            <FormattedMessage id="ABOUT_US_THIRD" />{' '}
            <Typography
              variant="body1"
              component="span"
              sx={{ fontWeight: 'bold', fontSize: '1.23rem' }}
            >
              <FormattedMessage id="ABOUT_US_FOURTH" />
            </Typography>
            {'. '}
            <br />
            <FormattedMessage id="ABOUT_US_FIFTH" />
            <Link
              target="_blank"
              underline="hover"
              href="https://github.com/Gregory-Vinokur/RS-Clone/pull/9"
            >
              <FormattedMessage id="LINK_RS_CLONE" />
            </Link>{' '}
            <FormattedMessage id="ABOUT_US_SIXTH" />
          </BlockInfo>
          <BlockInfo title={intl.formatMessage({ id: 'ABOUT_PROJECT' })}>
            <FormattedMessage id="ABOUT_PROJECT_FIRST" />
            <br />
            <Link
              target="_blank"
              underline="hover"
              href="https://www.npmjs.com/package/@graphiql/react"
            >
              GraphiQL
            </Link>{' '}
            <FormattedMessage id="ABOUT_PROJECT_SECOND" /> <br />
            <FormattedMessage id="ABOUT_PROJECT_THIRD" />
            <Link target="_blank" underline="hover" href="https://rickandmortyapi.com/graphql">
              <FormattedMessage id="LINK_RICK_AND_MORTY" />
            </Link>{' '}
            GraphQL API.
          </BlockInfo>
          <BlockInfo title={intl.formatMessage({ id: 'ABOUT_COURSE' })}>
            {' '}
            <Link target="_blank" underline="hover" href="https://rs.school/react/">
              <FormattedMessage id="LINK_REACT_COURSE" />
            </Link>{' '}
            <FormattedMessage id="ABOUT_COURSE_FIRST" />
            <br /> <FormattedMessage id="ABOUT_COURSE_SECOND" />
            <br />
            <FormattedMessage id="ABOUT_COURSE_THIRD" />
          </BlockInfo>
        </Container>
      </Box>
    </>
  );
}
