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
import { HomeServices } from '../components/home/home-services';
import { gtm } from '../lib/gtm';
import { forUrl } from '../utils/text-normaliser';
import lawyers from "../__fake-api__/cleaned-lawyers.json";


//  // loop through lawyers
// const ll = lawyers.map((lawyer) => {
//   const u = `${forUrl(lawyer.state)}/${forUrl(lawyer.city)}/${forUrl(lawyer.name)}`;
//   const n = lawyer.name;
//   return {n, u};
// });

// // sort array of objects
// const sortArray = (arr, key) => {
//   return arr.sort((a, b) => {
//     const x = a[key];
//     const y = b[key];
//     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// };

// // sort lawyers by name
// const sortedLawyers = sortArray(ll, 'n');


// console.log(sortedLawyers);

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
        <HomeSearch />
        <HomeServices />
        <HomeClients /> 
        <HomeLawFirms />
        <HomeVision />
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
