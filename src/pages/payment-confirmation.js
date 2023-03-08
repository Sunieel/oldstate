import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '../components/main-layout';

import Link from 'next/link';
import Head from 'next/head';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
// import { CheckoutBilling } from '../components/checkout/checkout-billing';
import { CheckoutOrderSummary } from '../components/checkout/checkout-order-summary';
// import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
// import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';
// import { Lock as LockIcon } from '../icons/lock';
import { gtm } from '../lib/gtm';
import { useAuth } from '../hooks/use-auth';

import { Amplify, Auth, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { AuthGuard } from '../components/authentication/auth-guard';
import { AccountSubscription } from '../components/dashboard/account/account-subscription';

Amplify.configure(awsconfig);


const stripeGetPrices = async () => {
  const apiName = 'advocatStripe';
  const path = '/stripe-config';
  return await API.get(apiName, path);
};

const stripeGetSubscriptions = async (queryStringParameters) => {
  const apiName = 'advocatStripe';
  const path = '/subscriptions';
  return await API.get(apiName, path, { queryStringParameters });
};

const PaymentSuccess = ({ data }) => {
  const { product } = data;



  const { user, update_user } = useAuth();

  const [customerId, setCustomerId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    if (user) {
      // console.log(user);
      // console.log(product );
      setCustomerId(user.stripeCustomerId);
    }
  }, [user]);


  useEffect(() => {
    const fetchData = async () => {
      // console.log(customerId);
      const sub = await stripeGetSubscriptions({ customerId: customerId, status: 'active' });
      setSubscriptions(sub.subscriptions.data);
    }
    if (customerId) fetchData();
  }, [customerId]);

  useEffect(() => {
    const updateUserPlan = async (plan) => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        authUser.attributes['custom:subscriptionPlan'] = plan;
        await Auth.updateUserAttributes(authUser, {
          'custom:subscriptionPlan': plan
        }).catch(err => console.log("didn't update cognito", err));
        update_user(authUser);
      } catch (error) {
        console.log(error);
      }
    }

    if (subscriptions.length > 0) {
      if (product.id === subscriptions[0].plan.id) {
        updateUserPlan("Premium");
      }
    }
  }, [subscriptions, product]);

  if (!subscriptions) {
    return '';
  }
  return (
    <>
      <Head>
        <title>
          Payment Confirmation | Advocat
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1"
            align="center"
            sx={{ mb: 3 }}>
            Payment Confirmation
          </Typography>
          <Grid container
            spacing={3}>
            <Grid item
              xs={12}
              md={6}>
              <Box >
                <Typography variant="h4"
                  color="success">Status: Paid</Typography>
              </Box>
              {product && (
                <>
                  <CheckoutOrderSummary products={[product]}
                    total={product.unit_amount / 100} />
                </>
              )}

            </Grid>
            <Grid item
              xs={12}
              md={6}>
              <Typography variant="h4"
                gutterBottom>
                Active subscriptions
              </Typography>

              <Box id="subscriptions">
                {subscriptions.map(s => {
                  return <AccountSubscription key={s.id}
                    subscription={s} />
                })}
              </Box>
              <Box>
                <Link href="/dashboard/account">Manage your subscriptions</Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};




export const getServerSideProps = async (context) => {
  let { priceId } = context.query;
  const { prices, publishableKey } = await stripeGetPrices();
  // const sub = await stripeGetSubscriptions({ customerId: customerId, status: 'active' });
  // console.log(sub.data);
  // const subscriptions = sub.subscriptions.data;
  // console.log("context", context);
  let product = null;
  if (priceId) {
    product = prices.find(price => price.id === priceId);
  } else {
    priceId = null;
  }

  const data = { priceId, prices, publishableKey, product };
  // Pass data to the page via props
  return { props: { data } }
}


PaymentSuccess.getLayout = (page) => (
  <AuthGuard>

    <MainLayout>
      {page}
    </MainLayout>
  </AuthGuard>
);

export default PaymentSuccess;
