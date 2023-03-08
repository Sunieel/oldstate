import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Badge, Card, CardContent, Box, Container, Divider, Grid, Switch, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { PricingPlan } from '../../components/pricing/pricing-plan';
import { gtm } from '../../lib/gtm';
import { useAuth } from '../../hooks/use-auth';
import awsconfig from '../../aws-exports';
import { AccountSubscription } from '../../components/dashboard/account/account-subscription';
import Link from 'next/link';
import { Image } from 'next/image';
import { API, Amplify } from 'aws-amplify';

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

const Pricing = () => {
  const theme = useTheme();
  const [prices, setPrices] = useState([]);
  const { user } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     const { prices } = await fetch('/api/stripe//config').then(r => r.json());
  //     setPrices(prices);
  //     console.log(prices);
  //   };
  //   fetchPrices();
  // }, [])

  useEffect(() => {
    const fetchPrices = async () => {
      await stripeGetPrices().then(data => {
        console.log(data);
        setPrices(data.prices);

      }).catch(err => console.log(err));
      //const { prices } = await fetch('/api/stripe//config').then(r => r.json());
    };
    fetchPrices();
  }, []);

  // const [loadingActiveSubscriptions, setLoadingActiveSubscriptions] = useState(true);
  // const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  // const [activeSubscriptionsError, setActiveSubscriptionsError] = useState([]);


  // useEffect(async () => {
  //   const fetchData = async () => {
  //     setLoadingActiveSubscriptions(true);
  //     setActiveSubscriptionsError(false);
  //     try {
  //       const sub = await stripeGetSubscriptions({ customerId: user.stripeCustomerId, status: 'active' });
  //       setActiveSubscriptions(sub.subscriptions.data);
  //     } catch (error) {
  //       console.error("Error getting active subscriptions", error);
  //       setActiveSubscriptionsError(true);
  //     } finally {
  //       setLoadingActiveSubscriptions(false);
  //     }
  //   }
  //   if (user && user.stripeCustomerId) fetchData();
  // }, [user]);

  return (
    <>
      <Head>
        <title>
          Pricing | Advocat
        </title>
      </Head>
      <Box sx={{
        '& .MuiBox-root': {
          paddingTop: 0
        }, paddingTop: 0
      }}>

        <Box
          component="main"
          sx={{
            backgroundColor: '#F2F1EF',
            flexGrow: 1,
            pb: 6,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'background.default',
              py: 6,
            }}
          >
            <Container maxWidth="lg" >
              <Grid
                container
                alignItems="center"
                // spacing={2}
                flexWrap="nowrap"
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                  sx={{
                    mr: "20px"
                  }}
                >

                  <Typography variant="h3">
                    Upgrade to Premium to showcase your firm
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ my: 2 }}
                    variant="body1"
                  >
                    Compare our plans below and see the benefits of becoming a Premium member.
                  </Typography>



                  {/* <Switch />
                <Badge
                  badgeContent="25% OFF"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      right: -38,
                      top: '25%'
                    }
                  }}
                > 
                  <Typography variant="body1">
                    Yearly Payment
                  </Typography>
                </Badge> */}
                </Grid>

                {/* <Grid
                  item
                  md={12}
                  xs={12}
                  lg={12}
                  sx={{width :"100%"}}
                >
                  <Box sx={{width :"100%"}}>
                  <Typography variant="h3">
                    Active Subscriptions
                  </Typography>
                </Box>

                </Grid> */}


                <Grid
                  item
                  md={6}
                  sx={{
                    display: {
                      md: 'block',
                      xs: 'none'
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 500,
                      maxWidth: 419,
                      position: 'relative',
                      '& img': {
                        height: 'auto',
                        position: 'absolute',
                        top: 0,
                        width: '100%'
                      }
                    }}
                  >
                    <img
                      alt="Pricing hero"
                      src={`/avstatic/for-lawyers-lawyer.png`}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
            {/* TODO realised subs are in account page */}
            {/* <Box sx={{ width: "100%" }}>
              <Typography variant="h3">
                Active Subscriptions
              </Typography>
              <Card>
                <CardContent>
                  {loadingActiveSubscriptions && "loading..."}

                  {!loadingActiveSubscriptions
                    && activeSubscriptionsError
                    && "Error loading active subscriptions, please check your connection and try again"}

                  {(!loadingActiveSubscriptions
                    && !activeSubscriptionsError
                    && activeSubscriptions.length == 0)
                    && "You have no active subscriptions, compare plans below"}
                  {(!loadingActiveSubscriptions
                    && !activeSubscriptionsError
                    && activeSubscriptions.length > 0)
                    &&
                    <Box id="subscriptions">
                      {activeSubscriptions.map(s => {
                        return <AccountSubscription key={s.id}
                          subscription={s} />
                      })}
                    </Box>}
                </CardContent>
              </Card>

            </Box> */}
          </Box>
          <Divider />




          <Container
            // maxWidth="lg"
            sx={{ pt: 4 }}
          >
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <PricingPlan
                  cta="JOIN NOW"
                  currency="$"
                  description=" -"
                  features={[
                    { name: 'Edit your existing profile', available: true },
                    { name: 'List your businesses services', available: true },
                    { name: 'Enhance your businesses SEO', available: true },
                    { name: 'Lead generation', available: true },
                    { name: 'Receive reviews', available: true },
                    // { name: 'Monthly reporting from Advocat', available: true },
                    // { name: 'Respond to reviews', available: false },
                    { name: 'Priority listing', available: false },
                    { name: 'Premium profile', available: false },
                  ]}
                  image="/avstatic/pricing/plan1.svg"
                  name="BASIC"
                  price="0"
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto',
                    borderRadius: '16px',
                  }}
                />
              </Grid>
              {prices.map(price => (

                <Grid
                  key={price.id}
                  item
                  md={6}
                  xs={12}
                >

                  <PricingPlan
                    cta={"JOIN NOW"}
                    currency="$"
                    description="14 day free trial. Cancel any time. "
                    features={[
                      { name: 'Edit your existing profile', available: true },
                      { name: 'List your businesses services', available: true },
                      { name: 'Enhance your businesses SEO', available: true },
                      { name: 'Lead generation', available: true },
                      { name: 'Receive reviews', available: true },
                      // { name: 'Monthly reporting from Advocat', available: true },
                      // { name: 'Respond to reviews', available: true },
                      { name: 'Priority listing', available: true },
                      { name: 'Premium profile', available: true },
                    ]}
                    image="/avstatic/pricing/plan2.svg"
                    name={price.product.name}
                    popular
                    price={(price.unit_amount / 100).toString()}
                    priceId={price.id}
                    sx={{
                      height: '100%',
                      maxWidth: 460,
                      mx: 'auto',

                      borderColor: 'secondary.main',
                      borderRadius: 1,
                      borderStyle: 'solid',
                      borderWidth: 2,
                      borderRadius: '16px',

                    }}
                  />
                </Grid>


              ))}

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

Pricing.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Pricing;
