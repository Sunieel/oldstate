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
Personal injury,
compensation &amp;
employment law
              </Typography>
              
              <Typography 
                color="text.light"
                sx={{ my: 6 }}
                variant="subtitle1"
              >
Personal injury in legal terms is a general physical
and/or psychological damages to an individual that
are the fault of another responsible party, be it the
driver of another car, an individual, of the owner or
manager of a public space. This part of Advocat also
covers employment law.
              </Typography>
              <NextLink
                href={"/?category="+encodeURIComponent("Personal injury & employment law")+"#find-a-lawyer"}
                passHref
              >
                <Button
                  size="large"
                  component="a"
                  variant="contained"
                  color="secondary"
                  sx={{textTransform: 'uppercase'}}
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
              pr:0,
              mt: -6,
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
                src={`/avstatic/injury-compensation-lawyer.png`}
                layout='responsive'
                width={900}
                height={992}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
