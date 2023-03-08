import { useEffect, useState } from 'react';
import {  Box, Container,  Grid, Typography } from '@mui/material';
import { PricingPlan } from '../pricing/pricing-plan';
import { gtm } from '../../lib/gtm';
import { Amplify, API } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const stripeGetPrices = async () => {
  const apiName = 'advocatStripe';
  const path = '/stripe-config';
  return await API.get(apiName, path);
};

export const PricingTable = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: '#F2F1EF',
          flexGrow: 1,
          pb: 6
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: 6, alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <br />
          <Typography
            align="center"
            variant="h3"
            sx={{ my: 5 }}
          >
            Select your membership
          </Typography>
          <br /><br />
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
              key="blahblah"
            >
              <PricingPlan
                cta="JOIN NOW"
                currency="$"
                description="-"
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
    </>
  );
};
