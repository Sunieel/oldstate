import { Box, Divider, Typography } from '@mui/material';
import { SeverityPill } from '../../severity-pill';
import numeral from 'numeral';
import { format } from 'date-fns/';

const labelColors = {
    active: 'success',
    // pending: 'warning',
    // rejected: 'error'
  };

export const AccountSubscription = ({ subscription }) => {
    const amount = subscription.plan.amount / 100;
    const status = subscription.status;
    const interval = subscription.plan.interval;
  
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
  
          <Box>
            <SeverityPill color={labelColors[status]}>
              {status}
            </SeverityPill>
          </Box>
          {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
        </Box>
        <Box>
          <Typography variant="overline">Next payment: {format(new Date(subscription.current_period_end * 1000), "LLLL dd, yyyy")}</Typography>
  
        </Box>
        <Divider />
      </Box>
    )
  }