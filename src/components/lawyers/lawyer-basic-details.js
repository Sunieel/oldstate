import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

export const LawyerBasicDetails = (props) => {
  const { name, site, type, subtypes, category, phone, full_address, rating, logo, working_hours, ...other  } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Name"
          value={name}
        />
        <PropertyListItem
          align={align}
          divider
          label="Site"
          value={site}
        />
        <PropertyListItem
          align={align}
          divider
          label="Type"
          value={type}
        />
        <PropertyListItem
          align={align}
          divider
          label="Sub Types"
          value={subtypes}
        />
        <PropertyListItem
          align={align}
          divider
          label="Category"
          value={category}
        />
        <PropertyListItem
          align={align}
          divider
          label="Phone"
          value={phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="Address"
          value={full_address}
        />
        <PropertyListItem
          align={align}
          divider
          label="Rating"
          value={rating}
        />
        <PropertyListItem
          align={align}
          divider
          label="Working Hours"
          value={working_hours}
        />
      </PropertyList>
      {/* <CardActions
        sx={{
          flexWrap: 'wrap',
          px: 3,
          py: 2,
          m: -1
        }}
      >
        <Button
          sx={{ m: 1 }}
          variant="outlined"
        >
          Reset &amp; Send Password
        </Button>
        <Button sx={{ m: 1 }}>
          Login as Customer
        </Button>
      </CardActions> */}
    </Card>
  );
};

LawyerBasicDetails.propTypes = {
  // address1: PropTypes.string,
  // address2: PropTypes.string,
  // country: PropTypes.string,
  // email: PropTypes.string.isRequired,
  // isVerified: PropTypes.bool.isRequired,
  // phone: PropTypes.string,
  // state: PropTypes.string
};
