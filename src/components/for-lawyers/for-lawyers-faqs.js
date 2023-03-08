import {  Box, Container, Typography, Accordion    } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const ForLawyersFaqs = (props) => {
  // const types = lawyerTypes.map(type => type.cat);
  
  return (
  <Box
    sx={{
     backgroundColor: 'white',
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
      <Box>
  <Typography variant="h5"
color="secondary">FAQS</Typography>
    <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon color="secondary"/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>QUESTION 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon color="secondary"/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>QUESTION 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon color="secondary"/>}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>QUESTION 3</Typography>
        </AccordionSummary>
      </Accordion>
      </Box>
    </Container>
  </Box>
)};