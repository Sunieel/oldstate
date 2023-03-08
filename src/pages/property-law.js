import { useEffect } from 'react';
import Head from 'next/head';
// import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';

import { HomeDevelopers } from '../components/property-law/home-developers';
import { ForLawyersFaqs } from '../components/property-law/for-lawyers-faqs';
// import { HomeFeatures } from '../components/home/home-features';
import {HomeSearch} from '../components/home/home-search';
import { gtm } from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Advocat
        </title>
      </Head>
      <main>
        {/* <HomeHero /> */}
        {/* <Divider /> */}
        <HomeDevelopers />
        {/* <FirmFeatures />
        <ShowcaseLawFirms />
        <FirmSearch />
        <PricingTable /> */}
        <ForLawyersFaqs />
        <HomeSearch />
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Home;
