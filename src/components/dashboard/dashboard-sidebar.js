import { useEffect, useMemo, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { Cash as CashIcon } from '../../icons/cash';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { ChartPie as ChartPieIcon } from '../../icons/chart-pie';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from '../../icons/clipboard-list';
import { CreditCard as CreditCardIcon } from '../../icons/credit-card';
import { Home as HomeIcon } from '../../icons/home';
import { LockClosed as LockClosedIcon } from '../../icons/lock-closed';
import { Mail as MailIcon } from '../../icons/mail';
import { MailOpen as MailOpenIcon } from '../../icons/mail-open';
import { Newspaper as NewspaperIcon } from '../../icons/newspaper';
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { Selector as SelectorIcon } from '../../icons/selector';
import { Share as ShareIcon } from '../../icons/share';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { Truck as TruckIcon } from '../../icons/truck';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { ViewList as ListIcon } from '../../icons/view-list';

import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from './organization-popover';

import { useAuth } from '../../hooks/use-auth';

const getSections = (t) => [
  {
    title: t('General'),
    items: [
      {
        title: t('Home'),
        // path: '/dashboard',
        path: '/dashboard',
        icon: <HomeIcon fontSize="small" />
      },
      {
        title: t('Profiles'),
        // path: '/dashboard',
        path: '/dashboard/profiles',
        icon: <ListIcon fontSize="small" />
      },
      // {
      //   title: t('Analytics'),
      //   path: '/dashboard/analytics',
      //   path: '#',
      //   icon: <ChartBarIcon fontSize="small" />
      // },
      // {
      //   title: t('Finance'),
      //   path: '/dashboard/finance',
      //   path: '#',
      //   icon: <ChartPieIcon fontSize="small" />
      // },
      // {
      //   title: t('Logistics'),
      //   path: '/dashboard/logistics',
      //   path: '#',

      //   icon: <TruckIcon fontSize="small" />,
      //   chip: <Chip
      //     color="secondary"
      //     label={(
      //       <Typography
      //         sx={{
      //           fontSize: '10px',
      //           fontWeight: '600'
      //         }}
      //       >
      //         NEW
      //       </Typography>
      //     )}
      //     size="small"
      //   />
      // },
      {
        title: t('Account'),
        path: '/dashboard/account',

        icon: <UserCircleIcon fontSize="small" />
      },
      {
        title: t('Pricing'),
        path: '/dashboard/pricing',
        icon: <CreditCardIcon fontSize="small" />
      },
      // {
      //   title: t('Checkout'),
      //   path: '/checkout',
      //   icon: <CashIcon fontSize="small" />
      // },
      // {
      //   title: t('Contact'),
      //   path: '/contact',
      //   icon: <MailOpenIcon fontSize="small" />
      // },

      // {
      //   title: t('Logout'),
      //   path: '/authentication/logout',
      //   // icon: <MailOpenIcon fontSize="small" />
      // },
    ]
  },
  // {
  //   title: t('Management'),
  //   items: [
  //     {
  //       title: t('Clients'),
  //       path: '/dashboard/customers',
  //       path: '#',

  //       icon: <UsersIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('List'),
  //           path: '/dashboard/customers',
  //           path: '#',

  //         },
  //         {
  //           title: t('Details'),
  //           path: '/dashboard/customers/1',
  //           path: '#',

  //         },
  //         {
  //           title: t('Edit'),
  //           path: '/dashboard/customers/1/edit',
  //           path: '#',

  //         }
  //       ]
  //     },
  //     // {
  //     //   title: t('Products'),
  //     //   path: '/dashboard/products',
  //     //   path: '#',

  //     //   icon: <ShoppingBagIcon fontSize="small" />,
  //     //   children: [
  //     //     {
  //     //       title: t('List'),
  //     //       path: '/dashboard/products'
  //     //     },
  //     //     {
  //     //       title: t('Create'),
  //     //       path: '/dashboard/products/new'
  //     //     }
  //     //   ]
  //     // },
  //     {
  //       title: t('Quotes'),
  //       icon: <ShoppingCartIcon fontSize="small" />,
  //       path: '/dashboard/orders',
  //       path: '#',

  //       children: [
  //         {
  //           title: t('List'),
  //           path: '/dashboard/orders',
  //           path: '#',

  //         },
  //         {
  //           title: t('Details'),
  //           path: '/dashboard/orders/1',
  //           path: '#',

  //         }
  //       ]
  //     },
  //     {
  //       title: t('Invoices'),
  //       path: '/dashboard/invoices',
  //       icon: <ReceiptTaxIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('List'),
  //           path: '/dashboard/invoices',
  //           path: '#',

  //         },
  //         {
  //           title: t('Details'),
  //           path: '/dashboard/invoices/1',
  //           path: '#',

  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: t('Platforms'),
  //   items: [
  //     {
  //       title: t('Job Listings'),
  //       path: '/dashboard/jobs',
  //       icon: <OfficeBuildingIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Browse'),
  //           path: '/dashboard/jobs'
  //         },
  //         {
  //           title: t('Details'),
  //           path: '/dashboard/jobs/companies/1'
  //         },
  //         {
  //           title: t('Create'),
  //           path: '/dashboard/jobs/new'
  //         }
  //       ]
  //     },
  //     {
  //       title: t('Social Media'),
  //       path: '/dashboard/social',
  //       icon: <ShareIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Profile'),
  //           path: '/dashboard/social/profile'
  //         },
  //         {
  //           title: t('Feed'),
  //           path: '/dashboard/social/feed'
  //         }
  //       ]
  //     },
  //     {
  //       title: t('Blog'),
  //       path: '/blog',
  //       icon: <NewspaperIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t('Post List'),
  //           path: '/blog'
  //         },
  //         {
  //           title: t('Post Details'),
  //           path: '/blog/1'
  //         },
  //         {
  //           title: t('Post Create'),
  //           path: '/blog/new'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: t('Apps'),
  //   items: [
  //     {
  //       title: t('Kanban'),
  //       path: '/dashboard/kanban',
  //       icon: <ClipboardListIcon fontSize="small" />
  //     },
  //     {
  //       title: t('Mail'),
  //       path: '/dashboard/mail',
  //       icon: <MailIcon fontSize="small" />
  //     },
  //     {
  //       title: t('Chat'),
  //       path: '/dashboard/chat',
  //       icon: <ChatAlt2Icon fontSize="small" />
  //     },
  //     {
  //       title: t('Calendar'),
  //       path: '/dashboard/calendar',
  //       icon: <CalendarIcon fontSize="small" />
  //     }
  //   ]
  // },
  // {
  //   title: t('Pages'),
  //   items: [
  //     // {
  //     //   title: t('Auth'),
  //     //   path: '/authentication',
  //     //   icon: <LockClosedIcon fontSize="small" />,
  //     //   children: [
  //     //     {
  //     //       title: t('Register'),
  //     //       path: '/authentication/register?disableGuard=true'
  //     //     },
  //     //     {
  //     //       title: t('Login'),
  //     //       path: '/authentication/login?disableGuard=true'
  //     //     }
  //     //   ]
  //     // },
  //     {
  //       title: t('Pricing'),
  //       path: '/dashboard/pricing',
  //       icon: <CreditCardIcon fontSize="small" />
  //     },
  //     {
  //       title: t('Checkout'),
  //       path: '/checkout',
  //       icon: <CashIcon fontSize="small" />
  //     },
  //     {
  //       title: t('Contact'),
  //       path: '/contact',
  //       icon: <MailOpenIcon fontSize="small" />
  //     },
  //     // {
  //     //   title: t('Error'),
  //     //   path: '/error',
  //     //   icon: <XCircleIcon fontSize="small" />,
  //     //   children: [
  //     //     {
  //     //       title: '401',
  //     //       path: '/401'
  //     //     },
  //     //     {
  //     //       title: '404',
  //     //       path: '/404'
  //     //     },
  //     //     {
  //     //       title: '500',
  //     //       path: '/500'
  //     //     }
  //     //   ]
  //     // }
  //   ]
  // }
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();

  // this is how to query and do
  // things on screen size
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
  //   noSsr: true
  // });
  // const lgUp = true;

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'), {
    noSsr: true
  });


  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push('/').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  const [tier, setTier] = useState("Basic");
  // const [isAdmin, setIsAdmin ] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.admin) {
        setTier("Admin");
      } else if (user.subscriptionPlan && user.subscriptionPlan === "Premium") {
        setTier("Premium");
      }
    }

  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]);

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              {tier === "Basic" && <NextLink
                href="/dashboard/pricing"
              >
                <Box
                  // onClick={handleOpenOrganizationsPopover}
                  // ref={organizationsRef}
                  sx={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                    py: '11px',
                    borderRadius: 1
                  }}
                >
                  <div>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                    >
                      Upgrade to Premium
                    </Typography>
                    <Typography
                      color="neutral.400"
                      variant="body2"
                    >
                      {t('Your tier')}
                      {' '}
                      : {tier}
                    </Typography>
                  </div>
                  {/* <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14
                  }}
                /> */}
                </Box>
              </NextLink>}
              {tier !== "Basic" && <Box
                // onClick={handleOpenOrganizationsPopover}
                // ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {t('Your tier')}
                  {' '}
                  : {tier}
                </Typography>
                <Image
                  sx={{ float: "right" }}
                  align="right"
                  width="30px"
                  height="30px"
                  src="/avstatic/member-badge.png" />
              </Box>}
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            {/* <Typography
              color="neutral.100"
              variant="subtitle2"
            >
              {t('Need Help?')}
            </Typography> */}

            {/* <NextLink
              href="#"
              passHref
            > */}


            {/* {JSON.stringify(user)} */}
            <NextLink
                href="/contact?support=true"
                passHref
              >
            <Button
              // href='/contact'
              // target="_blank"
              // herf="/contact"
              // href={`mailto:support@youradvocat.com.au?subject=[${user ? user.id : "unknown"}] - Support Request`}
              color="neutral.500"
              variant="body2"
            >
              {t('Need Help? Contact Us')}
            </Button>
</NextLink>


            {/* <DashboardSidebarSection
                key={t('Contact')}
                path={'/contact'}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                title={t('Contact')}
                icon={<MailOpenIcon fontSize="small" />}
                /> */}



            {/* </NextLink> */}

            {/* <NextLink
              href="#"
              passHref
            > */}
            <Button
              onClick={handleLogout}
              color="secondary"
              component="a"
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              {t('Logout')}
            </Button>
            {/* </NextLink> */}
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (mdUp) {
    return (
      <Drawer
        anchor="right"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#01023B',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#01023B',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
