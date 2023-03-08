import NextLink from 'next/link';
import Image from 'next/image';
import NextImage from 'next/image';
import { Box, Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HomeDevelopers = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  });
  return (
    // <Box
    <Box
      sx={{
        backgroundColor: 'background.header',
        // pt: 15,
        // mt: 15,
        m:0, p:0
      }}

      {...props}>
      <Container maxWidth="lg">
        <Grid
          // alignItems="center"
          container
          // justifyContent="center"
          // spacing={3}
          sx={{m:0, p:0}}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              // order: {
              //   xs: 2,
              //   md: 1,
              // },
              // pb: 3,
              // pt: !isMobile ? 0 : 20
              // heigt: "100%",
              // justifyContent: "center"
              m:0, p:0, pt:15
            }}

          >
            {/* <div sx={{mt: 20 }}> */}
              {/* <Box sx={{px:3}}> */}
              <Typography  variant="h2"
color="text.light">
                Connecting your<br />
                business to more clients
              </Typography>
              <Typography
                color="text.light"
                sx={{ my: 6 }}
                variant="subtitle1"
              >
Advocat is designed to help clients find a law firm that meets their
needs quickly and efficiently. For firms that actively use Advocat it
becomes a referral engine, cutting through the noise of a crowded
marketplace where only a few large firms spend money on active
marketing online. Advocat is designed to showcase your services
and abilities and help more people find the right lawyer for them.
<br /><br />
Advocat can help you to drive more business and access a greater
range of clients. Claim your free listing today and upgrade to our
cost effective premium offering to make sure your firm stands out.
<br /><br /><br />
              </Typography>

              {/* <NextLink
                href="/authentication/register"
                passHref
              >
                <Button
                  size="large"
                  component="a"
                  variant="contained"
                  color="secondary"
                  sx={{textTransform: 'uppercase'}}
                >
                  Get started
                </Button>
              </NextLink>
              <br /><br /> */}
              {/* </Box> */}
            {/* </div> */}
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              order: {
                xs: 1,
                md: 2
              },
              // height: "100%",
              // pt: 10,
              // pr:0,
              display: 'flex',
              // pb: 0,
              // mb: 0,
              // justifyContent: {
              //   xs: "center",
              //   md: 'flex-end',
              // },
              // '& .MuiBox-root': {
              //   pb: -200, mb: -200
              // }
              mb:-0.5, p:0,
              // backgroundColor:"red",
              backgroundImage:'url(/avstatic/advocat_logo.svg)',
              backgroundSize: "374px 420px",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: {
                md: "bottom right",
                xs: "center"
              },

              height:{
                xs: "420px",
                md: "auto"
              },
              width:{
                xs: "100%"
              }

            }}

           // justifyContent="flex-end"
          >

            {/* <Box
              sx={{
                // maxWidth: '250px',
                pt: {
                  md: 15,
                  lg: 15,
                  xs: 0,
                },
                backgroundColor:"red",

                p:0,
                m: 0
                // height: "100%",
                // height: '100%',
              }}
              
            > */}
              {/* <Image
                alt="Advocat"
                src={`/avstatic/advocat_logo.svg`}
                layout='fixed'
                width={374}
                height={420}
                sx={{m:0, p:0, bottom: 0}}
              /> */}
            {/* </Box> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
