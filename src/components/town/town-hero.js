import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const TownHero = (props) => {
  const { townName } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  });
  return (
    <Box
      sx={{
        backgroundColor: 'background.header',
        pt: 15, pb: 5
      }}

      {...props}>
      <Container maxWidth="lg">
        <Grid
          // alignItems="center"
          container
          // justifyContent="center"
          spacing={3}
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
            }}

          >
            <div sx={{ mt: 20 }}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h1"
                  color="text.light"
                  sx={{
                    textAlign: {
                      xs: "center",
                      md: 'left',
                    },
                  }}>
                  Finding the <Typography variant="span"
                    sx={{ color: "secondary.main" }}>right lawyer</Typography> in {townName}.
                </Typography>
                <Typography
                  color="text.light"
                  sx={{
                    my: 6, textAlign: {
                      xs: "center",
                      md: 'left',
                    },
                  }}
                  variant="subtitle1"

                >
                  Advocat matches you with the right lawyer for you
                  and your needs. Our mission is to supply access to legal
                  resources in a simple, transparent, and efficient way.
                </Typography>
                <Box sx={{
                  width: "100%",
                  pb: 5,

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
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Find a lawyer
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              // order: {
              //   xs: 1,
              //   md: 2
              // },
              pr: 0,
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
                pr: 0,
                pb: 0,
                mb: 0,
                // height: '100%',
              }}

            >
              <Image
                alt="Advocat"
                src={`/avstatic/home/need-a-lawyer.png`}
                layout='fixed'
                width={374}
                height={420}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
