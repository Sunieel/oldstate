import Head from 'next/head';
import { Box, Card, Container, Divider, Typography, Grid } from '@mui/material';
import { postcodeApi } from '../../../__fake-api__/postcodes-api';
// import { lawyerApi } from '../../../../__fake-api__/lawyers-api';
import lawyerTypes from '../../../__fake-api__/lawyer-types.json';
import { CustomBreadcrumb } from '../../../components/custom-breadcrumb';
import { forUrl, forDisplay } from '../../../utils/text-normaliser';
import { Wrapper } from "@googlemaps/react-wrapper";
import { googleConfig } from '../../../config';
import { createCustomEqual } from "fast-equals";
import { useEffect, useState, useRef, Children, isValidElement, cloneElement, useCallback, isMounted } from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import NextLink from 'next/link';
import { MainLayout } from '../../../components/main-layout';
import { LawyerBox } from '../../../components/lawyers/lawyer-box';
import { listingsByPostCode } from '../../../graphql/queries';
import {TownHero} from '../../../components/town/town-hero';
import {HomeSearch} from '../../../components/home/home-search';
import {HomeServices} from '../../../components/home/home-services';
import { TownForLawyers } from '../../../components/town/for-lawyers';
import {TownStats} from '../../../components/town/town-stats';
import {SearchFilter} from '../../../components/town/search-filters';
const axios = require('axios').default;
import { API, graphqlOperation } from 'aws-amplify';
import { gtm } from '../../../lib/gtm';

import { Amplify } from 'aws-amplify';
import awsExports from '../../../aws-exports';
Amplify.configure(awsExports);



    // convert sentence to Proper case
    const toProperCase = (str) => {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    

const Towns = ({ town, absData }) => {
  const [clicks, setClicks] = useState();
  const [zoom, setZoom] = useState(16); // initial zoom
  const markerPosition = town ? {
    lat: town.Lat_precise,
    lng: town.Long_precise,
  } : null;
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  //  console.log(town);
  // const filterLawyerTypes = () => {
  //   const lt = lawyers.map((lawyer) => {
  //     // console.log("LAWYER",lawyer);
  //     // if(lawyer.specialization && lawyer.specialization.length >0 ) {
  //       let currLawyertypes = [];
  //       if (lawyer.subtypes){
  //         const lawyerType =  lawyer.subtypes.split(', ');
  //         const types = lawyerTypes.map(item => item.cat);
  //         currLawyertypes = lawyerType.filter((el => types.includes(el)));
  //       }
  //       if (currLawyertypes.length > 0)  {
  //         // console.log("LAWYER TYPE",currLawyertypes);
  //         return currLawyertypes;
  //       }
  //   });
  //   const uniqueLawyerTypes = [...new Set(lt.flat())];


  //   return uniqueLawyerTypes.filter(el => (el && el !== '' ));    
  // }

  // const townLawyersTypes = filterLawyerTypes();

  // const categorisedLawyers = (types) => {
  //   const catLawyers = [];
  //   types.forEach((type) => {
  //     const lawyersInType = lawyers.filter((lawyer1) => {
  //       if (lawyer1.subtypes && lawyer1.subtypes.includes(type)) {
  //         return lawyer1;
  //       }
  //     });
  //     catLawyers.push({type, lawyersInType});
  // });

  // return catLawyers;

  // }
  // const categorisedTownLawyers = categorisedLawyers(townLawyersTypes);

  const [center, setCenter] = useState(markerPosition);
// console.log(absData);
// console.log(town);
  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter());
  };

  // not Male, or Female, just People
  const personKeys = absData && absData.populationByPostCode ? Object.keys(absData.populationByPostCode)
    .filter(key => key.endsWith("Persons")) : [];

  const totalPeople = absData && absData.populationByPostCode ? personKeys
    .map(key => absData.populationByPostCode[key])
    .reduce((total = 0, val) => total += val) : null;

  const people60AndOver = absData && absData.populationByPostCode ? personKeys
    .filter(key =>
      key.startsWith("100")
      || parseInt(key.split("-")[0]) >= 60
    )
    .map(key => absData.populationByPostCode[key])
    .reduce((total = 0, val) => total += val) : null;

    const townName = toProperCase(town ? forDisplay(town.locality) : "your area");
    const postcode = town ? town.postcode : "your postcode";
    


  return (
    <>
      <Head>
        <title>
          Lawyers in {townName} | Advocat
        </title>
      </Head>
      <TownHero townName={townName} />
      {/* <Box>
      <CustomBreadcrumb  />
  lawyer results goes here<br />
  <br />
  <br />

</Box> */}
<SearchFilter townName={townName} 
state={town.state} />
<HomeSearch townName={townName} />
<HomeServices townName={townName} />
<TownForLawyers townName={townName} />
<TownStats townName={townName} 
town={town} 
postcode={postcode}
absData={absData} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="lg">
            <Wrapper apiKey={googleConfig.mapsApiKey}
              render={render} >
              <MyMap style={{ flexGrow: "1", height: "600px", width: "100%" }}
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}>
                {/* {lawyers.map((l, i) => (
                <MyMarker 
                  position={{lat:l.latitude,lng:l.longitude}} 
                  key={i} 
                />
       
              ))} */}

              </MyMap>
            </Wrapper>
         

        </Container>
      </Box>
    </>
  )
};

Towns.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Towns;

// // PAGINATES ALL RESULTS
// const fetchListingsByPostcode = async (state, townName, lastResults = [], nextToken = null) => {
//   const city_key = `${state}:::-:::${townName}`
//   const updatedProviderListingRaw = await API.graphql({
//     query: listingsByCityKey,
//     variables: {
//       city_key,
//       filter: {
//         pending: { ne: true },
//         deleted: { ne: true },
//         // subtypes: { contains: selectedCategory },
//       },
//       // limit: 9,
//       // sortDirection,
//       nextToken
//     },
//     authMode: 'API_KEY',
//   });
//   let allResults = lastResults.concat(updatedProviderListingRaw.data.listingsByPostCode.items);
//   // TODO working hours not working
//   const token = updatedProviderListingRaw.data.listingsByPostCode.nextToken;
//   if(token){
//     return await fetchListingsByPostcode(postcode, townName, allResults, token);
//   } 
//   return allResults;
// }

// const getMin10Results = async (
//   city_key,
//   selectedCategory,
//   previousResults = [],
//   nextToken = null) => {

//   let sortDirection = null;
//   let query = null;
//   if(selectedSortType == "rating"){
//     query = listingsByCityKeyAndRating;
//     sortDirection = "DESC";
//   } else {
//     query = listingsByCityKey;
//     sortDirection = "ASC";
//   }


//   const raw = await API.graphql({
//     query,
//     variables: {
//       city_key,
//       filter: {
//         pending: { ne: true },
//         deleted: { ne: true },
//         subtypes: { contains: selectedCategory },
//       },
//       // limit: 9,
//       sortDirection,
//       nextToken
//     },
//     authMode: 'API_KEY',
//   });

// }

export async function getStaticProps({ params }) {
  const townName = params.townName;
  const state = params.state;
  // const postcode = params.postcode;
  const town = await postcodeApi.getTown(townName, state);


  // TODO do a paginated search at run time?
  // That way it's realtime results
  // const lawyers = await fetchListingsByPostcode(postcode, townName);
  let absData = null;
  try {
    absData = require('../../../__fake-api__/abs-scrapper/results/' + town.postcode + '.json')
  } catch (error) {
    console.error(`ERROR GETTING ABS DATA for ${state} ${townName} ${town ? town.postcode : "postcode:unknown"}`)
  }


  // const lawyers = [];

  return {
    props: {
      absData,
      town: town || null,
      // lawyers, lawyerTypes
    }
  }
}

export async function getStaticPaths() {
  const towns = await postcodeApi.getTowns();
  const paths = towns.map(town => {
    const townName = forUrl(town.locality);
    const state = forUrl(town.state);
    return { params: { state, townName } };
  });
  // console.log(paths);
  return {
    paths,
    fallback: false
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
  useEffect(callback, [callback, ...dependencies.map(useDeepCompareMemoize)]);
}

// window.addEventListener("DOMContentLoaded", () => {
//   const root = createRoot(document.getElementById("root"));
//   root.render(<App />);
// });