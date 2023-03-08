import {
  Box,
  Container,
  Divider,
  Button,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import Image from 'next/image';
import { Logo } from './logo';
import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#01023B',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.light,
}));

const sections = [
  {
    title: 'Menu',
    links: [
      {
        title: 'FIND A LAWYER',
        href: '/lawyers'
      },
      {
        title: 'FOR LAWYERS & FIRMS',
        href: '/for-lawyers'
      },
      {
        title: 'ABOUT US',
        href: '/about'
      },
      {
        title: 'CONTACT US',
        href: '/contact'
      }
    ]
  }
];

const section2 = [
  {
    title: 'Menu',
    links: [
      {
        title: 'DIVORCE & FAMILY LAW',
        href: '/divorce-family-law'
      },
      {
        title: 'PROPERTY LAW',
        href: '/property-law'
      },
      {
        title: 'INJURY, COMPENSATION & EMPLOYMENT LAW',
        href: '/injury-compensation-law'
      },
      {
        title: 'DEATH & ESTATE LAW',
        href: '/death-estate-law'
      }
    ]
  }
];


const socials = {
  title: 'JOIN OUR SOCIALS',
  links: [
    {
      title: (<Image
        src="/icons/facebook-orange.svg"
        height="30px"
        width="16px"
      />),
      href: '#'
    },
    {
      title: (<Image
        src="/icons/linked-in-orange.svg"
        height="30px"
        width="30px"
      />),
      href: '#'
    },
    {
      title: (<Image
        src="/icons/twitter-orange.svg"
        height="30px"
        width="30px"
      />),
      href: '#'
    }
  ]
}
export const Footer = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.header',
      // borderTopColor: 'divider',
      // borderTopStyle: 'solid',
      // borderTopWidth: 1,
      pb: 6,
      pt: {
        md: 7,
        xs: 5
      }
    }}
    {...props}>
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={4}
          sm={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: {
              md: 1,
              xs: 4
            }
          }}
          xs={12}
        >
          <NextLink
            href="/"
            passHref
          >
            <a>
              <Image
                src="/avstatic/advocat-trademarked.svg"
                alt="Advocat - find a lawyer"
                height="47px"
                width="216px"
                layout="fixed"
              />
            </a>
          </NextLink>

        </Grid>
        {sections.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={4}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1
              }
            }}
            xs={12}
          >
            {/* <Typography
              color="textSecondary"
              variant="overline"
            >
              {section.title}
            </Typography> */}
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 1
                  }}
                >
                  <ListItemText
                    primary={(
                      <Link
                        href={link.href}
                        color="text.light"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
        {section2.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={4}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1
              }
            }}
            xs={12}
          >
            {/* <Typography
              color="textSecondary"
              variant="overline"
            >
              {section.title}
            </Typography> */}
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 1
                  }}
                >
                  <ListItemText
                    primary={(
                      <Link
                        href={link.href}
                        color="text.light"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
        {/* <Grid
          item
          md={4}
          sm={4}
          sx={{

            display: 'flex',
            flexDirection: 'column',

            order: {
              md: 4,
              xs: 3
            }
          }}
          xs={12}
        >
          <Button
            fullWidth={false}
            endIcon={<ArrowRightIcon fontSize="small"
              sx={{ color: "secondary.main", ml: 10 }} />}
            sx={{ color: 'text.light', fontWeight: '100', borderBottom: 1, borderColor: 'secondary.main', borderRadius: 0, textTransform: 'uppercase' }}
          >
            Subscribe to our newsletter
          </Button>
          <>
            <Typography
              color="text.light"
              variant="subtitle2"
              sx={{ mt: 4 }}
            >
              {socials.title}
            </Typography>
            <List disablePadding
              component={Stack}
              direction="row"
              spacing={0}>
              {socials.links.map((link, i) => (
                <ListItem
                  disableGutters
                  key={i}
                  sx={{
                    pb: 0,
                    pt: 1
                  }}
                >
                  <ListItemText
                    primary={(
                      <Link
                        href={link.href}
                        color="text.light"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </>
        </Grid> */}
      </Grid>
      <Typography
        color="text.light"
        variant="subtitle2"
        sx={{
          textTransform: 'uppercase',
          mt: 2,
          fontSize: '0.75rem'
        }}
      >
        © Advocat 2022 -  All rights reserved

        <Typography
          color="secondary.main"
          variant="span"
          sx={{
            textTransform: 'uppercase',
            mr: 1,
            ml: 2,
            fontSize: '0.75rem'
          }}
        >|
        </Typography>
        <Link
          href="/privacy"
          color="text.light"
          variant="subtitle2"
          sx={{
            mx: 1,
            fontSize: '0.75rem'
          }}
        >
          PRIVACY
        </Link>
        <Typography
          color="secondary.main"
          variant="span"
          sx={{
            textTransform: 'uppercase',
            mx: 1,
            fontSize: '0.75rem'
          }}
        >|
        </Typography>
        <Link
          href="/terms"
          color="text.light"
          variant="subtitle2"
          sx={{
            mx: 1,
            fontSize: '0.75rem'
          }}
        >
          TERMS
        </Link>
      </Typography>





    </Container>
  </Box>
);
