import { Box, Card, CardContent, Divider, Grid, Button, Typography } from '@mui/material';
import { Amplify, Auth, API } from 'aws-amplify';
import { useAuth } from '../../../hooks/use-auth';
import awsconfig from '../../../aws-exports';
import { SeverityPill } from '../../../components/severity-pill';
import { useState, useEffect } from 'react';
import numeral from 'numeral';
import { format } from 'date-fns/';
import { Link } from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

Amplify.configure(awsconfig);

const stripeGetSubscriptions = async (queryStringParameters) => {
  const apiName = 'advocatStripe';
  const path = '/subscriptions';
  return await API.get(apiName, path, { queryStringParameters });
};

const stripeCancelSubscriptions = async (body) => {
  const apiName = 'advocatStripe';
  const path = '/stripe-cancel-subscription';
  const params = { body };
  return await API.post(apiName, path, params);
}

const labelColors = {
  active: 'success',
  canceled: 'error',
  rejected: 'error',
  unpaid: 'error',
  trialing: 'success',
  ended: 'error',
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const AccountSubscription = ({ subscription }) => {
  const amount = subscription.plan.amount / 100;
  const status = subscription.status;
  const interval = subscription.plan.interval;
  // const id = subscription.plan.id;
  const router = useRouter();

  const [cancelClicked, setCancelClicked] = useState(false);

  const handleCancelClick = async (e) => {
    //TODO CONFIRMATION
    console.log(subscription.id);
    e.preventDefault();
    setCancelClicked(true);
    try {
      // test an error
      // await delay(3000);
      // throw(new Error("fake"));
      await stripeCancelSubscriptions({ subscriptionId: subscription.id });
      router.reload();
    } catch (e) {
      console.log(e);
      toast.error("Error canceling subscription, please check your connection and try again", { duration: 6000 })
    }
    setCancelClicked(false);
  };


  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        {/* <hr />
      <h4>
        <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
          {subscription.id}
        </a>
      </h4> */}

        <Box sx={{ mr: 3 }}>
          <Typography variant="span" sx={{ fontWeight: 'bold' }}>Premium Subscription</Typography> ${numeral(amount).format('0.00')} / {interval}

        </Box>

        <Box >
          <SeverityPill color={labelColors[status]}>
            {status}
          </SeverityPill>
        </Box>


        {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
      </Box>
      <Box>
        <Typography variant="overline">Next payment: {format(new Date(subscription.current_period_end * 1000), "LLLL dd, yyyy")}</Typography>
      </Box>
      <Box>
        {!['canceled', 'rejected', 'ended'].includes(subscription.status) &&
          <Button
            onClick={(e) => { handleCancelClick(e) }}
            disabled={cancelClicked}
          >cancel</Button>
        }
      </Box>
      <Divider />
    </Box>
  )
}


export const AccountSubscriptionSettings = () => {
  const { user, update_user } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);

  const [loadingActiveSubscriptions, setLoadingActiveSubscriptions] = useState(true);
  const [activeSubscriptionsError, setActiveSubscriptionsError] = useState([]);

  useEffect(() => {
    const fetchData = async (customerId) => {
      setSubscriptions([]);
      setLoadingActiveSubscriptions(true);
      setActiveSubscriptionsError(false);
      try {
        // test an error
        // await delay(3000);
        // throw(new Error("fake"));
        const sub = await stripeGetSubscriptions({ customerId: customerId, status: 'all' });
        setSubscriptions(sub.subscriptions.data);
      } catch (error) {
        console.error("Error getting active subscriptions", error);
        setActiveSubscriptionsError(true);
      } finally {
        setLoadingActiveSubscriptions(false);
      }
    }
    if (user.stripeCustomerId) fetchData(user.stripeCustomerId);
  }, [user]);




  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Subscriptions
        </Typography>
        <Box id="subscriptions">

          {loadingActiveSubscriptions && "loading..."}

          {!loadingActiveSubscriptions
            && activeSubscriptionsError
            && "Error loading active subscriptions, please check your connection and try again"}

          {(!loadingActiveSubscriptions
            && !activeSubscriptionsError
            && subscriptions.length == 0)
            && "You have no active subscriptions"}

          {(!loadingActiveSubscriptions
            && !activeSubscriptionsError
            && subscriptions.length > 0)
            && subscriptions.map(s => {
              // check if subscription status is in array
              if (['active', 'canceled', 'rejected', 'unpaid', 'trialing', 'ended'].includes(s.status)) {
                return (<AccountSubscription key={s.id}
                  subscription={s} />);
              }
            })}
        </Box>
      </CardContent>
    </Card>
  );
};