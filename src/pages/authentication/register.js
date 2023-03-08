import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { AuthBanner } from '../../components/authentication/auth-banner';
import { AmplifyRegister } from '../../components/authentication/amplify-register';
import { Auth0Register } from '../../components/authentication/auth0-register';
import { FirebaseRegister } from '../../components/authentication/firebase-register';
import { JWTRegister } from '../../components/authentication/jwt-register';
import { Logo } from '../../components/logo';
import { useAuth } from '../../hooks/use-auth';
import { gtm } from '../../lib/gtm';

const Register = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <> 
      <Head>
        <title>
          Register | Advocat
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        {/* <AuthBanner /> */}
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          


          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <Link>
                  <Logo
                  variant="light"
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </Link>
              </NextLink>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Register as a lawyer to claim and manage your listing.

                </Typography>
                    <br />
                <Box
            sx={{
              alignItems: 'center',
              backgroundColor: (theme) => theme.palette.mode === 'dark'
                ? 'neutral.900'
                : 'neutral.100',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mb: 4,
              p: 2,
              '& > img': {
                height: 32,
                width: 'auto',
                flexGrow: 0,
                flexShrink: 0
              }
            }}
          >
            <Typography
              color="textSecondary"
              variant="caption"
            >
              <small style={{fontSize: "small"}}>
        Please note the supplied email domain must match the website domain of the listing being claimed.
        <br />E.g. if you are claiming a listing with a website domain of lawyer.com, you must supply an email address of [name]@lawyer.com
      </small>
            </Typography>
            {/* <img
              alt="Auth platform"
              src={platformIcons[platform]}
            /> */}
          </Box>
                
                {/* <NextLink href="#" >
                <Link
                  color="textSecondary"
                  variant="body2"
                >
                  My email domain does not match my websites domain
                </Link>
              </NextLink> */}
              
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
              <AmplifyRegister />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={disableGuard
                  ? `/authentication/login?disableGuard=${disableGuard}`
                  : '/authentication/login'}
                passHref
              >
                <Link
                  color="textSecondary"
                  variant="body2"
                >
                  I have an account
                </Link>
              </NextLink>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default Register;
