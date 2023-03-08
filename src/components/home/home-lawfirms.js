import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import Image from 'next/image';

export const HomeLawFirms = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
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
              FOR LAWYERS &amp; FIRMS
              </Typography>
              <br />
            <Typography variant="h3">
            Connecting your firm to more clients.
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ my: 3 }}
              variant="body1"
            >
              <p>Advocat was designed in consultation with Lawyers, Law firms and their clients
in Australia to change the way consumers identify the right law firms for them,
making the experience of finding a lawyer simpler and more transparent.</p>

<p>Clients who need the services of a lawyer often need assistance in finding the
right provider and articulating their needs; Advocat has taken their feedback
to help them find you more easily. As our industry moves away from word of
mouth, simple internet search and geographically based premises and
advertising, Advocat will support your business to take it into the future.</p>

<p>Advocat has the profile of almost every lawyer in Australia and is useful for
everyone from large law firms to sole practitioners.</p>

<p>Advocat is a referral engine of clients for the firms that actively use it. Advocat
uses innovative technology to allow potential clients to find the expert services
you offer through enhanced search.</p>

<p>Most law providers in Australia are small to medium sized enterprises, Advocat
provides a free or cost-effective way of Marketing your firm whilst providing a
state-of-the-art user experience to turn prospective clients into paying clients.</p>

<p>Advocat also offers a Premium service to further increase your online presence
and reach. To take your firm to the next level or to consolidate your Market
position, see our cost-effective Premium offering.</p>
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
                href="/authentication/register"
                size="large"
                sx={{ m: 1 }}
                variant="contained"
              >
                REGISTER YOUR FIRM
              </Button>
            </Box>
          </Grid>
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
              px: 8,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                '& img': {
                  height: 'auto',
                  position: 'absolute',
                  top: 0,
                  // width: '60%'
                }
              }}
            >
               <Image 
               priority
                src={`/avstatic/home/best-lawyer.png`} 
                alt="Advocat Lawyer Signup" 
                layout="responsive"
                width={800}
                height={967}
               />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
