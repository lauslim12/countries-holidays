import { Container } from '@mui/material';
import Head from 'next/head';
import { type ReactNode, memo } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="favicon.png" type="image/png" />
        <title>The Countries Holidays</title>
      </Head>

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {children}
      </Container>
    </>
  );
}

export default memo(Layout);
