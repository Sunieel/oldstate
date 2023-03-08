import { Box, Container, Typography, Accordion, Divider, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Chart } from '../chart';
import { alpha, useTheme } from '@mui/material/styles';


const PieChart = (props) => {
  const { data, title } = props;
  const theme = useTheme();
  const chartData = data;
  delete (chartData['Total']);
  delete (chartData['Rented: Total']);
  // get field name from data
  const labels = Object.keys(chartData);
  // get values from data
  const chartSeries = Object.values(chartData);
  var chartOptions = {
    chart: {
      width:  300,
      height: 400 
    },
    labels,
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#01023B',
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#01023B',
      }
    },
    // colors: ['#01023B', '#FF5403', '#3A657E', '#1A504B'],
    // fill: {
    //   colors: ['#01023B', '#FF5403', '#3A657E', '#1A504B']
    // },
    dataLabels: {
      style: {
        colors: ['#FFFFFF'],
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    legend: {

      position: 'bottom',
    }
    // responsive: [{
    //   breakpoint: 480,
    //   options: {
    //     chart: {
    //       width: 200
    //     },
    //     legend: {
    //       position: 'bottom'
    //     }
    //   }
    // }]
  };
  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="pie"
    // width={120}
    />
  );

}

const BarChart = (props) => {
  const { data, title } = props;
  const theme = useTheme();
  // console.log(data);

  // get field name from data
  const labels = data.labels;
  // get values from data
  const chartSeries = [{ data: data.series }];
  var chartOptions = {
    chart: {
      width: 380,
      height: 400 
    },
    labels,
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#01023B',
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    colors: ['#01023B', '#FF5403', '#3A657E', '#1A504B'],
    fill: {
      colors: ['#01023B', '#FF5403', '#3A657E', '#1A504B']
    },
    dataLabels: {
      style: {
        colors: ['#FFFFFF'],
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    xaxis: {
      title:
        { text: 'Age group' },
      style: {
        color: '#01023B',
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    yaxis: {
      title:
        { text: 'Number of people' },
      style: {
        color: '#01023B',
        fontFamily: 'EuclidCircularB-Regular,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
      }
    },
    // responsive: [{
    //   breakpoint: 480,
    //   options: {
    //     chart: {
    //       width: 200
    //     },
    //     legend: {
    //       position: 'bottom'
    //     }
    //   }
    // }]
  };
  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
    // width={120}
    />
  );

}

export const TownStats = (props) => {
  // const types = lawyerTypes.map(type => type.cat);
  const { townName, absData, postcode } = props;
  let householdTypes = { ...absData.houseHoldTypes };
  let maritalStatuses = { ...absData.maritalStatus };
  const ageGroups = ['0-4 years', '5-9 years', '10-14 years', '15-19 years', '20-24 years', '25-29 years', '30-34 years', '35-39 years', '40-44 years', '45-49 years', '50-54 years', '55-59 years', '60-64 years', '65-69 years', '70-74 years', '75-79 years', '80-84 years', '85-89 years', '90-94 years', '95-99 years', '100 years and over'];
  const ageGroupsData = ageGroups.map(group => absData.populationByPostCode[group + ' / Persons']);
  const ageLabels = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90-94', '95-99', '100+'];
  const ageGroupsDataObj = { labels: ageLabels, series: ageGroupsData };

  return (
    <Box
      sx={{
        backgroundColor: '#F2F1EF',
        py: 10,
        '& li::before': {
          content: '"--"',
          letterSpacing: "-0.2em",
          fontSize: "1.2em",
          color: "red",
          display: "inline-block",
          width: "1em",
          marginLeft: "-1em",
        },
        '& ul': { listStyle: "none", ml: 0, p: "0 18px", m: "10px 0" },
        '& li': { m: "8px 0" }
      }}
      {...props}>
      <Container
        maxWidth="lg"
        sx={{
          // alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="H4"
          sx={{ mb: 3, fontWeight: "bold" }}>THE LAWYERS WITH THE BEST CUSTOMER SATISFACTION IN {townName.toUpperCase()}
        </Typography>

        <Typography>
          The lawyers listed above have the best rating from Google reviews in {townName}.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="H4"
          sx={{ mb: 3, fontWeight: "bold" }}>FINDING A LAWYER IN {townName.toUpperCase()}
        </Typography>

        <Typography>
          At certain stages in our lives, we need the services of a lawyer. Advocat has been designed to help you find the right
          lawyer for you, quickly and efficiently with the minimum of stress. Advocat contains listings for almost every lawyer
          in {townName}, Australia so whatever you need a lawyer for whether it’s to help buy a house, to write a will or to seek
          compensation, Advocat will have the right lawyer for you. View the lawyers that Advocat has found for {townName} above.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid
          container
          spacing={3}

        >
          <Grid item xs={12} md={6}>

            <Typography variant="H4"
              sx={{ mb: 3, fontWeight: "bold" }}>CONVEYANCERS AND PROPERTY LAWYERS IN {townName.toUpperCase()}
            </Typography>

            <Typography>
              <p>Much like in all of Australia, owning real estate is an important party of our lives in {townName}&apos;s postode ({postcode}). Of the {absData.houseHoldTypes.Total} households in the area, {(absData.houseHoldTypes["Owned outright"] + absData.houseHoldTypes["Owned with a mortgage"])} households have
                realised that dream and own the house they live in, with {absData.houseHoldTypes["Owned outright"]} owning their house outright and {absData.houseHoldTypes["Owned with a mortgage"]} having a mortgage. Some own their property outright and some are still paying it off,
                with the median mortgage in {townName} being ${absData.averagesByPostCode["Median mortgage repayment ($/monthly)"]} per month. Renters in {townName} are paying ${Math.round(absData.averagesByPostCode["Median rent ($/weekly)"] * 52 / 12)} per month. The one thing that owners, landlords and tenants in {townName} would
                have in common is that they would have need legal services buy, sell, or invest in property {townName}. Approximately {Math.round(100 * absData.houseHoldTypes["Rented: Total"] / absData.houseHoldTypes.Total)}% would
                have needed a rental agreement, approximately, {Math.round(100 * (absData.houseHoldTypes["Owned outright"] + absData.houseHoldTypes["Owned with a mortgage"]) / absData.houseHoldTypes.Total)}%  would have needed some conveyancing services to buy or sell their property.</p>
              <p>
                Advocat covers all aspects of Property Law whether its conveyancing, drawing up contracts or helping with questions
                of title so let&apos;s find the right Property Lawyer for you in  {townName}.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>

            <PieChart
              data={householdTypes}
              title={"Breakdown of household types in " + townName} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Grid
          container
          spacing={3}

        >
          <Grid item xs={12} md={6}>
            <Typography variant="H4"
              sx={{ mb: 3, fontWeight: "bold" }}>THE DEMOGRAPHICS OF {townName.toUpperCase()}
            </Typography>

            <Typography>
              <p>There are {absData.maritalStatus.Total} people and {absData.houseHoldTypes.Total} households in the {townName} area ({postcode}). The average household size is {absData.averagesByPostCode["Average household size"]}.</p>
              <p>One of the most important things we can do is write a Will to make sure that our loved ones, family, and friends are
                looked after in the event of our death. The median age in {townName} is {absData.averagesByPostCode["Median age of persons"]}. Australia has an aging population and preparing Wills, Estate and Trusts is
                extremely important. So, let’s find the right lawyer for you in {townName} to help ensure you and your family are well prepared.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>

            <BarChart
              data={ageGroupsDataObj}
              title={"Number of people per age group in " + townName} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="H4"
          sx={{ mb: 3, fontWeight: "bold" }}>INCOME IN {townName.toUpperCase()}
        </Typography>

        <Typography>
          The median personal income in {townName}’s postal area ({postcode}) is ${absData.averagesByPostCode["Median total personal income ($/weekly)"]} per week. The median weekly total household and family incomes are ${absData.averagesByPostCode["Median total household income ($/weekly)"]} and ${absData.averagesByPostCode["Median total family income ($/weekly)"]}, respectively.  If you are injured at work or find yourself unable to work due to someone else
          negligence, you may be entitled to compensation. Advocat can help you find Lawyers in {townName} who
          are experts at dealing with things such as car accidents / TAC, workers compensation and disability claims.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid
          container
          spacing={3}

        >
          <Grid item xs={12} md={6}>
            <Typography variant="H4"
              sx={{ mb: 3, fontWeight: "bold" }}>{townName.toUpperCase()} MARRIAGE AND DIVORCE STATISTICS
            </Typography>

            <Typography>
             <p> In {townName}’s postal area ({postcode}) there are {absData.maritalStatus.Married} married people, and {absData.maritalStatus.Divorced} divorced people. Approximately {Math.round(100 * absData.maritalStatus.Married / absData.maritalStatus.Total)}%
              of the people in {townName} are married, {Math.round((100 * absData.maritalStatus.Divorced + absData.maritalStatus.Separated) / absData.maritalStatus.Total)}% are divorced or separated and {Math.round(100 * absData.maritalStatus["Never married"] / absData.maritalStatus.Total)}% never married. This means that approximately {Math.round((100 * absData.maritalStatus.Divorced + absData.maritalStatus.Separated) / (absData.maritalStatus.Divorced + absData.maritalStatus.Separated + absData.maritalStatus.Married))}% of the people married in {townName} felt that separation and divorce were the right solutions for them to lead
              better lives. Advocat has the best Family Law experts in {townName} so let’s find the right one for you.</p>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChart
              data={maritalStatuses}
              title={"Marital status of people in " + townName} />
          </Grid>
        </Grid>
        <Typography variant="p" sx={{ my: 5 }}>
        Data sourced from: Australian Bureau of Statistics (2021 Census), accessed 1 September 2022.
          </Typography>
         </Container>
    </Box>
  )
};     