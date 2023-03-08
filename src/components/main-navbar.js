import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '../icons/menu';
import { Logo } from './logo';
import { useAuth } from '../hooks/use-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;
  const { user } = useAuth();
  const router = useRouter();


  //  Should we redirect to current page?
  // If dashboard shows owned listings, then makes sense to redirect to dashboard
  //  const loginUrl = '/authentication/login?returnUrl='+useRouter().asPath; 
  const loginUrl = '/authentication/login?returnUrl=/dashboard';

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.header',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'text.light',
        py: '1rem',
        // position: 'sticky',
        // top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: 64 }}
        >
          <NextLink
            href="/"
            passHref
          >
            <Link>
              <Logo
                sx={{
                  display: {
                    md: 'inline',
                    xs: 'none'
                  },
                  height: 50
                }}
              />
            </Link>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                md: 'flex',
                xs: 'none'
              }
            }}
          >
            <NextLink
              href="/#find-a-lawyer"
              passHref
            >
              <Link
                color="text.light"
                // underline="none"
                // variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  textDecoration: router.asPath === "/lawyers" ? "underline" : "inherit",
                  color: router.asPath === "/lawyers" ? "#FF5403" : "white",
                  fontSize:"0.9em"
                }}
              >
                Find a Lawyer
              </Link>
            </NextLink>
            <NextLink
              href="/for-lawyers"
              passHref
            >
              <Link
                color="text.light"
                sx={{
                  ml: 2, textTransform: 'uppercase',
                  textDecoration: router.asPath === "/for-lawyers" ? "underline" : "inherit",
                  color: router.asPath === "/for-lawyers" ? "#FF5403" : "white",
                  fontSize:"0.9em"
                }}
              // underline="none"
              // variant="subtitle2"
              >
                FOR LAWYERS &amp; FIRMS
              </Link>
            </NextLink>

            {!user && (
              <NextLink
                href="/authentication/login?returnUrl=/dashboard"
                passHref
              >               
              <Link
                color="text.light"
                sx={{
                  ml: 2, textTransform: 'uppercase',
                  color: "white",
                  fontSize:"0.9em"
                }}
              // underline="none"
              // variant="subtitle2"
              >
                  LAWYER LOGIN
                </Link>
              </NextLink>
            )}

            <NextLink
              href="/about"
              passHref
            >
              <Link
                color="text.light"
                sx={{
                  ml: 2, textTransform: 'uppercase',
                  textDecoration: router.asPath === "/about" ? "underline" : "inherit",
                  color: router.asPath === "/about" ? "#FF5403" : "white",
                  fontSize:"0.9em"
                }}
              // underline="none"
              // variant="subtitle2"
              >
                About Us
              </Link>
            </NextLink>
            {/* <NextLink
              href="/dashboard/"
              passHref
            >
              <Link
                color="text.light"
                component="a"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Dashboard (Admin)
              </Link>
            </NextLink> */}
            {/* <AccountButton /> */}


            {user ?
              <Button
                href="/dashboard/"
                // passHref
                // component="a"
                size="small"
                variant="contained"
                color="secondary"
                sx={{ ml: 2, textTransform: 'uppercase', borderRadius: '20px' }}
              >
                My Account
              </Button> : <><Button
                href="/#find-a-lawyer"
                // passHref
                // component="a"
                size="small"
                variant="contained"
                color="secondary"
                sx={{ ml: 2, textTransform: 'uppercase', borderRadius: '20px' }}
              >
                Get started
              </Button>

                {/* <NextLink
                  href={loginUrl}
                  passHref
                >
                  <Link
                    color="text.light"
                    sx={{
                      ml: 2,
                      fontSize: "small"
                    }}
                  // underline="none"
                  // variant="subtitle2"
                  >
                    Sign in
                  </Link>
                </NextLink> */}

              </>
            }

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
