import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Drawer, Link, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../hooks/use-auth';

const MainSidebarLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'block',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handlePathChange = () => {
    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]);

    const { user } = useAuth();

    const loginUrl = '/authentication/login?returnUrl=/dashboard';


  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={!lgUp && open}
      PaperProps={{ sx: { width: 256 } }}
      sx={{
        
        zIndex: (theme) => theme.zIndex.appBar + 100
      }}
      variant="temporary"
    >
      <Box sx={{ 
        p: 2, 
        backgroundColor: "#F2F1EF", 
        height: "100%"
        }}>

        <NextLink
          href="/#find-a-lawyer"
          passHref
        >
          <MainSidebarLink
            color="#01023B"
            underline="none"
            variant="subtitle2"
          >
            Find a Lawyer
          </MainSidebarLink>
        </NextLink>
        <NextLink
          href="/for-lawyers"
          passHref
        >
          <MainSidebarLink
            color="#01023B"
            underline="none"
            variant="subtitle2"
          >
            For Lawyers &amp; Firms
          </MainSidebarLink>
        </NextLink>
        <NextLink
          href="/about"
          passHref
        >
          <MainSidebarLink
            color="#01023B"
            underline="none"
            variant="subtitle2"
          >
            About Us
          </MainSidebarLink>
        </NextLink>
        {user ?
              <Button
                href="/dashboard/"
                fullWidth
                // passHref
                // component="a"
                size="small"
                variant="contained"
                color="secondary"
                sx={{ mt: 1.5,  borderRadius: '20px' }}
              >
                MY ACCOUNT
              </Button> : <><Button
                href="/authentication/register"
                fullWidth
                // passHref
                // component="a"
                size="small"
                variant="contained"
                color="secondary"
                sx={{ mt: 1.5,  borderRadius: '20px' }}
              >
                GET STARTED
              </Button>
              <br /><br />
              <Typography color="textSecondary" sx={{ fontSize: "small"}}>Already a member?</Typography>
                <NextLink
                  href={loginUrl}
                  passHref
                >
                  <MainSidebarLink
                    color="black"
                    underline="none"
                    variant="subtitle2"
                  >
                    Sign in
                  </MainSidebarLink>
                </NextLink>

              </>
            }



      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
