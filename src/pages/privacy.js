import { useEffect } from 'react';
import Head from 'next/head';
// import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { PrivacyPolicy } from '../components/privacy/privacy-policy';

import { gtm } from '../lib/gtm';


const Privacy = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Privacy | Advocat
        </title>
      </Head>
      <main>
        <PrivacyPolicy />
      </main>
    </>
  );
};

Privacy.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Privacy;
