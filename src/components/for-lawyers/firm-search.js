import * as React from 'react';
import { Autocomplete, Avatar, Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Divider, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import lawyerTypes from '../../__fake-api__/lawyer-types.json';
import { ChevronDown as ArrowDownIcon } from '../../icons/chevron-down';
// import { ChevronRightOutlined } from '@mui/icons-material';
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



export const FirmSearch = (props) => {
  // const types = lawyerTypes.map(type => type.cat);


  // const convertToURL = (town, cat) => {
  //   // explode town string
  //   const townArray = town.split(", ");
  //   const url = `/lawyers/${forUrl(townArray[2])}/${forUrl(townArray[0])}#${forUrl(cat)}`;
  //   return url;

  // }

  const [locality, setLocality] = useState('');
  const [url, setUrl] = useState('/lawyers');
  // const [cat, setCat] = useState('');

  const handleSelectChange = (value) => {
    const tempurl = "/lawyers/"+value.u ;
    setUrl(tempurl);
  }

  // const townList = towns.map(town => town.locality + ", " + town.postcode + ", " + town.state).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

  return (
    <Box
      sx={{
        backgroundColor: '#3A657E',
        py: 15
      }}
      {...props}>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          align="center"
          color="primary.contrastText"
          variant="h2"
          sx={{ mb: 2 }}
        >
          Search your law firm&apos;s profile
        </Typography>
        <br />
        <Box align="center"
          minWidth={"50%"}>


          <Autocomplete
            id="lawyer-select"
            //           popupIcon={<ExpandCircleDownRoundedIcon color="secondary"
            // sx={{transform: "rotate(270deg)"}}
            // fontSize="large" />}

            disableListWrap
            fullWidth
            PopperComponent={StyledPopper}
            ListboxComponent={ListboxComponent}
            options={lawyers}
            autoHighlight
            getOptionLabel={(option) => option.n}
            // groupBy={(option) => option[0].toUpperCase()}
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
                placeholder='Enter law firm or lawyer name'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}

              />
            )}
            // renderInput={(params) => <TextField {...params} label="10,000 options" />}
            renderOption={(props, option) => [props, option.n]}
            // TODO: Post React 18 update - validate this conversion, look like a hidden bug
            renderGroup={(params) => params}

          />
        </Box>
        <Box align="center"
          minWidth={"50%"}
          sx={{ mt: 3 }}>




          <NextLink
            href={url}
            passHref
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ textTransform: 'uppercase', py: 0, alignItems: 'flex-end', mt: 2, px: 8, py: 1 }}
            >
              Claim profile
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  )
};
