import { Avatar, Box, Container, Typography } from '@mui/material';

export const HomeTestimonials = (props) => (
  <Box
    sx={{
      backgroundColor: '#CCCCCC',
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
        // color="primary.contrastText"
        variant="h3"
      >
        &quot;Content to come...&quot;
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 3
        }}
      >
        <Avatar
          src="/avstatic/home/olivier.png"
          sx={{ mr: 2 }}
          variant="rounded"
        />
        <div>
          <Typography
            // color="primary.contrastText"
            variant="h6"
          >
            John Smith,
          </Typography>
          <Typography
            // color="primary.contrastText"
            variant="body2"
          >
            lawyer at @PLACE
          </Typography>
        </div>
      </Box>
    </Container>
  </Box>
);
