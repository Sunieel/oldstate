import propTypes from 'prop-types';
import { Box, Button, Divider, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check as CheckIcon } from '../../icons/check';
import { MinusOutlined as DashIcon } from '../../icons/minus-outlined'
import { X as XIcon } from '../../icons/x';
import Router from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Auth, API } from 'aws-amplify';
import RemoveIcon from '@mui/icons-material/Remove';

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

export const PricingPlan = (props) => {
  const { cta, currency, description, features, image, name, popular, price, sx, priceId, ...other } = props;
  // if callback successful click lionk to go to next page
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { user, update_user } = useAuth();
  const shocaseFeatures = ["Overview of your business",
    "Details of services",
    "Staff profiles",
    "Accreditations & awards",
    "Reviews",
    "Fee guide",
    "FAQs",
    "Contact details",
    "Optional badges for fixed fees, first free appointment and no win, no fee",];

  const createCustomer = async (user) => {
    let stripeCustomerId = 0;
    if (user.stripeCustomerId === null) {
      let authUser = {};
      const email = user.email;
      const name = user.name;
      const description = user.id;
      await Auth.currentAuthenticatedUser().then(async user => {
        authUser = user
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
    return stripeCustomerId;
  };

  const createSubscription = async (priceId) => {
    createCustomer(user).then(async customerId => {
      // console.log("CUSTOMER ID", customerId);
      await stripeCreateSubscription({
        priceId,
        customerId
      }).then(response => {
        setSubscriptionData(response);
      }).catch(err => console.log(err));
    }).catch(error => {
      console.log(error);
    });
  };

  if (subscriptionData) {
    Router.push({
      pathname: '/checkout',
      query: {
        subscriptionId: subscriptionData.subscriptionId,
        clientSecret: subscriptionData.clientSecret
      }
    });
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',

        ...sx
      }}
      {...other}>
      <Box sx={{
        p: 3, alignItems: 'center', display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography
          sx={{ my: 2, textTransform: 'uppercase' }}
          variant="h5"
        >
          {name}
        </Typography>
        <Box

        >
          <RemoveIcon color="secondary" />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Typography variant="h3"
            sx={{ fontWeight: 600 }}>
            {price !== "0" ? `${currency}${price}` : "Free"}
          </Typography>

          <Typography
            color="textSecondary"
            sx={{
              alignSelf: 'flex-end',
              ml: 1
            }}
            variant="h3"
          >
            {price === "0" ? "" : " /month"}
          </Typography>
        </Box>

        {/* <Typography
          color="textSecondary"
          sx={{ mt: 2, color: (description == " -") ? "white" : "inherit" }}
          variant="body2"
        >
          {description}
        </Typography> */}

      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3
        }}
      >

        <Divider />
        <br /><br />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            // mt: 6,
            m: "15px 0"
          }}
        >
          <Button
            fullWidth
            variant={'contained'}
            color={'secondary'}
            //onClick={() => createSubscription(priceId)}
            href={popular ? `/checkout?priceId=${priceId}` : '/authentication/register'}
          >
            {cta}
          </Button>
        </Box>
        <Typography
          sx={{ my: 2, textTransform: 'uppercase' }}
          variant="h6"
        >
          Features
        </Typography>
        <br />
        
        {features.map((feature) => (
            <Box
              key={feature.name}
              sx={{
                alignItems: 'center',
                display: 'flex',
                '& + &': {
                  mt: 2,
                }
              }}
            >
              {feature.available ? (
                <CheckIcon
                  fontSize="small"
                  color="secondary"
                //sx={{ color: 'text.primary' }}
                />
              ) : (
                <XIcon
                  fontSize="small"
                  sx={{ color: 'text.primary' }}
                />
              )}
              <Typography
                sx={{
                  fontWeight: 500,
                  ml: 2
                }}
                variant="body2"
              >
                {feature.name}
              </Typography>

            </Box>
        ))}
        <Box />
        <br />
        {name === "Premium" && (
          <>
          {/* <br />
                      <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6
              }}
            >
              
              <Button
                fullWidth
                variant={popular ? 'contained' : 'outlined'}
                color={popular ? 'secondary' : 'primary'}
                href={popular ? `/checkout?priceId=${priceId}` : '/authentication/register'}
              >
                UPGRADE YOUR LISTING
              </Button>
            </Box>
            <br /> */}
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{ my: 2, textTransform: 'uppercase' }}
                variant="h6"
              >
                Premium profile includes:
              </Typography>
            </Box>
            <Box>
              <List>
                {shocaseFeatures.map((feature, i) => (
                  <Box
                  key={feature}
                  sx={{
                    alignItems: 'top',
                    display: 'flex',
                    '& + &': {
                      mt: 2,
                    }
                  }}
                >
                    <DashIcon
                  fontSize="small"
                  color="secondary"
                  
                //sx={{ color: 'text.primary' }}
                />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      ml: 2
                    }}
                    variant="body2"
                  >
                    {feature}
                  </Typography>
    
                </Box>
                  // <ListItem
                  //   key={i}>
                  //   <ListItemIcon>
                  //     <RemoveIcon color="secondary" />
                  //   </ListItemIcon>
                  //   <ListItemText
                  //     primary={feature}
                  //   />
                  // </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

PricingPlan.propTypes = {
  cta: propTypes.string.isRequired,
  priceId: propTypes.string,
  currency: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  features: propTypes.array.isRequired,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  popular: propTypes.bool,
  price: propTypes.string.isRequired,
  sx: propTypes.object
};
