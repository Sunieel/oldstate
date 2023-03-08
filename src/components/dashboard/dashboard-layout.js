import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { Box, IconButton, Container } from '@mui/material';
import { Menu as MenuIcon } from '../../icons/menu';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 0,
  marginTop: 0,
  // paddingTop: 64,

  // this is how you do certain things 
  // based on device size
  [theme.breakpoints.up('md')]: {
    // paddingLeft: 280
    paddingRight: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Container maxWidth="lg">
    {/* <Box sx={{
            display: {
              lg: 'none',
              // xs: 'block'
            }
          }}>
          <Button onClick={() => setIsSidebarOpen(true)}>side</Button>
        </Box> */}
<>
        
<DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
        
        <Box align="right">
        <IconButton
        
            color="inherit"
            // size="large"
            onClick={() => setIsSidebarOpen(true)}
            sx={{
              marginTop: "5px",
              display: {
                lg: 'none',
                md: 'none',
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          </Box>
      <DashboardLayoutRoot sx={{
        paddingTop: 0,
        marginTop: 0,
        '& .MuiBox-root':{
          paddingTop: "10px",
          marginTop: 0,
        }
      }}>
        
        <Box
          sx={{
            paddingTop: 0,
            marginTop: 0,
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      {/* <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} /> */}
      
      </>
    </Container>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
