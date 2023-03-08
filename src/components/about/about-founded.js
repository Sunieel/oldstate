import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import Image from 'next/image';

export const AboutFounded = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 16,
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
            <Typography variant="h3"
              color="#01023B">
              Founded in 2021
            </Typography>
            <Typography
              color="#01023B"
              sx={{ my: 3 }}
              variant="subtitle1"
            >

              <p>Advocat was founded in 2021 by Joss Raines. Joss has worked as the Global Head of Strategy and Global Head of Data and Digital for a major Australian bank. In 2019 after needing the services of a range of personal legal services, Joss felt there was a gap in the ability to find a good lawyer, other than by word of mouth. Whilst some of the circumstances in using the services of a lawyer are quite straightforward, others can come at very stressful times in our lives. Advocat is designed to continuously improve the connection between lawyers and clients and to make life easier for everyone involved in the process.</p>

              <p>Joss has studied at the Universities of Durham and Cambridge and has studied Digitization at the Massachusetts Institute of Technology.</p>

            </Typography>

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
              pb: 3,

            }}
          >


            {/* <Box
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
                src="/avstatic/for-clients.png"
                layout="responsive"
                width={3046}
                height={3679}
              />

            </Box> */}

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
