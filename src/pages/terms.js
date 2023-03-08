import { useEffect } from 'react';
import Head from 'next/head';
// import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';

import { WebsiteTerms } from '../components/privacy/website-terms';
import { gtm } from '../lib/gtm';


const Terms = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
         Terms and Conditions | Advocat
        </title>
      </Head>
      <main>
        {/* <HomeVision />
        <AboutSpiel />
        <AboutFounded /> */}
<WebsiteTerms />
        {/* <HomeClients /> 
        <HomeDevelopers />
        <HomeSearch />
        <HomeLawFirms /> */}
        
      </main>
    </>
  );
};

Terms.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Terms;
