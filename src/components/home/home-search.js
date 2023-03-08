import * as React from 'react';
import { Autocomplete, Avatar, Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Divider, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import lawyerTypes from '../../__fake-api__/lawyer-types.json';
import { ChevronDown as ArrowDownIcon } from '../../icons/chevron-down';
// import { ChevronRightOutlined } from '@mui/icons-material';
import towns from '../../__fake-api__/postcode-list.json';
import lawyers from '../../__fake-api__/lawyer-search.json';
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
import { urlSafeDecode } from '@aws-amplify/core';
import { useRouter } from 'next/router'

import { useMounted } from '../../hooks/use-mounted';

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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const HomeSearch = (props) => {
  const router = useRouter();
  // const types = lawyerTypes.map(type => type.cat);
  // const types = lawyerTypes;

  const queryParamies = router.query;

  const isMounted = useMounted();
  React.useEffect(async () => {
    if (isMounted() && router.isReady) {
      if (queryParamies) {
        console.log("queryParamies:  "+ JSON.stringify(queryParamies));
        const { category } = queryParamies;
        if (category) {
          await delay(20);
          setCat(category);
        }
      }
    }
  }, [isMounted, router.isReady]);

  const lawyerTypeHeadings = lawyerTypes.map(l => l.heading)
  .filter((v, i, s) => s.indexOf(v) === i);

  // console.log(lawyerTypeHeadings);

  const convertToURL = (town, cat) => {
    const queryParams = {}
    if(cat){
      queryParams.category = cat;
    }
    if(town){
      const townArray = town.split(", ");
      queryParams.state = townArray[2];
      queryParams.town = town;
    }
    const qs = new URLSearchParams(queryParams).toString();
    return '/lawyers?'+qs;
  }

  const [locality, setLocality] = useState('');
  const [url, setUrl] = useState('/lawyers');
  const [cat, setCat] = useState('');

  const handleSelectChange = (value) => {
    setLocality(value);
    console.log(value, cat);
    const tempurl = convertToURL(value, cat);
    setUrl(tempurl);
  }


  const [specificLawyer, setSpecificLawyer] = useState('');

  const specificLawyerChange = (event, value) => {
    console.log(event, value);
    setSpecificLawyer(value.u);
  }


  const handleLawyerChange = (event, value) => {
    // console.log(event, value);
    // const href= "/lawyers/"+value.u;
    // router.push(href)

    const href= "/lawyers/"+specificLawyer;
    router.push(href);
  }

  const townList = towns.map(town => town.locality + ", " + town.postcode + ", " + town.state).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
  // const lawyerOptions = lawyers.map(lawyer => {return { label:lawyer.n, value:lawyer.u}});
  return (
  <Box
  id="find-a-lawyer"
    sx={{
      backgroundColor: 'secondary.main',
      py: 15
    }}
    {...props}>
    <Container
      maxWidth="xs"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
      }}
    >
            <Typography 
        align="center"
        color="primary.contrastText"
        variant="h2"
        sx={{mb:4}}
      >
        Find a lawyer {props.townName ? ' in ' + props.townName : ''}
      </Typography>
      <br />
      <Box align="center" sx={{width: "100%"}}>

   
      {/* sx={{mt:2, display:"flex", align:"center"}} */}
          <Autocomplete
           popupIcon={<ArrowDownIcon color="secondary"
sx={{height:"30px", width:"30px"}}
 />}
          id="category-select"
          // filterOptions={(options, state) => {
          //   let newOptions = [];
          //   options.forEach((element) => {
          //     if (
          //       element.cat
          //         .replace(",", "")
          //         .toLowerCase()
          //         .includes(state.inputValue.toLowerCase().trim())
          //     )
          //       newOptions.push(element);
          //   });
          //   return newOptions;
          // }}
          // sx={{ width: 320,mx:1 }}

          // groupBy={(option) => option.heading.toUpperCase()}

          fullWidth
          
          // options={types.sort((a, b) => -b.cat.localeCompare(a.cat)).sort((a, b) => -a.heading.localeCompare(b.heading))}
          options={lawyerTypeHeadings}

          autoHighlight
          value={cat}
          
          // getOptionLabel={(option) => option.cat}

          // onChange={(e, value) => setCat(value.cat)}
          onChange={(e, value) => setCat(value)}
          
          renderOption={(props, option) => (
            <Box component="li"
{...props}>
            {/* {option.cat} */}
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
              // label="Lawyer category"
              variant="outlined"
              placeholder='Lawyer category'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              

            />
          )}
        />
        <br />

                  <Autocomplete
          id="town-select"
          popupIcon={<ArrowDownIcon color="secondary"
sx={{height:"30px", width:"30px"}} />}
          //sx={{ width: 320, mx:1 }}
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
          disableListWrap
          fullWidth
          PopperComponent={StyledPopper}
          ListboxComponent={ListboxComponent}
          options={townList}
          autoHighlight
          getOptionLabel={(option) => option}
          groupBy={(option) => option[0].toUpperCase()}
          onChange={(e, value) => handleSelectChange(value)}
          
          // renderOption={(props, option) => (
          //   <Box component="li" {...props}>
          //   {option.locality} {option.state} {option.postcode} 
          //   </Box>
          // )}
          renderInput={(params) => (
            <TextField
              {...params}
              name="town"
              value={locality}
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
              // label="Lawyer category"
              variant="outlined"
              placeholder='Town or postcode'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              
          />
          )}
         // renderInput={(params) => <TextField {...params} label="10,000 options" />}
          renderOption={(props, option) => [props, option]}
          // TODO: Post React 18 update - validate this conversion, look like a hidden bug
          renderGroup={(params) => params}

        />

      <NextLink
                href={url}
                passHref
              >
        <Button 
          variant="contained" 
          size='large'
          sx={{backgroundColor:"primary.dark", mt:2, }}
          onClick={() => {
            console.log(url);
          }}
          
        >
          SEARCH
        </Button>
      </NextLink>
      <Divider width="100%"
sx={{color:"white", mt:3 }}/>
      <Box sx={{mt:2, align:"center"}}>

      

      <Typography
        align="center"
        color="primary.contrastText"
        variant="p"
        sx={{mt:3, textTransform: 'uppercase'}}
      >
        <Typography sx={{textDecoration: 'underline'}}
display="inline">OR</Typography> SEARCH FOR A SPECIFIC LAW FIRM OR LAWYER:
      </Typography>
      
      </Box>
      
      <Box sx={{mt:2, align:"center", position: "relative"}}>
      {/* <ExpandCircleDownRoundedIcon color="error"
          onClick={(e) => {e.preventDefault; console.log("hiiii")}}
sx={{float: "right", transform: "rotate(270deg)", height:"30px", width:"30px"}}
 /> */}

<Box sx={{position: "absolute", right: 0, pt: 0.8, zIndex: 999}}>

<Button>
<ExpandCircleDownRoundedIcon color="secondary"
          onClick={handleLawyerChange}
sx={{float: "right", transform: "rotate(270deg)", height:"30px", width:"30px"}}
 />
 </Button>

</Box>
      <Autocomplete
          id="lawyer-select"
          
          popupIcon={ 
          
          <></>
          
//           <ExpandCircleDownRoundedIcon color="secondary"
//           onClick={(e) => {e.preventDefault; console.log("hiiii")}}
// sx={{transform: "rotate(270deg)", height:"30px", width:"30px"}}
//  />
}

          //sx={{ width: 320, mx:1 }}
          // filterOptions={(x) => x}
          disableListWrap
          fullWidth
          PopperComponent={StyledPopper}
          ListboxComponent={ListboxComponent}
          options={lawyers}
          autoHighlight
          getOptionLabel={(option) => option.n}

          // groupBy={(option) => option.n[0].toUpperCase()}
          
          clearIcon={<></>}
          
          // onChange={(e, value) => handleLawyerChange(e, value)}

          onChange={(e, value) => specificLawyerChange(e, value)}
          
          
          // renderOption={(props, option) => (
          //   <Box component="li" {...props}>
          //   {option.locality} {option.state} {option.postcode} 
          //   </Box>
          // )}
          renderInput={(params) => (<>
            <TextField
              {...params}
              name="lawyerSearch"
              // value={locality}
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
              // label="Lawyer category"
              variant="outlined"
              placeholder='Enter law firm or lawyer name'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              
          />
          {/* <ExpandCircleDownRoundedIcon color="secondary"
          onClick={(e) => {e.preventDefault; console.log("hiiii")}}
sx={{transform: "rotate(270deg)", height:"30px", width:"30px"}}
 /> */}


{/* <div class="MuiAutocomplete-endAdornment css-1q60rmi-MuiAutocomplete-endAdornment"><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-popupIndicator css-187ylsa-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator" tabindex="-1" type="button" aria-label="Open" title="Open"><svg class="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeMedium css-taz2ik-MuiSvgIcon-root" focusable="false" aria-hidden="false" viewBox="0 0 24 24" data-testid="ExpandCircleDownRoundedIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.79 9.71-3.08 3.08c-.39.39-1.02.39-1.42 0l-3.08-3.08c-.39-.39-.39-1.03 0-1.42.39-.39 1.02-.39 1.41 0L12 12.67l2.38-2.38c.39-.39 1.02-.39 1.41 0 .39.39.39 1.03 0 1.42z"></path></svg></button></div> */}

 </>
          )}
         // renderInput={(params) => <TextField {...params} label="10,000 options" />}
          renderOption={(props, option) => [props, option.n]}
          // TODO: Post React 18 update - validate this conversion, look like a hidden bug
          renderGroup={(params) => params}

        />
         

        </Box>
        
        </Box> 
        
    </Container>
  </Box>
)};
