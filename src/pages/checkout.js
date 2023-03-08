import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '../components/main-layout';

// import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
// import { CheckoutBilling } from '../components/checkout/checkout-billing';
import { CheckoutOrderSummary } from '../components/checkout/checkout-order-summary';
// import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
// import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';
// import { Lock as LockIcon } from '../icons/lock';
import { gtm } from '../lib/gtm';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';
import {
  // CardElement,
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Amplify, Auth, API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { PricingTable } from '../components/for-lawyers/pricing-table';
import { AuthGuard } from '../components/authentication/auth-guard';


Amplify.configure(awsconfig);

const stripeCreateCustomer = async (body) => {
  const apiName = 'advocatStripe';
  const path = '/stripe-create-customer';
  const params = { body };
  return await API.post(apiName, path, params);
};

const stripeCreateSubscription = async (body) => {
  const apiName = 'advocatStripe';
  const path = '/stripe-create-subscription';
  const params = { body };
  return await API.post(apiName, path, params);
}

const stripeGetPrices = async () => {
  const apiName = 'advocatStripe';
  const path = '/stripe-config';
  return await API.get(apiName, path);
};
// http://localhost:3000/?payment_intent=pi_3LZwW4LBSfg1TvQg0nQQxGTk&payment_intent_client_secret=pi_3LZwW4LBSfg1TvQg0nQQxGTk_secret_w6s21LXoAsG4gS3POMPjQjgz4&redirect_status=succeeded

const httpPrefix = process.env.NEXT_PUBLIC_LOCAL_TESTY ? "http" : "https";


const CheckoutForm = (props) => {
  const { priceId, customerId, baseHost } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const return_url = `${httpPrefix}://${baseHost}/payment-confirmation?priceId=${priceId}&customerId=${customerId}`;
    console.log("RETURN URL: ", return_url);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url,
      },
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setError(true);
      setErrorMessage(result.error.message);
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setError(false);
      if (result && result.status === 'succeeded') {
        console.log("DOING STUFF AFTER PAYMENT SUCCESS");

      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <Box sx={{ border: 1, m: 2, p: 2 }}><Typography color="error"
        variant="p">{errorMessage} Please check and try again.</Typography></Box>}
      <Button disabled={!stripe}
        type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 2, px: 5 }}>Complete Payment</Button>
    </form>
  )
};



const Checkout = ({ data }) => {
  const { priceId, prices, publishableKey, product, baseHost } = data;
  // const router = useRouter();

  // const priceId = router.query.priceId;

  const stripePromise = loadStripe(publishableKey);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { user, update_user } = useAuth();
  // const [prices, setPrices] = useState([]);
  // const [product, setProduct] = useState(null);
  const [ready, setReady] = useState(false);
  const [customerId, setCustomerId] = useState(null);


  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  useEffect(() => {
    if (priceId) {
      const createCustomer = async (user) => {
        let stripeCustomerId = 0;
        if (!user.stripeCustomerId) {
          let authUser = {};
          const email = user.email;
          const name = user.name;
          const description = user.id;
          await Auth.currentAuthenticatedUser().then(async user => {
            authUser = user;
            const customer = await stripeCreateCustomer(
              { email, name, description }
            ).then(async (response) => {
              stripeCustomerId = response.customer.id;
              await Auth.updateUserAttributes(user, {
                'custom:stripeCustomerId': stripeCustomerId
              }).catch(err => console.log("didn't update cognito", err));
            }).catch(error => {
              console.log(error);
            });
          }).catch(err => { console.log(err) });
          authUser.attributes['custom:stripeCustomerId'] = stripeCustomerId;
          update_user(authUser);
        } else {
          stripeCustomerId = user.stripeCustomerId;
        }
        console.log("stripeCustomerId", stripeCustomerId);
        return stripeCustomerId;
      };

      const getClientSecret = async (priceId) => {
        try {
          const response = await createSubscription(priceId);
          console.log("sub data", response)
          setSubscriptionData(response);
        } catch (error) {
          console.log(error);
        }
      };

      const createSubscription = async (priceId) => {
        console.log("createSubscription priceId", priceId);
        const customerId = await createCustomer(user);
        setCustomerId(customerId);
        const body = {
          priceId,
          customerId
        };
        return await stripeCreateSubscription(body);
      };

      if (user) {
        getClientSecret(priceId);
      }
      // setProduct(prices.find(price => price.id === priceId));

    }
    setReady(true);
  }, [user, priceId]);



  // if (prices) {
  //   console.log("prices", prices);
  //   setProduct(prices.find(price => price.id === priceId));
  // }
  // const fetchSecret = useCallback((priceId) => {
  //   if (priceId) {
  //     if (user) {
  //       getClientSecret(priceId);
  //     }
  //   }
  // }, [user]);
  // const fetchSecret = (priceId) => {
  //   if (priceId) {
  //     if (user) {
  //       getClientSecret(priceId);
  //     }
  //   }
  // };

  // useEffect(() => {

  // const getClientSecret = async (priceId) => {
  //   try {
  //     const response = await createSubscription(priceId);
  //     // console.log("sub data", response)
  //     setSubscriptionData(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   if (priceId) {
  //     if (user) {
  //       getClientSecret(priceId);
  //     }
  //   }
  // }, [createSubscription, priceId, user]);


  return (
    <>
      <Head>
        <title>
          Checkout | Advocat
        </title>
        {/* <script src="https://js.stripe.com/v3/"
async></script> */}
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
            Checkout
          </Typography>
          {ready && (
            <>
              {!priceId && (
                <PricingTable />
              )}

              {subscriptionData && (
                <Grid container
                  spacing={3}>
                  <Grid item
                    xs={12}
                    md={6}>
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
                      Payment details
                    </Typography>
                    <Elements stripe={stripePromise}
                      options={{ clientSecret: subscriptionData.clientSecret }}>

                      <CheckoutForm baseHost={baseHost} priceId={priceId}
                        customerId={customerId} />

                    </Elements>
                  </Grid>
                </Grid>
              )}

            </>)}
        </Container>
      </Box>
    </>
  );
};




export const getServerSideProps = async (context) => {
  let { priceId } = context.query;
  const baseHost = context.req.headers.host;

  const { prices, publishableKey } = await stripeGetPrices();
  // console.log("context", context);
  let product = null;
  if (priceId) {
    product = prices.find(price => price.id === priceId);
  } else {
    priceId = null;
  }

  const data = { priceId, prices, publishableKey, product, baseHost };
  // Pass data to the page via props
  return { props: { data } }
}


Checkout.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>
      {page}
    </MainLayout>
  </AuthGuard>
);

export default Checkout;
