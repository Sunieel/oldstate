import { useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Mail as MailIcon } from '../icons/mail';
import { gtm } from '../lib/gtm';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Contact = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Contact | Advocat
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: '#01023B',
            py: 8,
            color: "white"
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            {/* <NextLink
              href="/"
              passHref
            > */}
              <Button
                onClick={() => router.back()}
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
                sx={{color: "white"}}
              >
                Back
              </Button>
            {/* </NextLink> */}
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Contact
            </Typography>
            {/* <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  mr: 2
                }}
                variant="rounded"
              >
                <MailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline">
                Contact Advocat
              </Typography>
            </Box> */}
            <br /><br />
            <Typography variant="h1">
              Talk to one of our experts
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
              If you&apos;re considering creating a listing, or have any other questions, we&apos;re here to help you out.
            </Typography>
           
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm queryParams={router.query}/>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
