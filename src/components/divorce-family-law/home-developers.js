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
                  Divorce and
                  family law
                </Typography>
                <Typography
                  color="text.light"
                  sx={{ my: 6 }}
                  variant="subtitle1"
                >
                  Divorce and family law covers all aspects of law that
                  relates to families. It encompasses all children’s
                  matters and separation of assets for de facto and
                  divorcing couples. Most family lawyers will also handle
                  intervention orders and wills and estate matters as
                  they are all intertwined with family law matters.
                </Typography>
                <NextLink
                  href={"/?category="+encodeURIComponent("Divorce & family law")+"#find-a-lawyer"}
                  passHref
                >
                  <Button
                    size="large"
                    component="a"
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'uppercase' }}
                  >
                    Search family lawyers
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
              mt: -10,
              pt: 5,
              pr: 0,
              // display: 'flex',
              // justifyContent: 'flex-end',
              // justifyContent: 'center'
            }}

          // justifyContent="flex-end"
          >

            <Box
              sx={{
                // maxWidth: '250px',
                p: 3,

                // justifyContent: 'center'
                // height: '100%',
              }}

            >
              <Image
                priority
                alt="Divorce and family law"
                src={`/avstatic/family-law.png`}
                layout='responsive'
                width={900}
                height={991}
              // width={800}
              // height={967}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
