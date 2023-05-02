import Head from 'next/head';
import styles from '../styles/WelcomePage.module.css';

export default function WelcomePage() {
  return (
    <>
      <Head>
        <title>GraphiQL-app</title>
        <meta name="description" content="The clone app of GraphiQl playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/graphql.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.welcome}> Welcome Page</div>
      </main>
    </>
  );
}
