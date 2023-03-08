import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Button, Link, Box, Container, Divider, Tab, Tabs, Typography, Grid, Avatar, CardContent, Card } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';
import { LawyerBox } from '../../components/lawyers/lawyer-box';
import NextLink from 'next/link';
import { useAuth } from '../../hooks/use-auth';
import { postcodeApi } from '../../__fake-api__/postcodes-api';
import { forUrl } from '../../utils/text-normaliser';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { listingsByUrlKey } from '../../graphql/queries';

Amplify.configure(awsExports);

// const listings = [
//   // {
//   //   name: "Fake Listing",
//   //   membership: "basic",
//   // }
// ]

const listingsAsLinks = (lss) => lss.map(l => {
  const keys = l.url_key.split(':::-:::');
  const stateForUrl = forUrl(l.state);
  const stateShort = postcodeApi.getShortState(stateForUrl);
  const stateShortForUrl = forUrl(stateShort);
  return `/lawyers/${stateShortForUrl}/${keys[1]}/${keys[2]}`;
})

const stateShortForUrl = (state) => {
  const stateForUrl = forUrl(state);
  const stateShort = postcodeApi.getShortState(stateForUrl);
  return forUrl(stateShort);
}


const listingsFromLinks = async (lss) => {
  const allCalls = lss.map(l =>
    API.graphql({
      query: listingsByUrlKey,
      variables: {
        url_key: l.url_key,
        // filter: { pending: { ne: true }, deleted: { ne: true } },
      },
      authMode: 'API_KEY',
    }));

  return (await Promise.all(allCalls)).map(l => l.data.listingsByUrlKey.items[0])
}

const Listings = () => {

  const { user } = useAuth();

  const [listings, setListings] = useState([]);

  const getListings = useCallback(async () => {
    try {
      if (user && user.listings) {
        console.log(user.listings)
        const parsed = JSON.parse(user.listings);
        //resolve promise
        const theListings = await listingsFromLinks(parsed);

        // .then( listings => {
        //   return listings;
        //   }).catch(err => {
        //     console.log(err);
        //     return [];
        //   }
        // );  

        setListings(theListings)
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);



  useEffect(() => {
    getListings();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getListings]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  return (
    <>
      <Head>
        <title>
          Dashboard: Profiles | Advocat
        </title>
      </Head>
  
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Grid
            alignItems="center"
            container
            sx={{
              backgroundColor: 'neutral.900',
              borderRadius: 1,
              color: '#FFFFFF',
              px: 4,
              py: 8
            }}
          >
            <Grid
              item
              xs={12}
              sm={7}
            >
              <Typography
                color="inherit"
                variant="h3"
              >
                Profiles
              </Typography>
              <Typography
                color="neutral.500"
                sx={{ mt: 2 }}
                variant="body1"
              >
                Create your profile today.
              </Typography>
              <NextLink
                href="/lawyers/new"
              >
                <Button
                  color="secondary"
                  size="large"
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  Create a new profile
                </Button>
              </NextLink>
            </Grid>
            <Grid
              item
              sm={5}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block'
                }
              }}
            >
              <img
                alt=""
                src="/avstatic/mock-images/jobs/job_browse_header.svg"
              />
            </Grid>
          </Grid>
          <br />
          

          {listings.length == 0 && <p>
            You have no profiles.
            You can search for your firm and claim it.
            If it doesn&apos;t exist, you can create a new profile.
          </p>}

          

          {listings.length > 0 && <Box sx={{ mt: 3 }}>
            <Grid
              container
              sx={{ width: "100%",
            '& .MuiBox-root':{
              pt: 0
            }
            
            }}
              spacing={1}
            
          >
            {listings.map((l, i) =>

              // <NextLink 
              // key={i}
              // // href={l}
              // >
              //   <Button
              //   variant='outlined'
              //   >{JSON.stringify(l)}</Button>
              // </NextLink>





              <LawyerBox
                key={i}
                lawyer={l}
                lawyerLink={`/lawyers/${stateShortForUrl(l.state)}/${forUrl(l.city)}/${forUrl(l.name)}`}
              />




            )}</Grid></Box>
            
            }
        </Container>
      </Box>
    </>
  );
};

Listings.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Listings;
