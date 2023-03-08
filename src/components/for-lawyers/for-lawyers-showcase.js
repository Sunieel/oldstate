import { Box, Button, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import Image from 'next/image';
import RemoveIcon from '@mui/icons-material/Remove';

export const ShowcaseLawFirms = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#F2F1EF',
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
            md={6}
            xs={12}
            sx={{
              order: {
                xs: 2,
                md: 1,
              },
              pb: 16,

            }}
          >
            <Typography variant="h2"
sx={{ mb: 5, lineHeight: "1.2em" }}>
              Showcase your
              firm + stand out
              from your competitors.
            </Typography>
            <Typography variant="body">
              Get priority listing with an
              Advocat Premium Profile:
            </Typography>
            <Box >
              <List sx={{ml: 0, pl:0}} >
                <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overview of your business"
                  />
                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Details of services"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Staff profiles"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Accreditations &amp; awards"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reviews"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Fee guide"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQs"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contact details"
                  />                  </ListItem>
                  <ListItem sx={{ml: 0, pl:0, pb: 0}}>
                  <ListItemIcon>
                    <RemoveIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Badges for fixed fees,
                    first free appointment &
                    no win, no fee"
                  />                  </ListItem>
                  <ListItem>
                </ListItem>
              </List>
            </Box>
            <Box
  
            >
              <Button
                component="a"
                // TODO make an xyz
                href="/lawyers/vic/melbourne/xyz-lawyers"
                size="large"

                sx={{ m: 1, px: 5, py: 1 }}
                variant="outlined"
              >
                VIEW PREMIUM EXAMPLE
              </Button>
              <Button color="secondary"
                component="a"
                href="/authentication/register"
                size="large"

                sx={{ m: 1, px: 5, py: 1 }}
                variant="contained"
              >
                CREATE PREMIUM PROFILE
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              order: {
                xs: 1,
                md: 2,
              },

            }}
          >
            <Box
              // sx={{
              //   position: 'relative',
              //   '& img': {
              //     height: 'auto',
              //     position: 'absolute',
              //     top: 0,
              //     // width: '60%'
              //   }
              // }}
            >
              <Image
                src={`/avstatic/for-lawyers-lawyer.png`}
                alt="Advocat Lawyer Signup"
                layout="responsive"
                width={800}
                height={1048}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
