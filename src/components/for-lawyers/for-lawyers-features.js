import { Box, Container, Typography, Grid, Card, Button } from '@mui/material';
import Image from 'next/image';

export const FirmFeatures = (props) => {

  return (
    <Box
      sx={{
        backgroundColor: '#FF5403',
        py: 15
      }}
      {...props}>
      <Container
        maxWidth="lg"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid
          container
          // spacing={4}
        >
          <Grid
            item
            md={3}
            xs={12}
            sx={{pr:4, pb: {xs:4}}}
          >

            <Box sx={{ my: 2, width: "35%" }}>
              <Image
                layout='responsive'
                src='/avstatic/client-base.svg'
                alt='grow your law firm'
                width={100}
                height={100}
              />
            </Box>
            <Box sx={{ my: 6 }}>

              <Typography
                variant="h3"
                color="secondary.contrastText"
              >
                Grow your
                client base
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography
                color="secondary.contrastText"
                variant="p"
                sx={{ my: 5 }}
              >
                Advocat provides a level playing
field for all personal legal
practitioners irrespective of
firm size.<br /><br />
With Advocat Premium you can
make that an unfair advantage by
maximising lead generation,
creating a referral engine for your
firm and through Search Engine
Optimisation making sure your firm
is always highlighted in results.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            sx={{pr:4, pb: {xs:4}}}
          >

            <Box sx={{ my: 2, width: "35%" }}>
              <Image
                layout='responsive'
                src='/avstatic/showcase.svg'
                alt='data for law firms'
                width={100}
                height={100}
              />
            </Box>
            <Box sx={{ my: 6 }}>

              <Typography
                variant="h3"
                color="secondary.contrastText"
              >
                Showcase
your firm &amp;
your people
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography
                color="secondary.contrastText"
                variant="p"
                sx={{ my: 5 }}
              >
                
Advocat allows you to position
yourself against your competitors in
a way that showcases your
strengths. Our enhanced search
allows clients to find the most highly
rated, cost effective and successful
firms quickly and easily.<br /><br />
Advocat also allows you to profile
yourself and your team to make sure
clients can see the best of you and
your firm in just a couple of clicks.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            sx={{pr:4, pb: {xs:4}}}
          >

            <Box sx={{ my: 2, width: "35%" }}>
              <Image
                layout='responsive'
                src='/avstatic/marketing.svg'
                alt='marketing for law firms'
                width={100}
                height={100}
              />
            </Box>
            <Box sx={{ my: 6 }}>

              <Typography
                variant="h3"
                color="secondary.contrastText"
              >
                Marketing
made simple
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography
                color="secondary.contrastText"
                variant="p"
                sx={{ my: 5 }}
              >
                Advocat helps you to create a profile
that is professional and allows you to
emphasize your firms’ capabilities
and strengths.<br /><br />
Advocat can add badges for things
such as no win no fee, fixed price fees
and free initial consultations so
clients can quickly compare services.

              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            sx={{pr:4, pb: {xs:4}}}
          >

            <Box sx={{ my: 2, width: "35%" }}>
              <Image
                layout='responsive'
                src='/avstatic/reviews.svg'
                alt='review law firms'
                width={100}
                height={100}
              />
            </Box>
            <Box sx={{ my: 6 }}>

              <Typography
                variant="h3"
                color="secondary.contrastText"
              >
                Receive &amp; respond
to reviews
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography
                color="secondary.contrastText"
                variant="p"
                sx={{ my: 5 }}
              >
                Advocat enables you to receive and
respond to client reviews as well as
showcasing the best reviews.<br /><br />
Advocat empowers you to take
control of your online presence by
responding to reviews.

              </Typography>
            </Box>
          </Grid> 



        </Grid>
      </Container>

    </Box>
  )
};