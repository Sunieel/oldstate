import { useEffect } from 'react';
import Head from 'next/head';
// import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { HomeClients } from '../components/home/home-clients';
import { HomeSearch } from '../components/home/home-search';
import { HomeDevelopers } from '../components/home/home-developers';
import { HomeLawFirms } from '../components/home/home-lawfirms';
import { HomeVision } from '../components/home/home-vision';
// import { HomeFeatures } from '../components/home/home-features';
import { HomeTestimonials } from '../components/home/home-testimonials';
import { gtm } from '../lib/gtm';

import { AboutSpiel } from '../components/about/about-spiel';
import { AboutFounded } from '../components/about/about-founded';

const About = () => {
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
        <HomeVision />
        <AboutSpiel />
        <AboutFounded />

        {/* <HomeClients /> 
        <HomeDevelopers />
        <HomeSearch />
        <HomeLawFirms /> */}
        
      </main>
    </>
  );
};

About.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default About;
