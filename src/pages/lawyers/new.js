
import Head from 'next/head';
import { MainLayout } from '../../components/main-layout';
import { Box, Container, Button } from '@mui/material';
import { CustomBreadcrumb } from '../../components/custom-breadcrumb';
import { LawyerCreateEdit } from '../../components/lawyers/lawyer-create-edit';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { gtm } from '../../lib/gtm';
import { useEffect } from 'react';


// import { forUrl } from '../../utils/text-normaliser';
// import { API } from 'aws-amplify';
// import { updateUpdatedProviderListing } from '../../graphql/mutations';
// import { postcodeApi } from '../../__fake-api__/postcodes-api';


//  // DB migration stuff.
// const testAllUploads = async () => {

//     const items = [

      
//       // "6000.json","6001.json","6003.json","6004.json","6005.json","6006.json","6007.json","6008.json","6009.json","6010.json","6011.json","6012.json","6014.json","6015.json","6016.json","6017.json","6018.json","6019.json","6020.json","6021.json","6027.json","6030.json","6037.json","6050.json","6051.json","6052.json","6053.json","6054.json","6056.json","6057.json","6061.json","6062.json","6064.json","6065.json","6066.json","6067.json","6069.json","6076.json","6090.json","6100.json","6101.json","6102.json",
//       "6104.json","6105.json","6106.json","6107.json","6108.json","6109.json","6110.json","6111.json","6112.json","6121.json","6122.json","6125.json","6147.json","6148.json","6149.json","6150.json","6151.json","6152.json","6153.json","6154.json","6155.json","6156.json","6157.json","6158.json","6159.json","6160.json","6162.json","6163.json","6164.json","6165.json","6166.json","6167.json","6168.json","6169.json","6170.json","6171.json","6172.json","6173.json","6174.json","6175.json","6176.json","6181.json","6208.json","6210.json","6214.json","6230.json","6231.json","6232.json","6280.json","6281.json","6330.json","6332.json","6430.json","6432.json","6530.json","6721.json","6722.json","6831.json","6923.json","6991.json"


//     ]
//     console.log(items.length +" to do");
//   items.map(pc => testUpload(pc).then(() => console.log("DONE")));
// }
// const testUpload = async postcode => {
//   try {
//     // const base = "../../__fake-api__/lawyers-by-postcode/";
//     // const postcode = "0812";
//     // const fileName = base+postcode+".json"
//     const testLawyers = require("../../__fake-api__/lawyers-by-postcode/"+postcode);
//     let allSaves = [];
//     let allFails = [];
//     testLawyers.forEach((testLawyer, index) => {

//       // // For when creating
//       // if(testLawyer.about){
//       //   testLawyer.about = JSON.stringify(testLawyer.about);
//       // }
//       // if(testLawyer.reviews_per_score){
//       //   testLawyer.reviews_per_score = JSON.stringify(testLawyer.reviews_per_score);
//       // }
//       // if(testLawyer.working_hours == ""){
//       //   testLawyer.working_hours = null;
//       // }

//       // For when updating
//       // const nameForUrl = forUrl(testLawyer.name);
//       const townForUrl = forUrl(testLawyer.city);
//       const stateForUrl = forUrl(testLawyer.state);

//       const stateShort = postcodeApi.getShortState(stateForUrl);
//       const stateShortForUrl = forUrl(stateShort);

//       const stateChange = (stateForUrl !== stateShortForUrl);

//       const ratingChange = testLawyer.rating == "" || testLawyer.rating == null || testLawyer.rating == undefined;

//       const modifiedLawyer = {
//         place_id: testLawyer.place_id,
//       }

//       if(stateChange){
//         modifiedLawyer["city_key"] = `${stateShortForUrl}:::-:::${townForUrl}`;
//       }

//       if(ratingChange){
//         modifiedLawyer.rating = "0";
//       }

//       if(stateChange || ratingChange){
      
    

//       allSaves.push(API.graphql({
//         query: updateUpdatedProviderListing,
//         // query: createUpdatedProviderListing,
//         variables: { input: modifiedLawyer },
//         // variables: { input: testLawyer },
//         authMode: 'AMAZON_COGNITO_USER_POOLS',
//       }).catch(e => {
//         console.error(e);
//         allFails.push({postal_code: testLawyer.postal_code, index})
//       }));

//     }

//     });
//     await Promise.all(allSaves);
//     // toast("uploaded");
//     if(allFails.length > 0){
//       console.log(`FAILS FOR ${postcode}: ${allFails.length} --- SUCCESSES FOR ${postcode}: ${testLawyers.length - allFails.length}`);
//     }

//     // console.log(`SUCCS FOR ${postcode}: ${testLawyers.length - allFails.length}`);
//   }catch(error){
//     // toast.error("failed")
//     console.error(error);
//   } finally{
//     return true;
//   }

// }

const NewLawyerListing = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (<>


    <Head>
      <title>
        Lawyer Details | Advocat
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >

      <Container maxWidth="md">


        <CustomBreadcrumb rootLabel="Home" />
        {/* <Card>
      <CardContent> */}

        {/* <Button onClick={testAllUploads}>TEST UPLOAD</Button> */}
        <LawyerCreateEdit />

      </Container>
    </Box>
  </>
  );
};

export default NewLawyerListing;

NewLawyerListing.getLayout = (page) => <AuthGuard><MainLayout>{page}</MainLayout></AuthGuard>;
