import Head from 'next/head';
import { Box, Grid, Container, Typography, Divider, Button, FormControl, Select, MenuItem, Rating } from '@mui/material';
import { postcodeApi } from '../../../../__fake-api__/postcodes-api';
import { CustomBreadcrumb } from '../../../../components/custom-breadcrumb';
import { useEffect, useState, useRef, Children, isValidElement, cloneElement, useCallback } from 'react';
import { LawyerSummary } from '../../../../components/lawyers/lawyer-summary';
import { CompanyReviews } from '../../../../components/dashboard/jobs/company-reviews';
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

import { LawyerOverview } from '../../../../components/lawyers/lawyer-overview';
import { LawyerServices } from '../../../../components/lawyers/lawyer-services';
import { LawyerPeople } from '../../../../components/lawyers/lawyer-people';
import { LawyerAccreditations } from '../../../../components/lawyers/lawyer-accreditations';
import { LawyerFees } from '../../../../components/lawyers/lawyer-fees';
import { LawyerFaq } from '../../../../components/lawyers/lawyer-faq';

import Image from 'next/image';

import { createUpdatedProviderListing, updateUpdatedProviderListing } from '../../../../graphql/mutations';

import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { useMounted } from '../../../../hooks/use-mounted';

import { Amplify, Auth, nav } from 'aws-amplify';

import { Wrapper } from "@googlemaps/react-wrapper";

import { useAuth } from '../../../../hooks/use-auth';

import { googleConfig } from '../../../../config';

import { MainLayout } from '../../../../components/main-layout';

import { API } from 'aws-amplify';
import { listingsByUrlKey } from '../../../../graphql/queries';
import NextLink from 'next/link';
// import { mergeLawyers } from '../../../../../utils/merge-lawyer'
import { gtm } from '../../../..//lib/gtm';
import { forUrl } from '../../../../utils/text-normaliser';


const psl = require('psl');

import { v4 as uuidv4, v4 } from 'uuid';

import awsExports from '../../../../aws-exports';
// import useWindowDimensions from '../../../../../utils/get-window-dimensions';
import { LawyerCreateEdit } from '../../../../components/lawyers/lawyer-create-edit';
Amplify.configure(awsExports);


const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  setTimeout(() => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
  // OPTION for dynamic scroll position
  // const y = ele.getBoundingClientRect().top + 100;
  // window.scrollTo({top: y, behavior: 'smooth'});
};

const LawyerName = ({ lawyerDetails: lawyerDetailsProps }) => {
  const townLink = "/lawyers/" + lawyerDetailsProps.city_key.split(':::-:::').join('/');
  // console.log('townLink', townLink);
  const [lawyerDetails, setLawyerDetails] = useState(lawyerDetailsProps);

  const { user, register, verifyCode } = useAuth();

  const [clicks, setClicks] = useState();
  const [zoom, setZoom] = useState(20); // initial zoom
  const markerPosition = {
    lat: parseFloat(lawyerDetails.latitude),
    lng: parseFloat(lawyerDetails.longitude),
  };
  const [center, setCenter] = useState(markerPosition);

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const render = (status) => <h1>{status}</h1>;

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter());
  };
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  const reactivateListing = async () => {
    // TODO revise this logic

    // try {
    //   const reactivatedListing = {
    //     place_id: lawyerDetails.place_id,
    //     deleted: false
    //   };

    //   let updatedResult;
    //   if (lawyerDetails.manuallyUpdated) {
    //     const result = await API.graphql({
    //       query: updateUpdatedProviderListing,
    //       variables: { input: reactivatedListing },
    //       authMode: 'AMAZON_COGNITO_USER_POOLS',
    //     });
    //     updatedResult = result.data.updateUpdatedProviderListing;
    //   } else {
    //     const result = await API.graphql({
    //       query: createUpdatedProviderListing,
    //       variables: { input: reactivatedListing },
    //       authMode: 'AMAZON_COGNITO_USER_POOLS',
    //     });
    //     updatedResult = result.data.createUpdatedProviderListing;
    //   }

    //   // TODO do we need merged laywer anymore?
    //   const mergedLawyer = mergeLawyers(lawyerDetails, updatedResult);
    //   setLawyerDetails(mergedLawyer);

    //   toast.success("Listing reactivated!");
    //   window.location.reload(false);

    // } catch (e) {
    //   toast.error(JSON.stringify(e));
    //   console.error(e);
    // } finally {
    //   // setConfirmDeleteModal(false);
    // }
  }

  const premium = lawyerDetails.membership == "premium";
  const claimed = lawyerDetails.membership == "claimed";

  const makemap = () =>
    // later could make height of map match white box based on getting heights 
    <div style={{ flexGrow: "1", height: premium || claimed ? "700px" : "810px", width: "100%" }}>
      <Wrapper apiKey={googleConfig.mapsApiKey}
        render={render} >
        <MyMap style={{ flexGrow: "1", height: premium || claimed ? "700px" : "810px", width: "100%", borderRadius: "30px", border: "2px solid #bbb" }}
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}>
          <MyMarker position={markerPosition} />
        </MyMap>
      </Wrapper>
    </div>



  const isMounted = useMounted();



  const overviewRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactRef = useRef(null);
  const servicesRef = useRef(null);
  const peopleRef = useRef(null);
  const accreditationsRef = useRef(null);
  const feesRef = useRef(null);
  const faqRef = useRef(null);


  const overviewContainerRef = useRef(null);
  const reviewsContainerRef = useRef(null);
  const contactContainerRef = useRef(null);

  const servicesContainerRef = useRef(null);
  const peopleContainerRef = useRef(null);
  const accreditationsContainerRef = useRef(null);
  const feesContainerRef = useRef(null);
  const faqContainerRef = useRef(null);

  const bannerRef = useRef(null);

  const navHeight = 64;

  const getHeaderHeight = () => {

    let headerHeight = navHeight;
    if (bannerRef && bannerRef.current) {
      headerHeight += getDimensions(bannerRef.current).height;
    }
    return headerHeight;
  }


  const sectionRefs = [
    { section: "Overview", premium: true, ref: overviewRef, container: overviewContainerRef },
    { section: "Services", ref: servicesRef, container: servicesContainerRef },
    { section: "People", premium: true, ref: peopleRef, container: peopleContainerRef },
    { section: "Accreditations", premium: true, ref: accreditationsRef, container: accreditationsContainerRef },
    { section: "Fees", premium: true, ref: feesRef, container: feesContainerRef },
    { section: "FAQ", premium: true, ref: faqRef, container: faqContainerRef },
    { section: "Reviews", ref: reviewsRef, container: reviewsContainerRef },
    { section: "Contact", ref: contactRef, container: contactContainerRef },
  ];

  const [visibleSection, setVisibleSection] = useState();


  // const { windowHeight, windowWidth } = useWindowDimensions();


  // TODO if any issues with this can change to use
  // sx={{ md: 'none' }}
  // etc. can hide/show things depending on device size
  const [windowWidth, setWindowWidth] = useState(0);

  function handleWindowSizeChange() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  // const isMobile = width <= 768;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hHeight = getHeaderHeight();
      const selected = sectionRefs.find(({ section, container }) => {
        const ele = container.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > (offsetTop - hHeight - 20) && scrollPosition < (offsetBottom - hHeight - 20);
        }
      });
      if (selected && selected.section !== visibleSection) {
        console.log(selected.section);
        setVisibleSection(selected.section);
        setSubMenuTab(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleSection]);

  const handleSubMenuChange = (e) => {
    setSubMenuTab(e.target.value);
    console.log(e.target.value);
    switch (e.target.value) {
      case "Overview":
        scrollTo(overviewRef.current);
        break;
      case "Services":
        scrollTo(servicesRef.current);
        break;
      case "People":
        scrollTo(peopleRef.current);
        break;
      case "Accreditations":
        scrollTo(accreditationsRef.current);
        break;
      case "Fees":
        scrollTo(feesRef.current);
        break;
      case "FAQ":
        scrollTo(faqRef.current);
        break;
      case "Reviews":
        scrollTo(reviewsRef.current);
        break;
      case "Contact":
        scrollTo(contactRef.current);
        break;
      default:
        break;
    }
  }

  const [subMenuTab, setSubMenuTab] = useState(premium ? "Overview" : "Services");

  const router = useRouter();

  const loginUrl = '/authentication/register?returnUrl=' + router.asPath;

  const [emailNotMatchDomain, setEmailNotMatchDomain] = useState(false);

  const [emailDomain, setEmailDomain] = useState(null);
  const [webDomain, setWebDomain] = useState(null);

  const saveAsClaimed = async () => {
    // show loading and set to claimed
    // allow: private, operations: [read]
    const result = await API.graphql({
      query: updateUpdatedProviderListing,
      variables: {
        input: {
          place_id: lawyerDetails.place_id,
          membership: "claimed",
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    // const updatedResult = result.data.claimListing;
    // const mergedLawyer = mergeLawyers(lawyerDetails, updatedResult);
    // setLawyerDetails(mergedLawyer);
    // toast.success("Listing claimed!");
    router.reload();
  }

  const getWebsiteDomain = (site) => {
    let siteCopy = site;
    if (!siteCopy.startsWith("http://") && !siteCopy.startsWith("https://")) {
      siteCopy = "https://" + siteCopy;
    }
    const siteHost = (new URL(siteCopy)).host;
    return psl.parse(siteHost).domain;
  }

  const claimListingClicked = async () => {

    // TODO what if site is null or malformed?

    try {
      if (user) {

        const emailDomain = psl.parse(user.email.split("@")[1]).domain;
        const webDomain = getWebsiteDomain(lawyerDetails.site);

        setEmailDomain(emailDomain);
        setWebDomain(webDomain);

        const hasVerified = await checkIfUserHasVerifiedEmail(webDomain);

        if ((emailDomain === webDomain) || hasVerified) {
          await saveAsClaimed();
        } else {
          // show not match process
          setEmailNotMatchDomain(true);
        }
      } else {
        router.push(loginUrl);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error claiming listing");
    }
  };

  const handleGotItClicked = () => {
    setEmailNotMatchDomain(false);
  }

  const [emailError, setEmailError] = useState(false);
  const [secondaryEmail, setSecondaryEmail] = useState("");

  const [verificationCode, setVerificationCode] = useState("");


  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const verifySecondaryEmail = async () => {

    try {
      const sanitisedSecondaryEmail = secondaryEmail.trim().toLowerCase();
      let sanitisedSecondaryEmailDomain = null;

      try {
        sanitisedSecondaryEmailDomain = psl.parse(sanitisedSecondaryEmail.split("@")[1]).domain;
      } catch (e) {
        setEmailError(true);
        return;
      }

      if (sanitisedSecondaryEmailDomain !== webDomain) {
        setEmailError(true);
        return;
      }

      setEmailError(false);

      // TODO email validation regex


      const user = await Auth.currentAuthenticatedUser();

      const token = user.signInUserSession.idToken.jwtToken;

      // TODO send POST request to APIGW emailApi (built)
      // pass token as the authorization header
      // that triggers the sendEmail lambda
      // the lambda does SES.sendCustomVerificationEmail
      // but the AdvocatCustomVerification template cannot take effect
      // because ProductionAccessNotGranted
      // SES needs to be set from sandbox to Production once we go live


      // const { verifyCode } = useAuth();
      // const { register } = useAuth();
      await register(
        sanitisedSecondaryEmail,
        // RANDOM PW
        "Fake$123" + uuidv4().substring(0, 8),
        "fake.firstName",
        "fake.surName",
        "fake.firmName",
        "fake.phone",
      );
      setVerificationCodeSent(true);


      toast.success(
        "Verification email with instructions sent to "
        + sanitisedSecondaryEmail,
        { duration: 3000 }
      );

      // handleGotItClicked();

    } catch (error) {
      console.error("Error sending verification email", error);
      toast.error("Error sending verification email, if error persists contact support", { duration: 3000 });
    }
  }

  const checkIfUserOwnsCustomListing = async (webDomain) => {
    if (!user) {
      return false;
    }
    const authUser = await Auth.currentAuthenticatedUser();
    const customListings = authUser.attributes["custom:listings"];
    if (customListings) {
      try {
        const customListingsParsed = JSON.parse(customListings);
        return customListingsParsed.find(l => l.place_id === lawyerDetails.place_id);
      } catch (_) {
        return false;
      }
    }
    return false;
  }

  const checkIfUserHasVerifiedEmail = async (webDomain) => {
    if (!user) {
      return false;
    }
    const authUser = await Auth.currentAuthenticatedUser();
    const verifiedEmails = authUser.attributes["custom:verifiedEmails"];
    if (verifiedEmails) {
      try {
        const verifiedEmailsParsed = JSON.parse(verifiedEmails);
        const found = verifiedEmailsParsed.find(e => {
          const emailDomain = psl.parse(e.split("@")[1]).domain;
          return (emailDomain === webDomain);
        });
        return found;
      } catch (_) {
        return false;
      }
    }
    return false;
  }

  const addVerifiedEmailToUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const verifiedEmails = authUser.attributes["custom:verifiedEmails"];
    let updatedVerifiedEmails = null;

    const sanitisedSecondaryEmail = secondaryEmail.trim().toLowerCase();

    if (verifiedEmails) {
      try {
        const verifiedEmailsParsed = JSON.parse(verifiedEmails);
        const found = verifiedEmailsParsed.find(e => e == sanitisedSecondaryEmail);
        if (!found) {
          verifiedEmailsParsed.push(sanitisedSecondaryEmail);
          updatedVerifiedEmails = verifiedEmailsParsed;
        } else {
          // already there no need to add
          return;
        }
      } catch (error) {
        updatedVerifiedEmails = [sanitisedSecondaryEmail]
      }
    } else {
      updatedVerifiedEmails = [sanitisedSecondaryEmail]
    }

    if (updatedVerifiedEmails) {
      await Auth.updateUserAttributes(authUser, {
        'custom:verifiedEmails': JSON.stringify(updatedVerifiedEmails),
      });
    }

  }

  const verifySecondaryEmailCode = async () => {
    try {
      const sanitisedCode = verificationCode.trim();
      console.log(sanitisedCode);
      if (!sanitisedCode || sanitisedCode === "" || sanitisedCode.length < 3) {
        throw new Error("Code must be 4 chars");
      }
      const sanitisedSecondaryEmail = secondaryEmail.trim().toLowerCase();

      // MAYBE: check if email in userClaimedEmails?
      // because if it's there we don't need to verify code again
      await verifyCode(sanitisedSecondaryEmail, sanitisedCode);

      await addVerifiedEmailToUser();

      await saveAsClaimed();

      setVerificationCodeSent(false);
      handleGotItClicked();
      toast.success("Success, you have claimed this listing");

    } catch (error) {
      console.error("Error sending verifying code", error);
      toast.error("Error sending verifying code, please ensure it's correct", { duration: 3000 });
    }
  }

  const [editClicked, setEditClicked] = useState(false);

  const [ownsListing, setOwnsListing] = useState(false);


  const [removeClicked, setRemoveClicked] = useState(false);


  /* 
  
  TODO: ownership rules
  In the future the logic will be:
  Once a listing is claimed then it's
  - copied as is to another table (for backup)
  - deleted from existing table
  - recreated with the current user being the owner
  In the future we will have a role based on email domain
  So that john and sarah @lawfirm can edit the same listings

  */
  const getOwnsListing = useCallback(async () => {
    try {
      if (user) {
        if (user.admin) {
          return setOwnsListing(true);
        }

        // TEST ONLY: This is to manually delete
        // const authUser = await Auth.currentAuthenticatedUser();
        // await Auth.deleteUserAttributes(authUser, ['custom:verifiedEmails']);

        // IF NOT CLAIMED THEY NEED TO CLAIM FIRST
        if (claimed) {

          const ownsCustomListing = await checkIfUserOwnsCustomListing();
          if (ownsCustomListing) {
            return setOwnsListing(true);
          }

          // TODO duplicate of code above, move out into single place
          const emailDomain = psl.parse(user.email.split("@")[1]).domain;
          const webDomain = getWebsiteDomain(lawyerDetails.site);

          const hasVerified = await checkIfUserHasVerifiedEmail(webDomain);

          if ((emailDomain === webDomain) || hasVerified) {
            setOwnsListing(true);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    getOwnsListing();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getOwnsListing]);

  const getRatingAndReview = () => {
    if(!lawyerDetails.reviews || lawyerDetails.reviews == ""
    || !lawyerDetails.rating || lawyerDetails.rating == ""){
      return {experience: "N/A", ratingLevel: "N/A"};
      
    }
    let ratingInt = null;
    let reviewsInt = null;
    try{
      ratingInt = parseFloat(lawyerDetails.rating);
      reviewsInt = parseFloat(lawyerDetails.reviews);
    }catch(e){
      return {experience: "N/A", ratingLevel: "N/A"};
    }
    
    if(reviewsInt === 0){
      return {experience: "N/A", ratingLevel: "N/A"};
    } else if(ratingInt == 5){
      return {experience: "EXCELLENT EXPERIENCE", ratingLevel: "EXCELLENT"};
    } else  if(ratingInt >= 4){
      return {experience: "EXCELLENT EXPERIENCE", ratingLevel: "VERY GOOD"};
    } else if (ratingInt >= 3){
      return {experience: "POSITIVE EXPERIENCE", ratingLevel: "GOOD"};
    } else if (ratingInt >= 2){
      return {experience: "MIXED EXPERIENCE", ratingLevel: "FAIR"};
    } else {
      return {experience: "POOR EXPERIENCE", ratingLevel: "POOR"};
    }
  }

  const { experience, ratingLevel } = getRatingAndReview();

  return (
    <>
      <Head>
        <title>
          {lawyerDetails.name} - {lawyerDetails.city.toUpperCase()}, {lawyerDetails.state.toUpperCase()} Lawyer Details | Advocat
        </title>
      </Head>

      <Box component="main"
        sx={{ flexGrow: 1, py: 1 }} >
        <Container maxWidth="md">

          <CustomBreadcrumb rootLabel="Home" />

          {ownsListing && <Box align="right"
            style={{ width: "100%" }}>
            <Button
              align="right"
              onClick={() => setEditClicked(!editClicked)}>
              {editClicked ? "CANCEL" : "EDIT"}
            </Button>
          </Box>}

          {/* {lawyerDetails.place_id} */}

          {/* {lawyerDetails.city} */}

          {editClicked && <LawyerCreateEdit
            lawyerdetails={lawyerDetails}
            router={router} />}


          {lawyerDetails.deleted || lawyerDetails.pending && (<>
            This listing is not longer available
            <br /><br />
            {user && user.admin && (<>
              You are an admin
              <Button onClick={() => reactivateListing()} >
                Reactivate this listing
              </Button>
            </>)}
          </>
          )}



          {(!editClicked && !lawyerDetails.deleted && !lawyerDetails.pending) &&
            <Grid container
              spacing={0} >
              <Grid
                item
                xs={12}
                lg={8}
                sx={{
                  paddingRight: "20px"
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <div>
                    <Typography variant="h3"
                      color="#FF5403">
                      {lawyerDetails.name}
                      {/* lawyerDetails.title ||  */}
                    </Typography>
                    <NextLink href={townLink} passHref>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 900, fontSize: "0.75em", pt: "10px" }}
                        color="#01023B"
                      >

                        <>
                          {lawyerDetails.city.toUpperCase()}, {lawyerDetails.state.toUpperCase()}
                        </>

                      </Typography>
                    </NextLink>
                  </div>
                </Box>

                <br />
                <Box sx={{ width: "40px", borderBottom: "2px solid #FF5403", margin: "15px 0" }}></Box>
                <br />





                {(premium || claimed) &&
                  // <Typography variant="body2"
                  //   sx={{ whiteSpace: "pre-wrap", color: "#01023B" }}>
                  <Box sx={{
                    pr: {
                      md: "40px"
                    }
                  }}>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: lawyerDetails.description }}>
                    </div>
                  </Box>
                  // {lawyerDetails.description ? lawyerDetails.description : <>
                  //   <strong>{lawyerDetails.name}</strong> is a <strong>{lawyerDetails.type}</strong> located in the city of <strong>{lawyerDetails.city}</strong> in {lawyerDetails.country}&apos;s <strong>{lawyerDetails.state}</strong>.
                  //   They have an average rating of <strong>{lawyerDetails.rating}</strong> out of <strong>{lawyerDetails.reviews}</strong> reviews.
                  //   <br /><br />
                  //   Areas of expertise:
                  //   <ul>
                  //     {
                  //       lawyerDetails.subtypes && lawyerDetails.subtypes.split(",").map(subtype =>
                  //         <li key={subtype}>{subtype}</li>)

                  //     }
                  //   </ul>

                  //   Accessibility:
                  //   <ul>
                  //     {
                  //       lawyerDetails.about && lawyerDetails.about.Accessibility ?
                  //         Object.keys(lawyerDetails.about.Accessibility).map(subtype =>
                  //           <li key={subtype + "2"}>{subtype}</li>)
                  //         : ""
                  //     }
                  //   </ul>
                  // </>}

                  // </Typography>
                }


                {(!premium && !claimed) && makemap()}
                <br />



              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
              >
                {/* <Button
                  onClick={() => setEditClicked(!editClicked)}>
                    {editClicked ? "CANCEL" : "EDIT"}
                  </Button> */}
                <LawyerSummary lawyer={lawyerDetails} claimListingClicked={claimListingClicked} />
              </Grid>

              {(!premium && !claimed) && <Box align="center"
                id="claim"
                sx={{
                  backgroundColor: "#01023B",
                  color: "white",
                  padding: "20px",
                  width: "100%",
                  borderRadius: "36px",
                  margin: "30px 0"
                }}>
                <Image
                  src="/avstatic/Advocat_symbol_light.png"
                  width={35}
                  height={40}
                /><br />
                <Typography
                  variant="subheading"
                >
                  Is this your lawyer or firm profile?
                </Typography>
                <br />

                {emailNotMatchDomain ? <div>
                  <Typography
                    color="inherit"
                    sx={{ mt: 1 }}
                    variant="subtitle2"
                  >


                    {verificationCodeSent ? <>

                      Please enter the verification code sent to {secondaryEmail} below.

                    </>
                      : <>

                        Your email domain <b>{emailDomain}</b> does not match the website domain <b>{webDomain}</b>.
                        <br />To claim this listing, please enter an email address ending with <b>{webDomain}</b>.
                        <br />To verify ownership of the email address, you must have access to its inbox to open the verification email.
                      </>}
                    <br />

                  </Typography>

                  {verificationCodeSent ?
                    <input onChange={e => setVerificationCode(e.target.value)}
                      value={verificationCode}
                      type="text" />
                    :
                    <input onChange={e => setSecondaryEmail(e.target.value)}
                      value={secondaryEmail}
                      type="text" />
                  }

                  <br />{emailError && <small> Email address does not match domain</small>}
                  <Box sx={{ mt: 2 }}>

                    {verificationCodeSent ? <Button
                      color="primary"
                      variant="contained"
                      onClick={() => verifySecondaryEmailCode()}
                    >
                      Send
                    </Button> :
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => verifySecondaryEmail()}
                      >
                        Send
                      </Button>
                    }

                    &nbsp; &nbsp;

                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleGotItClicked()}
                    >
                      Cancel
                    </Button>
                  </Box>
                </div> : <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => claimListingClicked()}
                  >
                    CLAIM PROFILE
                  </Button></>}


              </Box>}


              {/* </Grid> */}
            </Grid>
          }

        </Container>

        {(!editClicked && !lawyerDetails.deleted && !lawyerDetails.pending) &&
        <>
        
        {(premium || claimed) && <><br /><br /></>}
        
        <Box align="center" sx={{ backgroundColor: "#FF5403", width: "100%" }}>


          {/* <Box  maxWidth="md" sx={{backgroundColor: "red", p: 10}}> */}

          <Grid maxWidth="md" container spacing={0} sx={{ p: 8 }} >
            <Grid sx={{
              pb: {
                xs: 5,
                md: 5,
                lg: 0
              }
            }} item alignItems="center" justifyContent="space-between" direction="column" container xs={12} lg={4}>
              <Typography variant='h1' color="white">{lawyerDetails.reviews || 0}</Typography>
              <Box>
                <Typography fontWeight="bold" fontSize="0.8em" color="#01023B">REVIEWS</Typography>
                <Typography fontSize="1.1em" color="white">
                  {experience}
                </Typography>
              </Box>
            </Grid>
            <Grid item alignItems="center" justifyContent="space-between" direction="column" container xs={12} lg={4} sx={{
              '& .MuiRating-root': {
                color: "white"
              },
              pb: {
                xs: 5,
                md: 5,
                lg: 0
              }
            }}>
              <Rating
                sx={{ pt: 3 }}
                size="large"
                value={lawyerDetails.rating}
                readOnly
                precision={0.1}
              />
              <div style={{height: "30px"}}></div>
              <Box>
                <Typography fontWeight="bold" fontSize="0.8em" color="#01023B">RATING</Typography>
                <Typography fontSize="1.1em" color="white">{lawyerDetails.rating} - {ratingLevel}</Typography>
              </Box>
            </Grid>
            <Grid item alignItems="center" justifyContent="space-between" direction="column" container xs={12} lg={4}>
              {/* <table><tbody>
              <tr>
                <td> */}
              <Grid alignItems="center" sx={{pt: 3}}
                justifyContent="center" container spacing={1}>
                <Grid item><Image
                  src="/avstatic/PriceIcon4.png"
                  width={35}
                  height={35}
                /></Grid>
                {/* </td><td> */}
                <Grid item><Image
                  src="/avstatic/PriceIcon4.png"
                  width={35}
                  height={35}
                /></Grid>
                {/* </td><td> */}
                <Grid item><Image
                  src="/avstatic/PriceIcon4.png"
                  width={35}
                  height={35}
                /></Grid>
              </Grid>
              {/* </td>
              </tr>
              </tbody></table> */}
              <Box>
                <Typography fontWeight="bold" fontSize="0.8em" color="#01023B">PRICE</Typography>
                <Typography fontSize="1.1em" color="white">N/A</Typography>
              </Box>
            </Grid>
          </Grid>

        </Box>

        {(!claimed && !premium) && <><br /><br /></>}
        </>

            }



        <Container maxWidth="md">

          {(!editClicked && !lawyerDetails.deleted && !lawyerDetails.pending) &&
            <Grid container
              spacing={0} >




              {(premium || claimed) && <Box ref={bannerRef}
                align={(windowWidth <= 768) ? "left" : "center"}
                sx={{
                  background: '#F2F1EF',
                  position: '-webkit-sticky',
                  position: 'sticky',
                  top: navHeight,
                  paddingTop: '20px',
                  paddingBottom: (windowWidth <= 768) ? "5px" : "25px",
                  zIndex: 5,
                  width: '100%',
                  borderBottom: '1px solid #CCC',
                  '& .MuiButtonBase-root:hover': { color: "white" },
                  '& .MuiButtonBase-root:active': { backgroundColor: "#01023B", color: "white" }
                }}>

                <Typography
                  align={(windowWidth <= 768) ? "left" : "center"}
                  variant={(windowWidth <= 768) ? "h3" : "h3"}
                  color={(windowWidth <= 768) ? "#01023B" : "#FF5403"}
                  sx={{ paddingTop: "20px", paddingBottom: (windowWidth <= 768) ? "5px" : "20px", visibility: (visibleSection == null ? "hidden" : "visible") }}>
                  {lawyerDetails.name}
                </Typography>
                {(windowWidth <= 768) && <Box >
                  {/* align="left" */}
                  <FormControl sx={{ m: 2, '& .MuiOutlinedInput-notchedOutline': { border: "2px solid #01023B" } }}
                    align="left"
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="tabby"
                      value={subMenuTab}
                      name="tabby"
                      onChange={handleSubMenuChange}
                      size="small"
                    >
                      {sectionRefs.filter(s => {
                        // premium listings get all, claimed only see some
                        return premium ? true : !s.premium
                      }).map(s => <MenuItem sx={{ fontWeight: 900 }}
                        key={s.section}
                        value={s.section}>{s.section.toUpperCase()}</MenuItem>)}
                    </Select>
                  </FormControl>


                </Box>}


                {(windowWidth > 768) &&
                  <Box  >

                    {premium && <Button onClick={() => scrollTo(overviewRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Overview" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Overview" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      OVERVIEW
                    </Button>}
                    <Button onClick={() => scrollTo(servicesRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Services" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Services" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      SERVICES</Button>
                    {premium && <Button onClick={() => scrollTo(peopleRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "People" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "People" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      PEOPLE</Button>}
                    {premium && <Button onClick={() => scrollTo(accreditationsRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Accreditations" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Accreditations" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      ACCREDITATIONS</Button>}
                    <Button onClick={() => scrollTo(reviewsRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Reviews" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Reviews" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      REVIEWS</Button>
                    {premium && <Button onClick={() => scrollTo(feesRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "Fees" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "Fees" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      FEE GUIDE</Button>}
                    {premium && <Button onClick={() => scrollTo(faqRef.current)}
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: (visibleSection == "FAQ" ? "#01023B" : "transparent"), border: "2px solid #01023B", color: (visibleSection == "FAQ" ? "white" : "#01023B"), marginBottom: "10px", marginRight: "10px" }} >
                      FAQS</Button>}
                    <Button onClick={() => scrollTo(contactRef.current)}
                      color="secondary"
                      variant="contained"
                      size="small"
                      sx={{ marginBottom: "10px" }} >
                      CONTACT</Button>
                  </Box>

                }
              </Box>
              }

              {premium &&
                <LawyerOverview
                  overviewContainerRef={overviewContainerRef}
                  overviewRef={overviewRef}
                  headerHeight={getHeaderHeight()}
                  premiumOverview={lawyerDetails.premiumOverview}
                  type={lawyerDetails.type}
                  features={lawyerDetails.features}
                />}
              {(premium || claimed) && <LawyerServices
                servicesContainerRef={servicesContainerRef}
                servicesRef={servicesRef}
                headerHeight={getHeaderHeight()}
                premiumServices={lawyerDetails.premiumServices}
              />}
              {premium && <><LawyerPeople
                peopleContainerRef={peopleContainerRef}
                peopleRef={peopleRef}
                headerHeight={getHeaderHeight()}
                premiumPeople={lawyerDetails.premiumPeople}
              />
                <LawyerAccreditations
                  accreditationsContainerRef={accreditationsContainerRef}
                  accreditationsRef={accreditationsRef}
                  headerHeight={getHeaderHeight()}
                  premiumAccreditations={lawyerDetails.premiumAccreditations}
                />
              </>}

              <div style={{ position: "relative", width: "100%" }}
                ref={reviewsContainerRef}>
                <div id="reviews"
                  ref={reviewsRef}
                  style={{ position: "absolute", top: "-" + getHeaderHeight() + "px", left: 0 }}></div>
                <CompanyReviews
                  placeId={lawyerDetails.place_id}
                  reviews={lawyerDetails.reviews}
                  averageRating={lawyerDetails.rating}
                  reviewsPerScore={lawyerDetails.reviews_per_score}
                />

{(premium || claimed) ? <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} /> : <br />}
                
              </div>


              {premium && <>
                <LawyerFees
                  feesContainerRef={feesContainerRef}
                  feesRef={feesRef}
                  headerHeight={getHeaderHeight()}
                  premiumFees={lawyerDetails.premiumFees}
                />
                <LawyerFaq
                  faqContainerRef={faqContainerRef}
                  faqRef={faqRef}
                  headerHeight={getHeaderHeight()}
                  premiumFaqs={lawyerDetails.premiumFaqs}
                />
              </>}




              {(premium || claimed) && <Box sx={{ width: "100%" }}
                ref={contactContainerRef} >
                <br />
                <div style={{ position: "relative" }}>
                  <div id="contact"
                    ref={contactRef}
                    style={{ position: "absolute", top: "-" + getHeaderHeight() + "px", left: 0 }}></div>
                </div>
                <Typography variant="h3"
                  sx={{ pt: "20px" }}
                  color="#FF5403">
                  Contact
                </Typography><br /><Grid container
                  spacing={2}>

                  <Grid item
                    xs={12}
                    lg={4}>
                    <Box sx={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "36px",
                      padding: "20px"
                    }}>
                      <Typography
                        color="#01023B"
                        variant="h6"
                        sx={{
                          fontWeight: 900
                        }}
                      >
                        {lawyerDetails.name.toUpperCase()}
                      </Typography>
                      <Typography
                        color="#CCC"
                        variant="body2"
                      >
                        {lawyerDetails.type.toUpperCase()}
                      </Typography>
                      <br />
                      <Typography
                        color="#01023B"
                        variant="body2"
                      >
                        {lawyerDetails.category}
                      </Typography>
                      <br />
                      <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%" }} />
                      <br />
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
                        {lawyerDetails.full_address}
                      </Typography>
                      <br />
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
                        {lawyerDetails.phone}
                      </Typography>

                      <br />

                      <Box sx={{
                        '& .MuiButtonBase-root:hover': { color: "white" },
                      }}>
                        <Button

                          variant="contained"
                          sx={{
                            backgroundColor: "white",
                            border: "2px solid #01023B",
                            color: "#01023B",
                            marginBottom: "10px"
                          }}
                          href={lawyerDetails.site}
                          target="_blank"
                        >
                          VISIT WEBSITE
                        </Button>


                        {/* <br /> */}
                        {/* <br /> */}

                        {/* key name string much match file name e.g. [key].svg */}
                        {(["facebook", "instagram", "linkedin", "twitter"]).map(social => (
                          lawyerDetails[social] &&
                          // <div key={social}><a href={lawyerDetails[social]}><img alt={social}
                          //   src={`/icons/${social}.svg`} /></a>&nbsp;&nbsp;</div>

                          <><br /><Button

                            variant="contained"
                            sx={{
                              backgroundColor: "white",
                              border: "2px solid #01023B",
                              color: "#01023B",
                              marginBottom: "10px"
                            }}
                            href={lawyerDetails[social]}
                            target="_blank"
                          >
                            VISIT {social.toUpperCase()}
                          </Button></>


                        ))}

                        <br />
                        <Button
                          color="secondary"
                          variant="contained"
                          href={`mailto:${lawyerDetails.email_1}`}
                        >
                          CONTACT
                        </Button>
                      </Box>


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

                      {/* 

                      {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).map(day => (
                        <Box
                          key={day}
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            // mt: 1
                          }}>
                          <Typography variant="body2">
                            {day}
                          </Typography>
                          <div style={{ width: "10px" }}></div>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            {lawyerDetails.working_hours && lawyerDetails.working_hours[day]}
                          </Typography>
                        </Box>

                      ))} */}

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
                                {lawyerDetails.working_hours && lawyerDetails.working_hours[day]}
                              </Typography>
                            </td>

                          </tr>

                          // </Box>

                        ))}
                      </tbody></table>

                    </Box>
                  </Grid>

                  <Grid item
                    xs={12}
                    lg={8}>
                    {makemap()}
                  </Grid>

                </Grid><br /><br /></Box>}


            </Grid>
          }
        </Container>
      </Box>
    </>
  )
};

export default LawyerName;


export async function getServerSideProps({ params, res }) {
  const townName = params.townName;
  const lawyerName = params.lawyerName;
  // const postcode = params.postcode;
  const stateShort = postcodeApi.getShortState(params.state);


  const results = await postcodeApi.getTown(townName, stateShort);

  let lawyerDetails = null;

  const url_key = `${results.postcode}:::-:::${townName}:::-:::${lawyerName}`;
  const updatedProviderListingRaw = await API.graphql({
    query: listingsByUrlKey,
    variables: {
      url_key,
      filter: { pending: { ne: true }, deleted: { ne: true } },
    },
    authMode: 'API_KEY',
  });

  lawyerDetails = updatedProviderListingRaw.data.listingsByUrlKey.items[0];

  console.log(JSON.stringify(lawyerDetails))

  return {
    props: {
      town: results, lawyerName, lawyerDetails
    }
  }
}

const MyMap = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref}
        style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const MyMarker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback,
  dependencies
) {
  useEffect(callback, [callback, dependencies.map(useDeepCompareMemoize)]);
}

LawyerName.getLayout = (page) => <MainLayout>{page}</MainLayout>;
