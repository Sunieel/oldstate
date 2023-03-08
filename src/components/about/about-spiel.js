import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import Image from 'next/image';

export const AboutSpiel = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#F2F1EF',
        pt: 16,
        '& li::before' : {
          content: '"--"', 
          letterSpacing: "-0.2em",
          fontSize: "1.2em",
          color: "red",
          display: "inline-block",
          width: "1em",
          marginLeft: "-1em",
        },
        '& ul': {listStyle: "none", ml: 0, p: "0 18px", m: "10px 0"},
        '& li': {m: "8px 0"}
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
              Advocat is driven by its founding values which underpin everything we do.
            </Typography>
            <Typography
              color="#01023B"
              sx={{ my: 3 }}
              variant="subtitle1"
            >
              {/* sx={{
                ListStyle: "none",
                Padding: 0,
              }} */}

              {/* sx={{
                PaddingLeft: "1.3em",
                '& *::before': {
                  Content: "-", 
                  Display: "inline-block",
                  MarginLeft: "-1.3em", 
                  Width: "1.3em", 
                },
              }} */}

              {/* <ul> */}
              <ul>
                  <li>We are honest in everything we do</li>
                  <li>We will make life better and easier for people going through the most challenging times in their lives</li>
                  <li>We are transparent and open about what us reasonable, achievable and what it should cost</li>
                  <li>We are open and receptive to feedback about our services and will continuously look to improve them</li>
                  <li>We look to be a leveller for those who have resources and those that do not</li>
              </ul>
              {/* <p>- </p>

              <p>- </p>

              <p>- </p>
                
              <p>- </p>

               <p>- </p>  */}
              {/* </ul> */}
            </Typography>
            <Typography variant="h6"
              color="#FF5403">
              Welcome to Advocat!
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
                src="/avstatic/for-clients.png"
                layout="responsive"
                width={3046}
                height={3679}
              />

            </Box>

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
