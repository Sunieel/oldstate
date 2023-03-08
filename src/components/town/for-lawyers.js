import {  Box, Container, Typography, Button  } from '@mui/material';
import {Link} from  'next/link';

export const TownForLawyers = (props) => {
  // const types = lawyerTypes.map(type => type.cat);
  
  return (
  <Box
    sx={{
      backgroundColor: 'primary.main',
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
      <Box sx={{align:"center", width:"70%"}}
textAlign='center'>
     <Typography variant="h6"
color="secondary">
              FOR LAWYERS &amp; FIRMS
              </Typography>
              <br />
            <Typography variant="h3" color="#FFFFFF">
            Connecting your firm to more clients in {props.townName ? props.townName : "your area"}.
            </Typography>
      <Typography
        align="center"
        color="primary.contrastText"
        variant="body1"
        sx={{ my: 5 }}
      >
Advocat was designed in consultation with lawyers, law firms and their clients 
in Australia to change the way consumers identify the right law firms for them, 
making the experience of finding a lawyer simpler and more transparent. 
      </Typography>
      </Box>
      {/* <Button color="secondary" variant="contained">Claim your profile</Button> */}
    </Container>
  </Box>
)};