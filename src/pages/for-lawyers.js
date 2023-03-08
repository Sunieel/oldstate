import { useEffect } from 'react';
import Head from 'next/head';
// import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { PricingTable } from '../components/for-lawyers/pricing-table';
import { FirmSearch } from '../components/for-lawyers/firm-search';
import { HomeDevelopers } from '../components/for-lawyers/home-developers';
import { ShowcaseLawFirms } from '../components/for-lawyers/for-lawyers-showcase';
import { ForLawyersFaqs } from '../components/for-lawyers/for-lawyers-faqs';
// import { HomeFeatures } from '../components/home/home-features';
import { FirmFeatures } from '../components/for-lawyers/for-lawyers-features';
import { gtm } from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Advocat | For Lawyers &amp; Firms
        </title>
      </Head>
      <main>
        {/* <HomeHero /> */}
        {/* <Divider /> */}
        <HomeDevelopers />
        <FirmFeatures />
        <ShowcaseLawFirms />
        <FirmSearch />
        <PricingTable />
        {/* <ForLawyersFaqs /> */}
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
