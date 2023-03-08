
import Head from 'next/head';
import { MainLayout } from '../../components/main-layout';
import { Avatar, Box, Card, Checkbox, Link, Container, CardContent, Divider, Typography, Button, TextField } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';

import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/use-auth';

import { CustomBreadcrumb } from '../../components/custom-breadcrumb';

import { useMounted } from '../../hooks/use-mounted';

import { API, graphqlOperation } from 'aws-amplify';
import { updateUpdatedProviderListing } from '../../graphql/mutations';
import { listUpdatedProviderListings } from '../../graphql/queries'

import { useState, useEffect, useCallback } from 'react';

import { Amplify, AmplifyS3Image } from 'aws-amplify';
import { gtm } from '../../lib/gtm';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

// PAGINATES ALL RESULTS
const fetchListings = async (lastResults = [], nextToken = null) => {
  const updatedProviderListingRaw = await API.graphql({
    query: listUpdatedProviderListings,
    variables: {
      filter: { pending: { eq: true }, deleted: { ne: true } },
      nextToken
    },
    authMode: 'API_KEY',
  });
  let allResults = lastResults.concat(updatedProviderListingRaw.data.listUpdatedProviderListings.items);
  const token = updatedProviderListingRaw.data.listUpdatedProviderListings.nextToken;
  if (token) {
    console.log("GETTING PAGINATED RESULT")
    return await fetchListings(allResults, token);
  }
  return allResults;
}

const PendingLawyerListings = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  const { user } = useAuth();
  const isMounted = useMounted();

  const [pendingListings, setPendingListings] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPendingListings = useCallback(async () => {
    try {
      if (user && user.admin && isMounted()) {

        if (pendingListings.length < 1) {
          // let filter = ;
          // API.graphql({
          //     query: listUpdatedProviderListings,
          //     // variables: { place_id: lawyerDetails.place_id },

          //     variables: {
          //         filter: {pending: {eq: true}}
          //     },


          //     authMode: 'API_KEY',
          // }).then(pendingRaw =>{
          //     console.log(pendingRaw)
          //     setPendingListings(pendingRaw.data.listUpdatedProviderListings.items)
          // })
          setLoading(true);
          const pendingResults = await fetchListings();
          setPendingListings(pendingResults);
          setLoading(false);
        }

      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [isMounted, user]);

  useEffect(() => {
    getPendingListings();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getPendingListings]);


  const accept = async (place_id) => {

    await API.graphql({
      query: updateUpdatedProviderListing,
      variables: {
        input: {
          place_id,
          pending: false,
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });


    toast.success("Listing going live!");
    window.location.reload(false);

  };

  return (<>


    <Head>
      <title>
        Lawyer Details | Advocat
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >

      <Container

        maxWidth="md">


        <CustomBreadcrumb rootLabel="Home" />
        <Card>
          <CardContent sx={{ maxWidth: "100%", wordWrap: "break-word" }}>




            {user && user.admin && <>
              Pending listings
              <br /><br />
              {loading && "loading..."}


              <ul>

                {pendingListings.map(listing => <li
                  sx={{ maxWidth: "100%", wordWrap: "break-word" }}
                  key={listing.place_id}>

                  <img
                    src={listing.logo}
                    // sx={{
                    //   background: 'transparent',
                    //   // mr: 2,
                    //   maxWidth: "100px"
                    // }}
                    width="50%"
                  />

                  {Object.keys(listing).map(k =>
                    <div key={k}><strong>{k}</strong> {JSON.stringify(listing[k])}</div>
                  )}
                  {/* {JSON.stringify(listing)} */}


                  <Button
                    onClick={() => accept(listing.place_id)}
                  >Accept</Button>
                </li>)}

              </ul>


            </>}

            {(!user || !user.admin) && <>
              Page not accessible
            </>}


          </CardContent>
        </Card>


      </Container>
    </Box>
  </>
  );
};

export default PendingLawyerListings;

PendingLawyerListings.getLayout = (page) => <AuthGuard><MainLayout>{page}</MainLayout></AuthGuard>;



// LawyerSummary.propTypes = {
//   lawyer: PropTypes.object.isRequired
// };
