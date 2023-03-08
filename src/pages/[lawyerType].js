import Head from 'next/head';
import NextLink from 'next/link';
import { Tabs, Box, Tab, Card, InputAdornment, Container, Divider, Typography, TextField
} from '@mui/material';
import { postcodeApi } from '../__fake-api__/postcodes-api';
import { MainLayout } from '../components/main-layout';
import { useMounted } from '../hooks/use-mounted';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Search as SearchIcon } from '../icons/search';
import { TownListTable } from '../components/lawyers/towns-list-table';
import { CustomBreadcrumb } from '../components/custom-breadcrumb';
import {forUrl, forDisplay} from '../utils/text-normaliser';


const sortOptions = [

  {
    label: 'A-Z',
    value: 'l|asc'
  },
  {
    label: 'Z-A',
    value: 'l|desc'
  },
  {
    label: 'Most Lawyers',
    value: 'n|desc'
  }
];


const applyFilters = (towns, filters) => towns.filter((town) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['l', 'p', 's'];

    properties.forEach((property) => {
      if(property === 's') {
        
        if ((town[property].map(el => el.type).join(',')).toLowerCase().includes(filters.query.toLowerCase())) {
          queryMatched = true;
        }
      } else {
        if ((town[property]).toLowerCase().includes(filters.query.toLowerCase())) {
          queryMatched = true;
        }
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  return true;
});


const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) => (sortDir === 'desc'
? (a, b) => descendingComparator(a, b, sortBy)
: (a, b) => -descendingComparator(a, b, sortBy));

const applySort = (towns, sort) => {
  const [sortBy, sortDir] = sort.split('|');
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = towns.map((el, index) => [el, index]);
  
  stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);
  
    if (newOrder !== 0) {
      return newOrder;
    }
  
        return a[1] - b[1];
  });
  
    return stabilizedThis.map((el) => el[0]);
  };
  
const applyPagination = (towns, page, rowsPerPage) => towns.slice(page * rowsPerPage,
page * rowsPerPage + rowsPerPage);


const State = ({ lawyerType, towns }) => {
  const state = lawyerType;
  const tabs = [
    {
      label: `Find Lawyers in ${state.long} by town`,
      value: 'town'
    },
    {
      label: `Find Lawyers in ${state.long} by region`,
      value: 'region'
    }
  ];
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('town');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[2].value);
  // const [towns, setTowns] = useState(towns);
  const [filters, setFilters] = useState({
    query: ''
  });

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const filteredTowns = applyFilters(towns, filters);
  const sortedTowns = applySort(filteredTowns, sort);
  const paginatedTowns = applyPagination(sortedTowns, page, rowsPerPage);

  // console.log(towns);

  return (
    <>
      <Head>
        <title>
          Lawyers in {} | Advocat
        </title>
      </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="md">

          <CustomBreadcrumb rootLabel="Home" />
          <br />

            <Typography
              variant="h1"
              sx={{ mt: 3 }}
            >
              Find lawyers in {state.long}

            </Typography>
            <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
 
                          <Divider />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  onChange={handleQueryChange}
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search towns, postocodes or lawyer types"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <TownListTable
              towns={paginatedTowns}
              state={state}
              townsCount={filteredTowns.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
            </Card>
            <Card
              elevation={16}
              sx={{
                alignItems: 'center',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                mb: 8,
                mt: 6,
                px: 3,
                py: 2
              }}
            >
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >

            </Typography>  
            </Card>
          </Container>
        </Box>
    </>
  );
};

State.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default State;

export async function getStaticProps({ params }) {
  const state = params.lawyerType.toUpperCase();
  const results = await postcodeApi.getState(state);
  const towns = postcodeApi.getTownsInState(state);
  // console.log(results);
  return {
    props: {
      lawyerType: results,
      towns
    }
  };
}

export async function getStaticPaths() {
  const lawyerTypes = await postcodeApi.getStates();
  // console.log(states);
  const paths = lawyerTypes.map(stateObj => {
    
    const lawyerType = forUrl(stateObj.short) ;
    console.log(lawyerType);
    return {params: {lawyerType}};
  });
  // console.log(paths);
  return {
    paths,
    fallback: false
  }
}