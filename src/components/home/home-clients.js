import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import Image from 'next/image';

export const HomeClients = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#3A657E',
        pt:16,
      }}
      {...props}>
      <Container maxWidth="lg">
        <Grid
          alignItems="center"
          container
          justifyContent="center"
          spacing={10}
        >
               <Grid
            item
            md={5}
            sm={8}
            xs={12}
            sx={{
              order: {
                xs: 1,
                md: 1,
              },
              pb: 8,
              px: 8
            }}
          >
            <Box
              sx={{
                position: 'relative',
                '& img': {
                  height: 'auto',
                  position: 'absolute',
                  top: 0,
                }
              }}
              
            >
  <Image 
  priority
  src="/avstatic/home/need-a-lawyer.png"
  layout="responsive"
  width={800}
  height={967}
  
  />
{/* TODO ADJUST HEIGHT ON MOBILE, CENTERED ON MOBILE, IMAGES THE SAME SIZE ON ALL COMPONENETS*/}
            </Box>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              order: {
                xs: 2,
                md: 1,
              },
              pb: 16,

            }}
          >
            <Typography variant="h6"
color={theme.palette.secondary.main}>
              FOR CLIENTS
              </Typography>
              <br />
            <Typography variant="h3" sx={{ mb:4}}
color={theme.palette.primary.contrastText}>
            Connecting you to the best lawyer for your needs.
            </Typography>
            <Typography
              color={theme.palette.primary.contrastText}
              sx={{ my: 3}}
              variant="body1"
            >
              <p>Advocat is designed to help you find the right lawyer for you by
matching your needs with a lawyer that is able to successfully
pursue your case.</p>

<p>For some clients it will be reputation or outcomes of previous cases,
for others it will be proximity to where you live, for others it might be
price or how other people have reviewed the services they have
received from a firm. Advocat lets you select all these preferences
and many more.</p>

<p>Advocat has been designed to take the stress out of using a lawyer
by guiding you to the best one for you. Our database covers nearly
every law firm and lawyer in Australia. Advocat has been designed
by people who have found finding the right lawyer difficult and
stressful and we have built it to help you by meeting your needs
accurately, quickly and efficiently.</p>

            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                m: -1,
                mt:3
              }}
            >
              <Button color="secondary"
                component="a"
                href="/#find-a-lawyer"
                size="large"
                sx={{ m: 1 }}
                variant="contained"
              >
                FIND A LAWYER
              </Button>
            </Box>
          </Grid>
  
        </Grid>
      </Container>
    </Box>
  );
};
