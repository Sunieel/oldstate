import PropTypes from 'prop-types';
import { Box, Divider, Typography, Button, TextField, Popover, Link } from '@mui/material';
import { PropertyList } from '../property-list';

import { useState } from 'react';
import Image from 'next/image';

export const LawyerSummary = (props) => {
  const { lawyer, claimListingClicked, ...other } = props;

  // TODO move to lawyer page
  // const confirmDeleteListing = async () => {
  //   try {
  //     const deletedListing = {
  //       place_id: lawyer.place_id,
  //       deleted: true
  //     };

  //     // toast(JSON.stringify(editedListing));

  //     let updatedResult;
  //     if (lawyer.manuallyUpdated) {
  //       // what about scenario where a user e.g. john@lawyer makes a change
  //       // then sarah@lawyer logins in to change - not the same cognito object owner
  //       const result = await API.graphql({
  //         query: updateUpdatedProviderListing,
  //         variables: { input: deletedListing },
  //         authMode: 'AMAZON_COGNITO_USER_POOLS',
  //       });
  //       updatedResult = result.data.updateUpdatedProviderListing;
  //     } else {
  //       const result = await API.graphql({
  //         query: createUpdatedProviderListing,
  //         variables: { input: deletedListing },
  //         authMode: 'AMAZON_COGNITO_USER_POOLS',
  //       });
  //       updatedResult = result.data.createUpdatedProviderListing;
  //     }

  //     const mergedLawyer = mergeLawyers(lawyer, updatedResult);
  //     // toast(JSON.stringify(mergedLawyer));
  //     setLawyer(mergedLawyer);

  //     toast.success("Listing deleted");
  //     window.location.reload(false);

  //   } catch (e) {
  //     toast.error(JSON.stringify(e));
  //     console.error(e);
  //   } finally {
  //     setConfirmDeleteModal(false);
  //   }
  // }

  const [removeClicked, setRemoveClicked] = useState(false);

  const premium = lawyer.membership == "premium";
  const claimed = lawyer.membership == "claimed";

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const logoUrl = lawyer.logo ? (lawyer.logo.includes("s44-p-k-no-ns-nd/photo.jpg") ? lawyer.logo.split("s44-p-k-no-ns-nd/photo.jpg").join("") : lawyer.logo) : '/icons/no-profile-image.svg';
  // lawyer.logo ? lawyer.logo.split("s44-p-k-no-ns-nd/photo.jpg").join("") : '/icons/no-profile-image.svg';
  const changeImageBackground = logoUrl == '/icons/no-profile-image.svg' ?  '#01023B'
  : "white";

  return (<>

    <Box sx={{
      backgroundColor: "white",
      padding: 0,
      borderRadius: "36px",
    }}>

      <Box sx={{
        height: "240px",
        width: "100%",
        backgroundColor: changeImageBackground,
        backgroundImage: 'url(' + (logoUrl) + ')',
        borderRadius: "36px 36px 0 0",
        // backgroundPosition: "center bottom",
        backgroundPosition: logoUrl === '/icons/no-profile-image.svg' ? "center 130px" : "center 50px",
        backgroundSize: "150px 150px",
        backgroundRepeat: "no-repeat",
        paddingBottom: "20px",
        paddingRight: "25px",
        borderBottom: "2px solid #1A504B"

        // height: "220px",
        //         width: "100%",
        //         backgroundImage: 'url(' + logoUrl + ')',
        //         borderRadius: "36px 36px 0 0",
        //         backgroundPosition: logoUrl === '/icons/no-profile-image.svg' ? "center 110px" : "center 30px",
        //         backgroundSize: "150px 150px",
        //         backgroundRepeat: "no-repeat",
        //         paddingBottom: "20px",
        //         paddingRight: "25px",
        //         borderBottom: "2px solid #CCC"

      }}
        align="right">

        {premium && <><Image
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          width="50px"
          height="50px"
          src="/avstatic/member-badge.png" />
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Advocat Member</Typography>
          </Popover></>
        }

      </Box>

      <Box sx={{
        padding: "20px",
      }}>


        <PropertyList>


          <div key={lawyer.full_address}>

            <Typography
              color="#01023B"
              variant="body2"
              sx={{
                fontWeight: 900
              }}
            >
              LOCATION:
            </Typography>
            <Typography
              color="#01023B"
              variant="body2"
            >
              {lawyer.full_address}
            </Typography>
          </div>

          <br />
          <div key={lawyer.phone}>

            <Typography
              color="#01023B"
              variant="body2"
              sx={{
                fontWeight: 900
              }}
            >
              PHONE:
            </Typography>
            <Typography
              color="#01023B"
              variant="body2"
            >
              {lawyer.phone}
            </Typography>
          </div>


          <br />
          <div key={lawyer.type}>

            <Typography
              color="#01023B"
              variant="body2"
              sx={{
                fontWeight: 900
              }}
            >
              TYPE:
            </Typography>
            <Typography
              color="#01023B"
              variant="body2"
            >
              {lawyer.type}
            </Typography>
          </div>


          <br />

          {/* <Button onClick={() => scrollTo(servicesRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Services" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Services" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      SERVICES</Button> */}
          <Box sx={{
            '& .MuiButtonBase-root:hover': { color: "white" },
          }}>
          <Button

            variant="contained"
            sx={{
              backgroundColor: "white",
              border: "2px solid #01023B",
              color: "#01023B",
              marginBottom: "10px",
              
              
            }}
            href={lawyer.site}
            target="_blank"
          >
            VISIT WEBSITE
          </Button>


          

{/* key name string much match file name e.g. [key].svg */}
{(!premium && !claimed) && (["facebook", "instagram", "linkedin", "twitter"]).map(social => (



  lawyer[social] &&
  // <><a href={lawyer[social]}><img alt={social}
  //   src={`/icons/${social}.svg`} /></a>&nbsp;&nbsp;</>

  <><br /><Button

                variant="contained"
                sx={{
                  backgroundColor: "white",
                  border: "2px solid #01023B",
                  color: "#01023B",
                  marginBottom: "10px"
                }}
                href={lawyer[social]}
                target="_blank"
              >
                VISIT {social.toUpperCase()}
              </Button></>


))}



          
          <br />
          <Button
            color="secondary"
            variant="contained"
            href={`mailto:${lawyer.email_1}`}
          >
            CONTACT
          </Button>

          </Box>
        </PropertyList>

        {(!premium && !claimed) && <>

          

          {/* key name string much match file name e.g. [key].svg */}
          {/* {(["facebook", "instagram", "linkedin", "twitter"]).map(social => (



            lawyer[social] &&
            // <><a href={lawyer[social]}><img alt={social}
            //   src={`/icons/${social}.svg`} /></a>&nbsp;&nbsp;</>

            <><br /><Button

                          variant="contained"
                          sx={{
                            backgroundColor: "white",
                            border: "2px solid #01023B",
                            color: "#01023B",
                            marginBottom: "10px"
                          }}
                          href={lawyer[social]}
                          target="_blank"
                        >
                          VISIT {social.toUpperCase()}
                        </Button></>


          ))} */}


          <Divider sx={{ my: 2, borderWidth: 1, borderColor: "#ccc" }} />

          <Typography
            color="#01023B"
            variant="body2"
            sx={{
              fontWeight: 900
            }}
          >
            OFFICE HOURS:
          </Typography>

            <table><tbody>
          {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).map(day => (
            // <Box
            //   key={day}
            //   sx={{
            //     alignItems: 'center',
            //     display: 'flex',
            //     // mt: 1
            //   }}>
            <tr key={day}>
              <td>
              <Typography variant="body2">
                {day}
              </Typography>
              </td>
              {/* // <div style={{ width: "10px" }}></div> */}
              <td>   
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {lawyer.working_hours && lawyer.working_hours[day]}
              </Typography>
              </td>
            
            </tr>

            // </Box>

          ))}
          </tbody></table>

          <Divider sx={{ my: 2, borderWidth: 1, borderColor: "#ccc" }} />

          <Typography
            color="#01023B"
            variant="body2"
            sx={{
              fontWeight: 900
            }}
          >
            IS THIS YOUR PROFILE?
          </Typography>
          {/* <NextLink href="/"><Link>test</Link></NextLink> */}
          <div style={{height: "5px"}}></div>
          <a href="#claim" onClick={() => claimListingClicked()} style={{color: "#01023B", fontSize:"0.875rem"}}>CLAIM LISTING</a>
          {/* <Button variant="a" onClick={() => claimListingClicked(!removeClicked)} sx={{m: 0, p: 0, textDecoration: "underline"}} >remove listing</Button> */}

          {/* <a href="#test" onClick={() => removeClicked()}>REMOVE</a> */}
          <div style={{height: "5px"}}></div>
          <div style={{color: "#01023B", fontSize:"0.875rem"}}>
          {!removeClicked ? <>
                <a href="#/" onClick={() => setRemoveClicked(!removeClicked)} style={{color: "#01023B"}} >REMOVE LISTING</a>
                </> : <>
                To remove this profile you must first claim it for proof of ownership. <a href="#/" onClick={() => setRemoveClicked(!removeClicked)} style={{color: "#01023B"}}>OK</a>
                </>}
           </div>
        </>}
        
      </Box>
    </Box>
  </>
  );
};

LawyerSummary.propTypes = {
  lawyer: PropTypes.object.isRequired
};
