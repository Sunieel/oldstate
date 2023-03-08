import PropTypes, { number } from 'prop-types';
import { Badge, Box, Button, Card, CardActions, Link, CardHeader, Divider, useMediaQuery, Grid, IconButton, Typography, Rating, List, ListItem, ListItemText } from '@mui/material';
import { CurrencyDollar as CurrencyDollarIcon } from '../../icons/currency-dollar';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { Check as CheckIcon } from '../../icons/check';
import { Star as StartIcon } from '../../icons/star';
import Image from 'next/image';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { bg } from 'date-fns/locale';

const OrangeRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FF5403',
  },
  // '& .MuiRating-iconEmpty': {
  //   // color: '#CCC',
  //   '& .MuiSvgIcon-root': {
  //     // color: '#CCC',
  //     fill: "#CCC"
  //   }
  // }
});

// const GreenRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: '#1A504B',
//   }
// });

export const LawyerBox = (props) => {
  // const { name, site, type, subtypes, category, phone, full_address, rating, logo, working_hours, ...other  } = props;
  const { lawyer, lawyerLink, key, ...other } = props;
  const logoUrl = lawyer.logo ? lawyer.logo.split("s44-p-k-no-ns-nd/photo.jpg").join("") : '/icons/no-profile-image.svg';
  const changeImageBackground = logoUrl == '/icons/no-profile-image.svg' ? '#CCCCCC' : '#CCCCCC';

  const summary = [
    {
      name: "Location",
      content: lawyer.city + ", " + lawyer.state
    },

    {
      name: "Rating",
      content: (
        <table style={{ padding: 0, margin: 0, borderSpacing: 0 }}>
          <tbody>
            <tr style={{ padding: 0, margin: 0 }}>
              <td style={{ padding: 0, margin: 0 }}>
                <OrangeRating
                  // sx={{fontSize:"1.2rem"}}
                  color="secondary.main"
                  name="half-rating-read"
                  size="medium"
                  defaultValue={lawyer.rating || 0}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StartIcon fontSize="inherit" />}
                />
              </td>
              <td style={{ padding: 0, margin: 0 }}>
                <span style={{ fontWeight: "bold", textAlign: "center" }}>{(lawyer.rating == "0" || !lawyer.rating) ? <span style={{ color: "#ccc" }}>N/A</span> : <span style={{ color: "#FF5403" }}>{lawyer.rating}</span>}</span>
              </td>
            </tr>
          </tbody>
        </table>
      )
    },
    {
      name: "Reviews",
      content: lawyer.reviews === "" ? (<Typography variant="span" color="#CCC" sx={{ fontWeight: "bold" }}>0</Typography>) : (<Typography variant="span"
        color="secondary.main" sx={{ fontWeight: "bold" }}>{lawyer.reviews}</Typography>)
    },
    {
      name: "Price",
      content:
        <table style={{ padding: 0, margin: 0, borderSpacing: 0 }}>
          <tbody>
            <tr style={{ padding: 0, margin: 0 }}>
              <td style={{ padding: 0, margin: 0 }}>
                <CurrencyDollarIcon style={{ color: "#ccc" }} /><CurrencyDollarIcon style={{ color: "#ccc" }} /><CurrencyDollarIcon style={{ color: "#ccc" }} />
              </td>
              <td style={{ padding: 0, margin: 0, paddingBottom: "3px" }}><span style={{ color: "#ccc", fontWeight: "bold" }}>N/A</span>
              </td>
            </tr>
          </tbody>
        </table>

      // lawyer.rating !== "" ? (
      //   <OrangeRating
      //     name="cost-rating-read"
      //     size="small"
      //     sx={{fontSize:"1.2rem"}}
      //     defaultValue={lawyer.rating}
      //     precision={0.5}
      //     readOnly
      //     // max={3}
      //     icon={<CurrencyDollarIcon />}
      //     emptyIcon={<CurrencyDollarIcon style={{ opacity: 0.45 }} />}
      //   />
      // )
      //   : "No price info"
    },

  ];

  if (lawyer.jurisdiction) {
    summary.splice(1, 0, {
      name: "Jurisdiction",
      content: "Nationwide"
    });
  }

  const languages = ["English"];

  const features = [
    // {
    //   name: "Book Online",
    //   icon: (<CalendarIcon sx={{ color: "secondary.main" }} />),
    // },
    // {
    //   name: "Fixed fees",
    //   icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
    // },
    // {
    //   name: "Free first appoinment",
    //   icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
    // },
    // {
    //   name: "No win, no fee*",
    //   icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
    // }
  ];

  const isPremium = lawyer.membership
    && lawyer.membership === "premium";

  if (isPremium && lawyer.features) {
    if (lawyer.features.includes("book-online")) {
      features.push({
        name: "Book Online",
        icon: (<CalendarIcon sx={{ color: "secondary.main" }} />),
      });
    }
    if (lawyer.features.includes("free-first-appointment")) {
      features.push(
        {
          name: "Free first appoinment",
          icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
        },
      )
    }
    if (lawyer.features.includes("fixed-fees")) {
      features.push({
        name: "Fixed fees",
        icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
      });
    }
    if (lawyer.features.includes("no-win-no-fee")) {
      features.push({
        name: "No win, no fee*",
        icon: (<CheckIcon sx={{ color: "secondary.main" }} />)
      });

    }
  }



  return (
    <Grid
      item
      key={key}
      sm={4}
      xs={12}
    >
      <Box

        sx={{
          border: isPremium ? "3px solid #FF5403" : "none",

          // borderColor: 'secondary.main',
          // borderRadius: 1,
          // borderStyle: 'solid',
          // borderWidth: 2,
          borderRadius: '16px',


          backgroundColor: "white"

        }}
      >

        <NextLink
          href={lawyerLink}
          passHref
        >
          <Link>
            {/* <Button> */}
            <Box
              sx={{
                display: 'flex',
                // backgroundColor: {changeImageBackground},
                backgroundColor: logoUrl === '/icons/no-profile-image.svg'
                  ? '#01023B'
                  : "white",
                // 'neutral.100',
                // backgroundImage: `url(${logoUrl})`,
                // backgroundSize: '100%',
                borderWidth: 2,
                justifyContent: 'center',
                pt: 0,
                // width: '100%',
                minHeight: '20px',
                borderTopRightRadius: '16px',
                borderTopLeftRadius: '16px',
                // width: "100vw"

              }}
            >


              <Box sx={{
                height: "220px",
                width: "100%",
                backgroundImage: 'url(' + logoUrl + ')',
                borderRadius: "36px 36px 0 0",
                backgroundPosition: logoUrl === '/icons/no-profile-image.svg' ? "center 110px" : "center 30px",
                backgroundSize: "150px 150px",
                backgroundRepeat: "no-repeat",
                paddingBottom: "20px",
                paddingRight: "25px",
                borderBottom: "2px solid #CCC"

              }}
                align="right">

                {isPremium && <><Image
                  width="50px"
                  height="50px"
                  src="/avstatic/member-badge.png" /></>
                }

              </Box>




              {/* <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                // sx={{
                //   mr: 2
                // }}
                badgeContent={(
                  isPremium
                    ? <Image src="/icons/member-badge.svg"
                      alt="Member"
                      width={40}
                      height={40}
                      sx={{ 
                        // mt: "15px" 
                        top: "5px",
                        marginTop: "5px"
                      }}
                       />
                    : <></>)}

              >

                {logoUrl && (<Image
                  src={logoUrl}
                  alt={lawyer.name}
                  layout="fixed"
                  width="150px"
                  height="150px"
                  sx={{
                    mt: 2,
                    // cursor: "pointer"
                  }}
                />)}

              </Badge> */}
            </Box>
            {/* </Button> */}
          </Link>
        </NextLink>
        {/* <Divider sx={{ mx: 2, borderBlockWidth: "1px" }} /> */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box sx={{ minWidth: "100%" }}>
            <NextLink
              href={lawyerLink}
              passHref
            >
              <Link>
                <Typography variant="h6">
                  {lawyer.name}
                </Typography>
              </Link>
            </NextLink>
            <Typography variant="subtitle2"
              sx={{ mb: 2 }}>
              {lawyer.subtypes}
            </Typography>
            <Divider sx={{ borderBlockWidth: "1px" }} />


            <table style={{ padding: "10px 0" }}>
              <tbody>
                {summary.map((item, i) => (
                  <tr key={i}>
                    <td style={{ paddingRight: "5px", verticalAlign: "center" }}>
                      <Typography variant="subtitle2"
                        sx={{ textTransform: "uppercase", fontSize: "small" }}
                      >
                        {item.name}:
                      </Typography>
                    </td>
                    <td style={{ verticalAlign: "center" }}>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{ fontSize: "small" }}
                      >
                        {item.content}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider sx={{ borderBlockWidth: "1px" }} />

            {isPremium && <>
              <Typography variant="subtitle2"
                sx={{ textTransform: "caption", pt: 2 }}>
                LANGUAGES SPOKEN:
              </Typography>
              <List
                disablePadding
              // sx={{ pt: 2 }}
              >
                {languages.map((item) => (
                  <ListItem
                    disableGutters
                    key={item}
                    sx={{
                      pb: 2,
                      pt: 0
                    }}
                  >
                    <ListItemText
                      // disableTypography
                      primary={(
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                          >
                            {item}
                          </Typography>
                        </Box>
                      )}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ borderBlockWidth: "1px" }} />
              <List
                disablePadding
                sx={{ pt: 2 }}
              >
                {features.map((item) => (
                  <ListItem
                    disableGutters
                    key={item.name}
                    sx={{
                      pb: 1,
                      pt: 0
                    }}
                  >
                    <ListItemText
                      // disableTypography
                      primary={(
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            // justifyContent: 'space-between'
                          }}
                        >
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                              paddingRight: "10px"
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography variant="subtitle2">
                            {item.name}
                          </Typography>
                        </Box>
                      )}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ borderBlockWidth: "1px" }} />
            </>}
            

          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: "20px",

          }}
        >
          <NextLink
            href={lawyerLink}
            passHref
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: '32px' }}
            >
              View Profile
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Grid>
  );
};

LawyerBox.propTypes = {
  // address1: PropTypes.string,
  // address2: PropTypes.string,
  // country: PropTypes.string,
  // email: PropTypes.string.isRequired,
  // isVerified: PropTypes.bool.isRequired,
  // phone: PropTypes.string,
  // state: PropTypes.string
};
