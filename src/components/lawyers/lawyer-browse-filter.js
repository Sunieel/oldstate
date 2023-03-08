import { Box, Card, Checkbox, Chip, Divider, FormControlLabel, Input, TextField, Autocomplete } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { MultiSelect } from '../multi-select';
import { useMemo } from 'react';
// import * as React from 'react';
import lawyerTypes from "../../__fake-api__/lawyer-types.json";

const typeOptions = [
  {
    label: 'Barrister',
    value: 'freelance'
  },
  {
    label: 'Divorce lawyer',
    value: 'fullTime'
  },
  {
    label: 'Tax lawyer',
    value: 'partTime'
  },
  {
    label: 'Conveyancer',
    value: 'internship'
  }
];

const levelOptions = [
  {
    label: '5 stars',
    value: 'novice'
  },
  {
    label: '4 stars',
    value: 'expert'
  },
  {
    label: '3 stars',
    value: 'expert'
  },
  { 
    label: '2 stars',
    value: 'expert'
  },
  {
    label: '1 star',
    value: 'expert'
  }

];

const locationOptions = [
  {
    label: 'Africa',
    value: 'africa'
  },
  {
    label: 'Asia',
    value: 'asia'
  },
  {
    label: 'Europe',
    value: 'europe'
  },
  {
    label: 'North America',
    value: 'northAmerica'
  },
  {
    label: 'South America',
    value: 'southAmerica'
  }
];

const roleOptions = [
  {
    label: 'Web Developer',
    value: 'webDeveloper'
  },
  {
    label: 'Android Developer',
    value: 'androidDeveloper'
  },
  {
    label: 'iOS Developer',
    value: 'iosDeveloper'
  }
];

export const LawyersBrowseFilter = (props) => {
  const filterItems = useMemo(() => [
    {
      label: 'Type',
      field: 'type',
      value: 'freelance',
      displayValue: 'Freelance'
    },
    {
      label: 'Type',
      field: 'type',
      value: 'internship',
      displayValue: 'Internship'
    },
    {
      label: 'Level',
      field: 'level',
      value: 'novice',
      displayValue: 'Novice'
    },
    {
      label: 'Location',
      field: 'location',
      value: 'asia',
      displayValue: 'Asia'
    },
    {
      label: 'Role',
      field: 'role',
      value: 'webDeveloper',
      displayValue: 'Web Developer'
    }
  ], []);

  // We memoize this part to prevent re-render issues
  const typeValues = useMemo(() => filterItems
    .filter((filterItems) => filterItems.field === 'type')
    .map((filterItems) => filterItems.value), [filterItems]);

  const levelValues = useMemo(() => filterItems
    .filter((filterItems) => filterItems.field === 'level')
    .map((filterItems) => filterItems.value), [filterItems]);

  const locationValues = useMemo(() => filterItems
    .filter((filterItems) => filterItems.field === 'location')
    .map((filterItems) => filterItems.value), [filterItems]);

  const roleValues = useMemo(() => filterItems
    .filter((filterItems) => filterItems.field === 'role')
    .map((filterItems) => filterItems.value), [filterItems]);

  return (
    <Card {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2
        }}
      >
        <SearchIcon fontSize="small" />
        <Box
          sx={{
            flexGrow: 1,
            ml: 3
          }}
        >
          <Input
            disableUnderline
            fullWidth
            placeholder="Enter a keyword"
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          p: 2
        }}
      >
        {filterItems.map((filterItem, i) => (
          <Chip
            key={i}
            label={(
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  '& span': {
                    fontWeight: 600
                  }
                }}
              >
                  <span>
                    {filterItem.label}
                  </span>
                :
                {' '}
                {filterItem.displayValue || filterItem.value}
              </Box>
            )}
            onDelete={() => { }}
            sx={{ m: 1 }}
            variant="outlined"
          />
        ))}
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          p: 1
        }}
      >
        <LawyerTypeSelect />
        <MultiSelect
          label="Type"
          options={typeOptions}
          value={typeValues}
        />
        <MultiSelect
          label="Rating"
          options={levelOptions}
          value={levelValues}
        />
        <MultiSelect
          label="Location"
          options={locationOptions}
          value={locationValues}
        />
        {/* <MultiSelect
          label="Role"
          options={roleOptions}
          value={roleValues}
        /> */}
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Advocat members only"
        />
      </Box>
    </Card>
  );
};




const LawyerTypeSelect = () => {
  return (
    <Autocomplete
      multiple
      // defaultValue={[]}
      id="lawyer-type-select"
      sx={{ width: 300 }}
      options={lawyerTypes}
      autoHighlight
      getOptionLabel={(option) => option.cat}
      renderOption={(props, option) => (
        <Box component="li"
sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
{...props}>
          {option.cat} ({option.count}) 
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <> </>
          // <Chip
          //   variant="outlined"
          //   label={option.cat}
          //   {...getTagProps({ index })}
          // />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Lawyer type"
          inputProps={{
            ...params.inputProps,
            // autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  ); 
}

