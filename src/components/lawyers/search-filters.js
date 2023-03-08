import * as React from 'react';
import { Autocomplete, Grid, Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Checkbox, Divider, OutlinedInput, InputAdornment, IconButton, FormControlLabel, FormGroup } from '@mui/material';
import lawyerTypes from '../../__fake-api__/lawyer-types.json';
import { ChevronDown as ArrowDownIcon } from '../../icons/chevron-down';
// import { ChevronRightOutlined } from '@mui/icons-material';
import towns from '../../__fake-api__/postcode-list.json';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import { useState } from 'react';
import { forUrl } from '../../utils/text-normaliser';
import { roundToNearestMinutes } from 'date-fns';

import { postcodeApi } from '../../__fake-api__/postcodes-api';

import { LawyerBox } from '../../components/lawyers/lawyer-box'

import { API, Amplify } from 'aws-amplify';
// import { listingsByUrlKey } from '../../../../../graphql/queries';
import { listingsByCityKey, listingsByCityKeyAndRating, listingsByMembership } from '../../graphql/queries';

import { useRouter } from 'next/router';

import { useMounted } from '../../hooks/use-mounted';

import awsExports from '../../aws-exports';
import { LoadingButton } from '@mui/lab';
Amplify.configure(awsExports);

const CssTextField = styled(TextField)({
  root: {
    '& label.Mui-focused': {
      color: 'white',
      borderRadius: '36px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
      borderRadius: '36px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: '36px',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'yellow',
      },
    },
  },
});

const LISTBOX_PADDING = 8; // px


function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key}
        component="div"
        style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li"
      {...dataSet[0]}
      noWrap
      style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref}
    {...props}
    {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});



export const SearchFilter = (props) => {
  // const types = lawyerTypes.map(type => type.cat);
  const lawyerTypeHeadings = lawyerTypes.map(l => l.heading)
    .filter((v, i, s) => s.indexOf(v) === i);

  const router = useRouter();
  const queryParams = router.query;

  const convertToURL = (town, cat) => {
    // explode town string
    const townArray = town.split(", ");
    const url = `/lawyers/${forUrl(townArray[2])}/${forUrl(townArray[0])}#${forUrl(cat)}`;
    return url;

  }

  const [locality, setLocality] = useState('');
  const [url, setUrl] = useState('/lawyers');

  const handleSelectChange = (value) => {
    setLocality(value);
    console.log(value, cat);
    const tempurl = convertToURL(value, cat);
    setUrl(tempurl);
  }

  // const townList = towns.map(town => town.locality + ", " + town.postcode + ", " + town.state).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

  const sortTypes = [
    'name', 'rating'
  ]

  const [doFreshSearch, setDoFreshSearch] = useState(true);

  const [searchResults, setSearchResults] = useState([]);

  const [nextToken, setNextToken] = useState(null);
  const [nextTokens, setNextTokens] = useState([]);


  const [searchClicked, setSearchClicked] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedSortType, setSelectedSortType] = useState(null);

  const [townList, setTownList] = useState([]);

  const fullStates = postcodeApi.getStatesSync();
  const allStates = fullStates.map(s => s.short);

  const setSortType = (_, value) => {
    setSelectedSortType(value);
    setDoFreshSearch(searchClicked);
  }

  const [searchSurrounding, setSearchSurrounding] = useState(false);
  const [cityKeys, setCityKeys] = useState([]);

  const handleSearchSurroundingChange = (event) => {
    setSearchSurrounding(event.target.checked);
    setDoFreshSearch(searchClicked);
  };

  const [allCategoryList, setAllCategoryList] = useState([]);

  const setCategory = (_, value) => {
    setSelectedCategory(value);
    const matchingCats = lawyerTypes.filter(v => v.heading === value).map(v => v.cat);
    setAllCategoryList(matchingCats);
    console.log(matchingCats);
    setDoFreshSearch(searchClicked);
  }

  const setTown = (_, value) => {
    setSelectedTown(value);
    setDoFreshSearch(searchClicked);
  }

  const setState = (_, value) => {
    setSelectedState(value);
    // setTownList(postcodeApi.getTownsInState(value).map(t => t.l));
    setTownList(postcodeApi.getTownsInState(value).map(town => town.l + ", " + town.p + ", " + value).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase())));
    setDoFreshSearch(searchClicked);
  }


  const getPremiumResults = async (
    city_key,
    selectedCategory,
    previousResults = [],
    nextToken = null
  ) => {

    let sortDirection = null;
    let query = listingsByMembership;
    // if (selectedSortType == "rating") {
    //   query = listingsByCityKeyAndRating;
    //   sortDirection = "DESC";
    // } else {
    //   query = listingsByCityKey;
    //   sortDirection = "ASC";
    // }

    const filter = {
      pending: { ne: true },
      deleted: { ne: true },
      // THIS IS EXCLUDING XYZ LAWYERS (demo only)
      place_id: { ne: "custom.d6109539-32c7-4ba0-926d-4cc1caabdaca" },
      city_key: { eq: city_key }
      // membership: {eq: "premium"}
    }

    // TODO do we want to apply this to premium?
    // if(selectedCategory){
    //   filter.subtypes = { contains: selectedCategory };
    // }

    if (selectedCategory && allCategoryList && allCategoryList.length > 0) {
      // filter.subtypes = { contains: selectedCategory };
      const subTypeFilters = allCategoryList.map(c => ({ subtypes: { contains: c } }))
      filter.and = { or: subTypeFilters };
    }

    const raw = await API.graphql({
      query,
      variables: {
        membership: "premium",
        // city_key,
        filter,
        limit: 9,
        sortDirection,
      },
      nextToken,
      authMode: 'API_KEY',
    });


    let results = null;
    let newNextToken = null;
    // if (selectedSortType == "rating") {
    //   results = previousResults.concat(raw.data.listingsByCityKeyAndRating.items);
    //   newNextToken = raw.data.listingsByCityKeyAndRating.nextToken;
    // } else {
    //   results = previousResults.concat(raw.data.listingsByCityKey.items);
    //   newNextToken = raw.data.listingsByCityKey.nextToken;
    // }

    results = previousResults.concat(raw.data.listingsByMembership.items);
    newNextToken = raw.data.listingsByMembership.nextToken;

    // TODO eventually when there are many premiums
    // this must be revised 

    if (results.length < 9 && newNextToken) {
      console.log(`PREMIUM results.length is ${results.length} and nextToken ${newNextToken ? "exists" : "doesn't exist"} - so getting more`)
      return await getPremiumResults(city_key, selectedCategory, results, newNextToken)
    }
    console.log(`PREMIUM results.length is ${results.length} and nextToken ${newNextToken ? "exists" : "doesn't exist"} - so returning`)
    return { results, nextToken: newNextToken }
  }


  const getMin10Results = async (
    city_key,
    selectedCategory,
    previousResults = [],
    nextToken = null,
    more = false) => {

    let sortDirection = null;
    let query = null;
    if (selectedSortType == "rating") {
      query = listingsByCityKeyAndRating;
      sortDirection = "DESC";
    } else {
      query = listingsByCityKey;
      sortDirection = "ASC";
    }

    const filter = {
      pending: { ne: true },
      deleted: { ne: true },
    }


    // const t = {
    //   deleted: {ne: true}, 
    //   pending: {ne: true}, 
    //   and: {
    //     subtypes: {contains: "hi"}, 
    //     or: {subtypes: {contains: "bye"}}
    //   }}

    // const t = {
    //   deleted: {ne: true}, 
    //   pending: {ne: true}, 
    //   and: {
    //     or: [
    //       {subtypes: {contains: "Conveytancer"}}, 
    //       {subtypes: {contains: "Solicitor"}}
    //     ]
    //   }
    // }

    if (selectedCategory && allCategoryList && allCategoryList.length > 0) {
      // filter.subtypes = { contains: selectedCategory };
      const subTypeFilters = allCategoryList.map(c => ({ subtypes: { contains: c } }))
      filter.and = { or: subTypeFilters };
    }

    // console.log("GETTING FOR KEY", city_key, "with token", nextToken ? "exists": "empty");
    const raw = await API.graphql({
      query,
      variables: {
        city_key,
        filter,
        limit: 9,
        sortDirection,
        nextToken
      },
      authMode: 'API_KEY',
    });

    // raw.data.listingsByCityKeyAndRating.items

    let results = null;
    let newNextToken = null;
    if (selectedSortType == "rating") {

      // console.log("BEFORE DEDUPE", raw.data.listingsByCityKeyAndRating.items.length);

      // DEDUPE
      let deduped = raw.data.listingsByCityKeyAndRating.items.filter(i => 
        !previousResults.find(pr => pr.place_id === i.place_id));
      
      // ISSUE WITH STATE
      // NEED TO IGNORE searchResults IF IT'S A FRESH SEARCH
      if(more){
        deduped = deduped.filter(i => 
          !searchResults.find(pr => pr.place_id === i.place_id));
      }

      // console.log("AFTER DEDUPE", deduped.length);
      // console.log("PREVIOUS RESULTS: "+previousResults.map(r => r.name).join(", "))
      // console.log("PREVIOUS NAMES: "+searchResults.map(r => r.name).join(", "))
      // console.log("NEW NAMES: "+deduped.map(r => r.name).join(", "))

      results = previousResults.concat(deduped);
      // results = previousResults.concat(raw.data.listingsByCityKeyAndRating.items);
      newNextToken = raw.data.listingsByCityKeyAndRating.nextToken;
    } else {

      // console.log("BEFORE DEDUPE", raw.data.listingsByCityKey.items.length);


      // DEDUPE
      let deduped = raw.data.listingsByCityKey.items.filter(i => 
        !previousResults.find(pr => pr.place_id === i.place_id))
      
      // ISSUE WITH STATE
      // NEED TO IGNORE searchResults IF IT'S A FRESH SEARCH
      if(more){
        deduped = deduped.filter(i => 
          !searchResults.find(pr => pr.place_id === i.place_id));
      }
      // console.log("PREVIOUS RESULTS: "+previousResults.map(r => r.name).join(", "))
      // console.log("PREVIOUS NAMES: "+searchResults.map(r => r.name).join(", "))
      // console.log("NEW NAMES: "+deduped.map(r => r.name).join(", "))

      // console.log("AFTER DEDUPE", deduped.length);

      results = previousResults.concat(deduped);
      // results = previousResults.concat(raw.data.listingsByCityKey.items);
      newNextToken = raw.data.listingsByCityKey.nextToken;
    }

    if (results.length < 9 && newNextToken) {
      console.log(`results.length is ${results.length} and nextToken ${newNextToken ? "exists" : "doesn't exist"} - so getting more`)
      return await getMin10Results(city_key, selectedCategory, results, newNextToken, more)
    }
    console.log(`results.length is ${results.length} and nextToken ${newNextToken ? "exists" : "doesn't exist"} - so returning`)
    return { results, nextToken: newNextToken }
  }


  const expandedGet10Results = async (
    nearbyCityKeys,
    selectedCategory,
    previousResults = [],
    nextTokens = [], 
    more = false) => {
    // const nearbyCityKeys = postcodeApi.getNearbyTowns(selectedTown.split(", ")[0], selectedTown.split(", ")[2], "SA3_NAME_2016");
    // loop through keys and get results
    let results = [];
    let newNextTokens = [];
    console.log("nextTokens", nextTokens);
    // console.log("nearbyCityKeys", nearbyCityKeys);
    console.log("nearbyCityKeys", nearbyCityKeys);
    // dodgy hack to stop it from looping through all the keys and starting again
    // if (!(nearbyCityKeys.length === 1 && !nextTokens[0])) {

      for (let i = 0; i < nearbyCityKeys.length; i++) {
        const key = nearbyCityKeys[i];
        console.log("nextTokens[i]", nextTokens[i]);
        const theNextToken = nextTokens[i] === undefined ? null : (nextTokens[i] !== undefined ? nextTokens[i] : "stop");
        // const theResults = results === [] ? [] :(results[i] !== null ? results[i] : []);
        //TODO token is not working - creates infinite loop
        // if(theNextTokens === null && nextTokens[i] !== null){
        console.log(`getting results for ${key} with nextToken ${theNextToken}`);
        if (theNextToken !== "stop" || theNextToken === null) {
          const theSearch = await getMin10Results(key, selectedCategory, results[i] || [], nextTokens[i], more);
          if (results[i] === undefined) {
            results[i] = theSearch.results;
          } else {
            results[i] = results[i].concat(theSearch.results);
          }
          newNextTokens[i] = theSearch.nextToken;
        }

        // }
      }

    // }
          // loop through results and keys and remove ones with null or undefined newnextToken
      // if (newNextTokens.length > 0) {
        const filteredKeys = nearbyCityKeys.filter((k, i) => newNextTokens[i] && newNextTokens[i] !== 'stop');
        const filteredNextTokens = newNextTokens.filter((t, i) => newNextTokens[i] && newNextTokens[i] !== 'stop');
        // //unique filteredKeys
        // filteredKeys = [...new Set(filteredKeys)];
        // //unique filteredNextTokens
        // filteredNextTokens = [...new Set(filteredNextTokens)];
        console.log("filteredKeys", filteredKeys)
        console.log("filteredNextTokens", filteredNextTokens)
        // setCityKeys(filteredKeys);
    // }
    // if (results.length < 9) {
    //   console.log("filteredResults.length < 9 so getting more");
    //   const moreResults = await expandedGet10Results(filteredKeys, selectedCategory, results, filteredNextTokens);
    //   let flatResults = moreResults.results.flat();
    //   // sort results
    //   flatResults = flatResults.sort((a, b) => {
    //     if (selectedSortType == "rating") {
    //       return b.rating - a.rating;
    //     } else {
    //       return a.name.localeCompare(b.name);
    //     }
    //   });
    // }
    // flatten results
    console.log("EXPANDED RESULTS", results);
    let flatResults = results.flat();

    flatResults = previousResults.concat(results.flat()); 

    // sort results
    flatResults = flatResults.sort((a, b) => {
      if (selectedSortType == "rating") {
        return b.rating - a.rating;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    // if (flatResults.length < 9 && newNextTokens.some(t => t !== null)) {
    //   // get more results
    //   return await expandedGet10Results(nearbyCityKeys, selectedCategory, results, newNextTokens);
    // }
    return { results: flatResults, nextTokens: filteredNextTokens, nextCities: filteredKeys };
  }


  const [moreLoading, setMoreLoading] = useState(false);

  const [searchValidationError, setSearchValidationError] = useState(false);

  const editSearch = async () => {
    if (!selectedState || !selectedTown) {
      setSearchValidationError(true);
      return;
    }
    const queryParams = {}
    if (selectedCategory) {
      queryParams.category = selectedCategory;
    }
    const townSplit = selectedTown.split(", ");
    queryParams.state = selectedState;
    queryParams.town = selectedTown; // + ", " + selectedState;
    const qs = new URLSearchParams(queryParams).toString();
    // return '/lawyers?'+qs;
    router.push('/lawyers?' + qs)
    return await doSearch();
  }


  const [extraSearchResults, setExtraSearchResults] = useState([]);

  // const updateCityKeys = (selectedTown) => {
  //   const nearbyCityKeys = postcodeApi.getNearbyTowns(selectedTown.split(", ")[0], selectedTown.split(", ")[2], "SA3_NAME_2016");
  //   setCityKeys(nearbyCityKeys);
  // }

  const doSearch = async (more) => {

    if (!selectedState || !selectedTown) {
      setSearchValidationError(true);
      return;
    } else {
      setSearchValidationError(false);
    }

    setSearchClicked(true);

    // fucking state won't set
    let nearbyCityKeys = cityKeys;

    if (!more) {
      setLoading(true);
      setNextToken(null);
      setNextTokens([]);
      setSearchResults([]);
      setExtraSearchResults([]);

      if (searchSurrounding) {
        console.log("searchSurrounding is true, setting city keys", selectedTown);
        nearbyCityKeys = postcodeApi.getNearbyTowns(selectedTown.split(", ")[0], selectedTown.split(", ")[2], "SA3_NAME_2016");
        setCityKeys(nearbyCityKeys);
      }

    } else {
      setMoreLoading(true);
    }

    const townSplit = selectedTown.split(", ");
    const extractedTown = townSplit[0];
    const extractedPostcode = townSplit[1];

    console.log(selectedState);
    console.log(selectedTown);
    console.log(extractedTown);
    console.log(extractedPostcode);
    console.log(selectedCategory);
    console.log(selectedSortType);

    // TODO change to short name after data sanitisation
    // const stateLongName = fullStates.find(s => s.short === selectedState).long;

    // console.log(stateLongName);

    const townForUrl = forUrl(extractedTown);
    // const stateForUrl = forUrl(stateLongName);
    const stateForUrl = forUrl(selectedState);

    console.log(stateForUrl);

    const city_key = `${stateForUrl}:::-:::${townForUrl}`;

    // console.log(city_key);

    let results = [];
    // if (more ) {

    if (more && extraSearchResults.length > 9) {

      const firstNine = extraSearchResults.slice(0, 9);
      const extraResults = extraSearchResults.slice(9, extraSearchResults.length);

      console.log("MORE THAN 9 EXTRAS, taking 9 and saving " + extraResults.length);
      // console.log("NAME OF EXTRAS " + extraResults.map(r => r.name).join(", "));

      setExtraSearchResults(extraResults);

      results.results = more ? searchResults.concat(firstNine) : firstNine;

      // maintain old token
      results.nextToken = nextToken;

    } else {

      const previousy = [];
      if (more && extraSearchResults.length > 0) {
        previousy = extraSearchResults;
        console.log("SOME EXTRAS, taking " + previousy.length);
        // console.log("NAME OF EXTRAS " + previousy.map(r => r.name).join(", "));
        setExtraSearchResults([]);
      }

      if(previousy.length < 9 && (!more || (more && (nextToken || (nextTokens && nextTokens.length > 0))))){
        // TODO - stop it from getting looping again when there are no more results when using expandedGet10Results
        if (searchSurrounding) {
          // const nearbyCityKeys = postcodeApi.getNearbyTowns(selectedTown.split(", ")[0], selectedTown.split(", ")[2], "SA3_NAME_2016");
          
          // nearbyCityKeys
          results = await expandedGet10Results(nearbyCityKeys, selectedCategory, previousy, more ? nextTokens : [], more);
        } else {
          results = await getMin10Results(city_key, selectedCategory, previousy, more ? nextToken : null, more);
        }
      } else {
        results = {
          results: previousy,
        }
      }

      if (results.results.length > 9) {
        const firstNine = results.results.slice(0, 9);
        const extraResults = results.results.slice(9, results.results.length);

        console.log("MORE THAN 9 RESULTS, taking 9 and saving " + extraResults.length);
        // console.log("NAME OF EXTRAS " + extraResults.map(r => r.name).join(", "));

        setExtraSearchResults(extraResults);
        results.results = more ? searchResults.concat(firstNine) : firstNine;
      } else {
        console.log("NOT ENOUGH");
        results.results = more ? searchResults.concat(results.results) : results.results;
      }


    }
    // } else {
    //   // TODO get premium results here
    //   const premiumResults = await getPremiumResults(city_key, selectedCategory);
    //   results = await getMin10Results(city_key, selectedCategory);

    const premiumResults = { results: [] };

    if (!more) {
      premiumResults = await getPremiumResults(city_key, selectedCategory);
    }

    results.results = premiumResults.results.concat(results.results);
    // }


    setNextToken(results.nextToken);
    setNextTokens(results.nextTokens);

    setCityKeys(results.nextCities);

    // console.log(results)
    setSearchResults(results.results);

    if (!more) {
      setLoading(false);
    } else {
      setMoreLoading(false);
    }
  }

  const isMounted = useMounted();

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const [searchFromQueryTriggered, setSearchFromQueryTriggered] = useState(false);

  React.useEffect(async () => {
    if (isMounted() && router.isReady) {
      if (queryParams) {
        // console.log(queryParams);
        const { category, town, postcode, state } = queryParams;

        // console.log(category);
        // console.log(state);
        // console.log(town);
        if (state) {
          await delay(20);
          setState(null, state)
        }
        if (town) {
          await delay(20);
          setTown(null, town)
        }
        if (category) {
          await delay(20);
          setCategory(null, category)
        }

        // console.log(selectedCategory);
        // console.log(selectedState);
        // console.log(selectedTown);

        // state and town and min required
        if (state && town) {
          setSearchFromQueryTriggered(true);
        }
      }
    }
  }, [isMounted, router.isReady]);


  // had to separate out from other useeffect
  // as state wasn't being updated in there
  // and doSearch would fail
  React.useEffect(async () => {
    if (searchFromQueryTriggered) {
      // state and town and min required
      if (selectedState && selectedTown) {
        await doSearch();
      }
      setSearchFromQueryTriggered(false);
    }
  }, [searchFromQueryTriggered]);

  const extractTownName = towny => towny ? towny.split(", ")[0] : "";

  return (
    <Box
      sx={{ width: "100%" }}
      {...props}>
      <Container
        maxWidth="100%"
        sx={{
          width: "100%",
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#01023B',
          paddingTop: "80px",
          paddingBottom: "20px",
          position: '-webkit-sticky',
          position: 'sticky',
          // bottom: 0,
          top: 60,
          zIndex: 5,
        }}
      >

        {/* <Grid container
        maxWidth="md"
        sx={{color:"white"}}
          rowSpacing={1} >
          <Grid xs={12}
            md={3}>EDIT SEARCH</Grid>
            <Grid xs={12}
            md={3}>EDIT SEARCH</Grid>
            <Grid xs={12}
            md={3}>EDIT SEARCH</Grid>
            <Grid xs={12}
            md={3}>EDIT SEARCH</Grid>
            </Grid> */}


        <Grid container
          maxWidth="md"
          justifyContent={"center"}
          // spacing={4}
          rowSpacing={1}
        >
          <Grid item xs={6}
            md={3} sx={{
              paddingRight: "10px",
              marginBottom: "10px"
            }}>
            <Autocomplete
              popupIcon={<ArrowDownIcon color="secondary" />}
              id="category-select"
              // sx={{ width: 320,mx:1 }}
              fullWidth
              options={allStates}
              autoHighlight
              getOptionLabel={(option) => option}
              onChange={setState}
              value={selectedState || null}
              renderOption={(props, option) => (
                <Box component="li"
                  {...props}>
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '36px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                    '& .css-1le9dec-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                  }}
                  size="small"
                  // label="Lawyer category"
                  variant="outlined"
                  placeholder='State'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                // value={selectedState}

                />
              )}
            />
          </Grid>
          <Grid item xs={6}
            md={3}
            sx={{
              paddingRight: "10px",
              marginBottom: "10px"
            }}>
            <Autocomplete
              disabled={!selectedState}
              popupIcon={<ArrowDownIcon color="secondary" />}
              id="category-select"
              filterOptions={(options, state) => {
                let newOptions = [];
                options.forEach((element) => {
                  if (
                    element
                      .replace(",", "")
                      .toLowerCase()
                      .includes(state.inputValue.toLowerCase().trim())
                  )
                    newOptions.push(element);
                });
                return newOptions;
              }}
              // sx={{ width: 320,mx:1 }}
              disableListWrap
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              fullWidth
              options={townList}
              autoHighlight
              getOptionLabel={(option) => option}
              groupBy={(option) => option[0].toUpperCase()}
              onChange={setTown}
              // renderOption={(props, option) => (
              //   <Box component="li"
              //     {...props}>
              //     {option}
              //   </Box>
              // )}
              value={selectedTown || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '36px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                    '& .css-1le9dec-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                  }}
                  size="small"
                  // label="Lawyer category"
                  variant="outlined"
                  placeholder='Town or postcode'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                // value={selectedTown}

                />
              )}

              // renderInput={(params) => <TextField {...params} label="10,000 options" />}
              renderOption={(props, option) => [props, option]}
              // TODO: Post React 18 update - validate this conversion, look like a hidden bug
              renderGroup={(params) => params}
            />
          </Grid>
          <Grid item xs={6}
            md={3} sx={{
              paddingRight: "10px",
              marginBottom: "10px"
            }}>
            <Autocomplete
              disabled={!selectedState || !selectedTown}
              popupIcon={<ArrowDownIcon color="secondary" />}
              id="category-select"
              // sx={{ width: 320,mx:1 }}
              // filterOptions={(options, state) => {
              //   let newOptions = [];
              //   options.forEach((element) => {
              //     if (
              //       element
              //         .replace(",", "")
              //         .toLowerCase()
              //         .includes(state.inputValue.toLowerCase().trim())
              //     )
              //       newOptions.push(element);
              //   });
              //   return newOptions;
              // }}
              fullWidth
              // options={types}
              options={lawyerTypeHeadings}
              autoHighlight
              getOptionLabel={(option) => option}
              onChange={setCategory}
              renderOption={(props, option) => (
                <Box component="li"
                  {...props}>
                  {option}
                </Box>
              )}
              value={selectedCategory || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '36px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                    '& .css-1le9dec-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                  }}
                  size="small"
                  // label="Lawyer category"
                  variant="outlined"
                  placeholder='Category'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                // value={selectedCategory}

                />
              )}
            />
          </Grid>
          <Grid item xs={6}
            md={2}

            sx={{
              borderLeft: {
                md: "2px solid #FF5403",
                lg: "2px solid #FF5403",
                xs: "none",
              },
              paddingLeft: {
                md: "15px",
                lg: "15px",
                xs: 0,
              },
              paddingRight: "10px",
            }}
          >
            {/* <p style={{top: "-100px", float: "left", color: "white"}}>Sort </p> */}
            {/* <Box
              sx={{width: "20px", height: "100%", borderRight: "2px solid white"}}
              ></Box> */}

            <Autocomplete
              popupIcon={<ArrowDownIcon color="secondary" />}
              id="category-select"
              // sx={{ width: 320,mx:1 }}
              fullWidth
              options={sortTypes}
              autoHighlight
              getOptionLabel={(option) => option}
              onChange={setSortType}
              renderOption={(props, option) => (
                <Box component="li"
                  {...props}>
                  {option}
                </Box>
              )}
              value={selectedSortType || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '36px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                    '& .css-1le9dec-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 0
                    },
                  }}
                  size="small"
                  // label="Lawyer category"
                  variant="outlined"
                  placeholder='Sort By'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                // value={selectedSortType}

                />
              )}
            />
          </Grid>

        </Grid>


        <br />
        <Box align="left">
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                color='#ffffff'
                value="top"
                control={
                  <Checkbox
                    checked={searchSurrounding}
                    onChange={handleSearchSurroundingChange}
                    sx={{
                      color: "#ffffff",
                      '&.Mui-checked': {
                        color: "#ffffff",
                      },
                    }}
                  />
                }
                label={<Typography color="#ffffff" variant="body">search surrounding suburbs</Typography>}
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>




        </Box>
        <Box align="center">
          
        <Box sx={{height: "40px"}}>{!loading ? <Button
            onClick={() => editSearch()}
            align="center"
            size="small"
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
            disabled={loading}
          >
            {loading ? "LOADING..." : "EDIT SEARCH"}
          </Button>
          :
          <Typography
          sx={{ ml: 2, pt: 1 }}
              color="white"
              // sx={{ fontSize: "small" }}
            >
              LOADING...
            </Typography>}</Box>

          {searchValidationError &&
            <Typography
              color="error"
              sx={{ fontSize: "small" }}
            >
              State and Town must be selected to search
            </Typography>}

        </Box>

      </Container>

      <Container maxWidth="md">

        {/* {loading && <p align="center">
          Loading...
        </p>} */}


        {(!loading && searchClicked && searchResults.length == 0) && <p align="center">
          There were no results for your search, try adjusting the search criteria
        </p>}

        <Box sx={{ mt: 3 }}>
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={4}
          >


        {/* {
          loading && <Typography
          color="#01023B"
          // sx={{ fontSize: "small" }}
        >
          loading...
        </Typography>
        } */}

            {searchResults.map((listing, i) =>
              //         <Grid
              //         xs={12}
              // md={4}
              //         item
              //         key={i} 
              //         sx={{width: "100%"}}
              //         >
              <LawyerBox
                key={i}
                // sx={{width: "100%"}}
                lawyer={listing}
                lawyerLink={`/lawyers/${forUrl(listing.city_key.split(":::-:::")[0])}/${forUrl(listing.city_key.split(":::-:::")[1])}/${forUrl(listing.name)}`}
              />
              // </Grid>

            )}

          </Grid>
          {/* {nextToken} */}
          {(nextToken || (nextTokens && nextTokens.length > 0) || extraSearchResults.length > 0) && <Box align="center">
            <br /><br />

            
          {moreLoading ? <Typography
              color="#01023B"
              // sx={{ fontSize: "small" }}
            >
              LOADING MORE...
            </Typography>
            :
            <Button
              onClick={() => doSearch(true)}
              align="center"
              size="large"
              variant="contained"
              color="secondary"
              disabled={moreLoading}
              sx={{ 
                ml: 2,
              }}
            >
              {moreLoading ? "LOADING MORE..." : "SHOW MORE"}
            </Button>}
          </Box>}
        </Box>

      </Container>

    </Box>
  )
};