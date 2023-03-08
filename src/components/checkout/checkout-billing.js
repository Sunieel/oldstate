import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

const paymentMethods = [
  {
    label: 'Visa Credit/Debit Card',
    value: 'visa'
  },
  {
    label: 'PayPal',
    value: 'paypal'
  }
];

export const CheckoutBilling = (props) => {
  const { billing, onChange, ...other } = props;

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >

        <Typography
          sx={{ ml: 2 }}
          variant="h6"
        >
          Billing Address
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              onChange={onChange}
              value={billing.firstName}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={onChange}
              value={billing.lastName}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Street Address"
              name="address"
              onChange={onChange}
              value={billing.address}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Street Line 2 (optional)"
              name="optionalAddress"
              onChange={onChange}
              value={billing.optionalAddress}
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="State"
              name="state"
              onChange={onChange}
              value={billing.state}
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="Postcode"
              name="zip"
              onChange={onChange}
              value={billing.zip}
            />
          </Grid>
        </Grid>
      </Box>



    </div>
  );
};

CheckoutBilling.propTypes = {
    billing: PropTypes.object,
  onChange: PropTypes.func
};
