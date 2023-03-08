import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { OverviewCryptoWallet } from '../../components/dashboard/overview/overview-crypto-wallet';
import { OverviewInbox } from '../../components/dashboard/overview/overview-inbox';
import { OverviewLatestTransactions } from '../../components/dashboard/overview/overview-latest-transactions';
import { OverviewPrivateWallet } from '../../components/dashboard/overview/overview-private-wallet';
import { OverviewTotalBalance } from '../../components/dashboard/overview/overview-total-balance';
import { OverviewTotalTransactions } from '../../components/dashboard/overview/overview-total-transactions';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Briefcase as BriefcaseIcon } from '../../icons/briefcase';
import { Download as DownloadIcon } from '../../icons/download';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../icons/information-circle-outlined';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';

import { CreditCard as CreditCardIcon } from '../../icons/credit-card';
import { Home as HomeIcon } from '../../icons/home';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview | Advocat
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          {/* <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  G&apos;day
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: -1
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button>
                <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">
                    Last week
                  </MenuItem>
                  <MenuItem value="month">
                    Last month
                  </MenuItem>
                  <MenuItem value="year">
                    Last year
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box> */}
          <Grid
            container
            spacing={4}
          >
            {displayBanner && (
              <Grid
                item
                xs={12}
              >
                <OverviewBanner onDismiss={handleDismissBanner} />
              </Grid>
            )}

              

              {/* <Grid
              item
              
              xs={12}
            >
              <table style={{width: '100%'}} >
                <tr>
                  <td><Button>Help... I&apos;m getting divorced</Button></td>
                  <td><Button>Help... Someone died</Button></td>
                </tr>
                <tr>
                  <td><Button>Help... I&apos;ve been fired</Button></td>
                  <td><Button>I need help with commerce</Button></td>
                </tr>
              </table>
            </Grid> */}


            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewCryptoWallet />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <OverviewPrivateWallet />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewTotalTransactions />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <OverviewTotalBalance />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewLatestTransactions />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <OverviewInbox />
            </Grid>
            */}

{/* <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <HomeIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Listings
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    Manage Listings
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    View your claimed and unclaimed firm listings
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                <NextLink
                href="/dashboard/account">
                  <Button
                    endIcon={<HomeIcon fontSize="small" />}
                    size="small"
                    
                  >
                    My Listings
                  </Button>
                  </NextLink>
                </CardActions>
              </Card>
            </Grid> */}

            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <UserCircleIcon
                      color="primary"
                      fontSize="small"
                    />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Account
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2 }}
                  >
                    Manage Account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Manage your personal information, billing, and preferences
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                <NextLink
                href="/dashboard/account">
                  <Button
                    endIcon={<UserCircleIcon fontSize="small" />}
                    size="small"
                    
                  >
                    My Account
                  </Button>
                  </NextLink>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <CreditCardIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Pricing
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    Compare Plans
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Compare our plans and pricing. See the benefits of going premium
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                <NextLink
                href="/dashboard/pricing">
                  <Button
                    endIcon={<CreditCardIcon fontSize="small" />}
                    size="small"
                    
                  >
                    Compare Plans
                  </Button>
                  </NextLink>
                </CardActions>
              </Card>
            </Grid>
            
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <DownloadIcon color="primary" />
                    <Typography
                      color="primary.main"
                      sx={{ pl: 1 }}
                      variant="subtitle2"
                    >
                      Download
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h6"
                  >
                    Download our PDF and learn how to
                     use the system
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    endIcon={<DownloadIcon fontSize="small" />}
                    size="small"
                    variant="outlined"
                  >
                    Download Free PDF
                  </Button>
                </CardActions>
              </Card>
            </Grid>  */}
            
            
          
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Overview;
