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
            <div sx={{mt: 20 }}>
              <Box sx={{px:3}}>
              <Typography  variant="h2"
color="text.light">
Buying or selling
a house &amp;
property law
              </Typography>
              <Typography 
                color="text.light"
                sx={{ my: 6 }}
                variant="subtitle1"
              >
Australian property law is the system of laws
regulating and prioritising the Property law rights,
interests and responsibilities of individuals in relation
to &quot;things&quot; including houses, investment properties,
apartments, flats, off-the-plan purchases, working
with developers on land subdivisions and development
sites, retail shops, and other commercial property.
              </Typography>
              <NextLink
                href={"/?category="+encodeURIComponent("Buying or selling a house & property law")+"#find-a-lawyer"}
                passHref
              >
                <Button
                  size="large"
                  component="a"
                  variant="contained"
                  color="secondary"
                  sx={{textTransform: 'uppercase'}}
                >
                  SEARCH PROPERTY LAWYERS
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
              pr:0,
              mt: -5,
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
                alt="Property law"
                src={`/avstatic/property-law.png`}
                layout='responsive'
                width={900}
                height={991}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
