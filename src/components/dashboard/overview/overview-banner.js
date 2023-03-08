import PropTypes from 'prop-types';
import { Box, Button, Card, Chip, Typography } from '@mui/material';
import NextLink from 'next/link';

export const OverviewBanner = (props) => {
  const { onDismiss, ...other } = props;

  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        p: 4
      }}
      {...other}>
      <Box
        sx={{
          mr: 4,
          width: 200,
          height: 200,
          '& img': {
            height: 200,
            width: 'auto'
          }
        }}
      >
        <img
          alt=""
          src="/avstatic/Advocat_symbol_light.png"
        />
      </Box>
      <div>
        <Typography
          color="inherit"
          sx={{ mt: 2 }}
          variant="h4"
        >
          Welcome to Advocat!
        </Typography>
        <Typography
          color="inherit"
          sx={{ mt: 1 }}
          variant="subtitle2"
        >
          You can manage your account and profiles here.
        </Typography>

        <NextLink
            href="/lawyers/new"
          >
            <Button
              color="secondary"
              sx={{
                mt: 2
              }}
              variant="contained"
            >
              Create new profile
            </Button>
          </NextLink>

        {/* <Box sx={{ mt: 2 }}>
          <Button
            color="secondary"
            onClick={onDismiss}
            variant="contained"
          >
            Dismiss Banner
          </Button>
        </Box> */}
      </div>
    </Card>
  );
};

OverviewBanner.propTypes = {
  onDismiss: PropTypes.func
};
