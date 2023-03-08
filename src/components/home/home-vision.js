import {  Box, Container, Typography  } from '@mui/material';
import Image from 'next/image';

export const HomeVision = (props) => {
  // const types = lawyerTypes.map(type => type.cat);
  
  return (
  <Box
    sx={{
      backgroundColor: 'secondary.main',
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
        <Image 
                src={`/avstatic/advocat symbol_navy.svg`} 
                alt="Advocat Lawyer Signup" 
                layout="fixed" 
                width={60}
                height={84}
               />
      <Typography
        align="center"
        color="primary.contrastText"
        variant="h3"
      >
        Our vision is to enable anyone,<br />
        anywhere to access excellent quality,<br />
        fair and efficient legal representation.
      </Typography>
      </Box>
    </Container>
  </Box>
)};