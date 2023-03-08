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
    <Box
      sx={{
        backgroundColor: 'background.header',
        // pt: 20,
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
              m:0, p:0, pt:20
            }}

          >
            {/* <div sx={{mt: 20 }}> */}
              <Box sx={{px:3}}>
              <Typography  variant="h1"
color="text.light" sx={{textAlign: {
  xs: "center",
  md: 'left',
},}}>
                Finding the <Typography variant="span"
sx={{color:"secondary.main"}}>right lawyer</Typography> for you.
              </Typography>
              <Typography
                color="text.light"
                sx={{ my: 6, textAlign: {
                  xs: "center",
                  md: 'left',
                }, }}
                variant="subtitle1"
                
              >
                Advocat matches you with the right lawyer for you
and your needs. Our mission is to supply access to legal
resources in a simple, transparent, and efficient way.
              </Typography>
              <Box sx={{
                width: "100%",

              textAlign: {
                xs: "center",
                md: 'left',
              },
            }}>
              <NextLink
                href="/#find-a-lawyer"
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
              <br /><br /><br /><br /><br /><br />
              </Box>
              </Box>
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
          {/* <Grid
            item
            md={6}
            xs={12}
            sx={{
              // order: {
              //   xs: 1,
              //   md: 2
              // },
              pt: 10,
              pr:0,
              display: 'flex',
              justifyContent: {
                xs: "center",
                md: 'flex-end',
              }
            }}

           // justifyContent="flex-end"
          >

            <Box
              sx={{
                // maxWidth: '250px',
                pt: 10,
                pr:0,
                pb:0,
                mb:0,
                // height: '100%',
              }}
              
            >
              <Image
                alt="Advocat"
                src={`/avstatic/advocat_logo.svg`}
                layout='fixed'
                width={374}
                height={420}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};
