import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { AccountBillingSettings } from '../../components/dashboard/account/account-billing-settings';
import { AccountGeneralSettings } from '../../components/dashboard/account/account-general-settings';
import { AccountNotificationsSettings } from '../../components/dashboard/account/account-notifications-settings';
import { AccountTeamSettings } from '../../components/dashboard/account/account-team-settings';
import { AccountSecuritySettings } from '../../components/dashboard/account/account-security-settings';
import { gtm } from '../../lib/gtm';

const Account = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  return (
    <>
      <Head>
        <title>
          Dashboard: Account | Advocat
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4">
            Account
          </Typography>
          <AccountGeneralSettings />
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Account;
