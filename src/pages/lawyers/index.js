import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography
} from '@mui/material';
import { jobApi } from '../../__fake-api__/job-api';
// import { AuthGuard } from '../../components/authentication/auth-guard';
// import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { LawyersBrowseFilter } from '../../components/lawyers/lawyer-browse-filter';
import { CompanyJobs } from '../../components/dashboard/jobs/company-jobs';
import { useMounted } from '../../hooks/use-mounted';
import { BadgeCheckOutlined as BadgeCheckOutlinedIcon } from '../../icons/badge-check-outlined';
import { ChevronLeft as ChevronLeftIcon } from '../../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';
import { Star as StarIcon } from '../../icons/star';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';
import { getInitials } from '../../utils/get-initials';
import { CustomBreadcrumb } from '../../components/custom-breadcrumb';
import { postcodeApi } from '../../__fake-api__/postcodes-api';

import { MainLayout } from '../../components/main-layout';
import { SearchFilter} from '../../components/lawyers/search-filters';


const LaywersSearch = () => {
  const isMounted = useMounted();

//   // const getStates = useCallback(() => {
//   //   try {
//   //     const states = await postcodeApi.getStates();
//   //     if (isMounted()) {
//   //       setStates(states);
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // }, [isMounted]);

  const states = postcodeApi.getStatesSync();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCompanies = useCallback(async () => {
    try {
      const data = await jobApi.getCompanies();

      if (isMounted()) {
        setCompanies(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getCompanies();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return (
    <>
      <Head>
        <title>
         Find Lawyers | Advocat
        </title>
      </Head>
      <SearchFilter />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
              {/* <CustomBreadcrumb rootLabel="Home" /> */}

          {/* <Grid
            alignItems="center"
            container
            sx={{
              backgroundColor: 'neutral.900',
              borderRadius: 1,
              color: '#FFFFFF',
              px: 4,
              py: 4
            }}
          >
            <Grid
              item
              xs={12}
              sm={7}
            >
              <Typography
                color="inherit"
                variant="h3"
              >
                Search 20K+ law firms.
              </Typography>
              <Typography
                color="neutral.500"
                sx={{ mt: 2 }}
                variant="body1"
              >
                Add your law firm today for free.
              </Typography>
              <Button
                color="secondary"
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
              >
                Join Advocat
              </Button>
            </Grid>
            <Grid
              item
              sm={5}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block'
                }
              }}
            >
              <img
                alt=""
                src="/avstatic/mock-images/jobs/job_browse_header.svg"
              />
            </Grid>
          </Grid> */}
          <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    p: 1,
                    m: 1,
                    // bgcolor: 'background.paper',
                    // borderRadius: 1,
                  }}
          >
            {states.map((s, i) => 
              <Item key={i}>
                <NextLink 
                  href={`lawyers/${s.short.toLowerCase()}`} 
                  passHref 
                >
                  {`Find a lawyer in ${s.long}`}
                </NextLink>
              </Item>)}
          </Box>

          {/* <Box sx={{ mt: 4 }}>
            <LawyersBrowseFilter />
          </Box> */}
          {/* <div>
            {companies.map((company) => (
              <Card
                key={company.id}
                sx={{ mt: 4 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row'
                      }
                    }}
                  >
                    <NextLink
                      href="/dashboard/jobs/companies/1"
                      passHref
                    >
                      <Avatar
                        component="a"
                        src={company.logo}
                        sx={{
                          background: 'transparent',
                          mr: 2,
                          mb: {
                            xs: 2,
                            md: 0
                          }
                        }}
                        variant="rounded"
                      >
                        {getInitials(company.name)}
                      </Avatar>
                    </NextLink>
                    <div>
                      <NextLink
                        href="/dashboard/jobs/companies/1"
                        passHref
                      >
                        <Link
                          color="textPrimary"
                          variant="h6"
                        >
                          {company.name}
                        </Link>
                      </NextLink>
                      <Typography variant="body2">
                        {company.shortDescription}
                      </Typography>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexWrap: 'wrap',
                          ml: -3,
                          '& > *': {
                            ml: 3,
                            mt: 1
                          }
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <UsersIcon
                            color="action"
                            fontSize="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography
                            color="textSecondary"
                            noWrap
                            variant="overline"
                          >
                            {company.employees}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <StarIcon
                            color="action"
                            fontSize="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography
                            color="textSecondary"
                            noWrap
                            variant="overline"
                          >
                            {company.averageRating}
                            /5
                          </Typography>
                        </Box>
                        {company.isVerified && (
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <BadgeCheckOutlinedIcon
                              color="success"
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography
                              color="success"
                              noWrap
                              variant="overline"
                            >
                              Verified
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </div>
                  </Box>
                  
                </CardContent>
              </Card>
            ))}
          </div> */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 4,
              px: 3,
              py: 2
            }}
          >
            <IconButton disabled>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box> */}
        </Container>
      </Box>
    </>
  );
};

LaywersSearch.getLayout = (page) => (
    <MainLayout>
      {page}
    </MainLayout>
);

export default LaywersSearch;


const Item = (props) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}