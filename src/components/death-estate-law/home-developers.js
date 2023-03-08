import NextLink from 'next/link';
import Image from 'next/image';
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
        backgroundColor: '#3A657E',
        pt: 20,
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
            md={7}
            xs={12}
            sx={{
              // order: {
              //   xs: 2,
              //   md: 1,
              // },
              pb: 20,
              // pt: !isMobile ? 0 : 20
            }}

          >
            <div sx={{ mt: 20 }}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h2"
                  color="text.light">
                  Death &amp; estate law
                </Typography>
                <Typography
                  color="text.light"
                  sx={{ my: 6 }}
                  variant="subtitle1"
                >
                  Death and Estate Lawyers help you to deal with the
                  death of someone in your family, friend or wider
                  community. They can also help you prepare for the
                  event of your own death and help you feel secure
                  about the future of your loved ones including your
                  children. Advocat covers all Death and Estate Lawyers
                  in Australia so please tell us what you need and we will
                  find the right lawyer for you.
                </Typography>
                <NextLink
                  href={"/?category="+encodeURIComponent("Death & estate law")+"#find-a-lawyer"}
                  passHref
                >
                  <Button
                    size="large"
                    component="a"
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    Search lawyers
                  </Button>
                </NextLink>
              </Box>
            </div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
            sx={{
              // order: {
              //   xs: 1,
              //   md: 2
              // },
              pt: 10,
              pr: 0,
              mt: -8,
              // display: 'flex',
              // justifyContent: 'flex-end',
            }}

          // justifyContent="flex-end"
          >

            <Box
              sx={{
                // maxWidth: '250px',
                p: 3,


                // height: '100%',
              }}

            >
              <Image
              priority
                alt="Advocat"
                src={`/avstatic/estate-law.png`}
                layout='responsive'
                width={900}
                height={1004}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
