import Head from 'next/head';
import styles from '../styles/WelcomePage.module.css';
import { graphQLRequest } from '@/store/api/graphQLRequest';

export default function WelcomePage() {
  const query = `query GetAll($n: String) {
    characters(filter: {name: $n}) {
      info {
        count
      }
      results {
      name
      status
    }
      
    }
  }`;

  const variable = {
    n: 'Rick',
  };
  const { data } = graphQLRequest.useGetResponceQuery({ bodyQuery: query, var: variable });
  return (
    <>
      <Head>
        <title>GraphiQL-app</title>
        <meta name="description" content="The clone app of GraphiQl playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/graphql.ico" />
      </Head>
      <main className={styles.main}>
        {!!data && (
          <textarea readOnly value={JSON.stringify(data, null, 2)}>
            {' '}
          </textarea>
        )}
        <div className={styles.welcome}> Welcome Page</div>
      </main>
    </>
  );
}
