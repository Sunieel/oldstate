import { Box, Container, Typography, Grid, Card, Button } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

export const HomeServices = (props) => {

  return (
    <Box
      sx={{
        backgroundColor: '#F2F1EF',
        py: 15,
        '& li::before' : {
          content: '"--"', 
          letterSpacing: "-0.2em",
          fontSize: "1.2em",
          color: "red",
          display: "inline-block",
          width: "1em",
          marginLeft: "-1em",
        },
        '& ul': {listStyle: "none", ml: 0, p: "0 18px", m: "10px 0"},
        '& li': {m: "8px 0"}
      }}
      {...props}>
      <Container
        maxWidth="lg"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ align: "center", mb: 5 }}>
          <Typography
            align="center"
            variant="h3"
          >
            We cover all personal legal services {props.townName ? ' in ' + props.townName : ''} including:
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={3}
            xs={12}
          >
            <Card
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '20px',
                position: "relative"
              }}
              
            >

              <Box sx={{ my: 2, width: "35%" }}>
                <Image
                  layout='responsive'
                  src='/avstatic/Family-law.svg'
                  alt='Divorce and family law'
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ paddingTop: "10px" }}>

                <Typography
                  variant="h3"
                  color="secondary"
                  sx={{ margin: 0, padding: 0 }}
                >
                  <small>Divorce &amp; family law</small>
                </Typography>
              </Box>
              <Box sx={{ my: 2, paddingBottom: "20px",
            }}>
                <Typography
                  variant="p"
                  sx={{ my: 5 }}
                >
                  A family lawyer can help you with:
                  <br />
                    <ul>
                    {[
                      "Divorce",
                      "Separation",
                      "Children, custody and parenting",
                      "Financial settlements",
                      "Property settlements ",
                    ].map((t, i) =>
                    <li key={i}>{t}</li>
                    )}
                    </ul>
                </Typography>
              </Box>

          
              <Box sx={{ justifyContent: 'center', position: "absolute", bottom: 0, padding: "25px 0", left:"0", width:"100%" }}
                textAlign='center' justify="space-between" >
                  <Box sx={{width:"100%"}}>
               
                <NextLink
                  href="/divorce-family-law"
                  passHref
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: 'uppercase', py: 0, alignItems: 'flex-end' }}
                  >
FIND  A LAWYER                  </Button>
                </NextLink>
              </Box>
</Box>

            </Card>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}

          >
            <Card
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '20px',
                position: "relative"
              }}
            >
              <Box sx={{ my: 2, width: "35%" }}>
                <Image
                  layout='responsive'
                  src='/avstatic/Property-law.svg'
                  alt='Property law'
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ paddingTop: "10px" }}>

                <Typography
                  variant="h3"
                  color="secondary"
                >
                  <small>Buying or selling
                    a house &amp;
                    property law</small>
                </Typography>
              </Box>
              <Box sx={{ my: 2, paddingBottom: "20px" }}>
                <Typography
                  variant="p"
                  sx={{ my: 5 }}
                >
                  A property lawyer can help you with:
                  <br />

                    <ul>
                    {[
                      "Buying property",
                      "Selling property",
                      "Conveyancing",
                      "Ownership and title",
                      "Contract questions and reviews",
                    ].map((t, i) =>
                    <li key={i}>{t}</li>
                    )}
                    </ul>
                </Typography>
              </Box>
              <Box sx={{ justifyContent: 'center', position: "absolute", bottom: 0, padding: "25px 0", left:"0", width:"100%" }}
                textAlign='center' justify="space-between" >
                  <Box sx={{width:"100%"}}>
                <NextLink
                  href="/property-law"
                  passHref
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: 'uppercase', py: 0, alignItems: 'flex-end' }}
                  >
                    FIND A LAWYER
                  </Button>
                </NextLink>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}

          >
            <Card
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '20px',
                position: "relative"
              }}
            >
              <Box sx={{ my: 2, width: "35%" }}>
                <Image
                  layout='responsive'
                  src='/avstatic/injury-law.svg'
                  alt='Personal injury and compensation law'
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ paddingTop: "10px" }}>

                <Typography
                  variant="h3"
                  color="secondary"
                >
                  <small>Personal injury, compensation &amp; employment law</small>
                </Typography>
              </Box>
              <Box sx={{ my: 2, paddingBottom: "20px" }}>
                <Typography
                  variant="p"
                  sx={{ my: 5 }}
                >
                  A personal injury and compensation lawyer can help you with:
                  <br />
                  <ul>
                    {[
                      "Road accidents/TAC",
                      "Workers compensation",
                      "Sexual abuse",
                      "Medical negligence",
                      "Disability claims",
                      "Class actions",
                    ].map((t, i) =>
                    <li key={i}>{t}</li>
                    )}
                    </ul>
                </Typography>
              </Box>
              <Box sx={{ justifyContent: 'center', position: "absolute", bottom: 0, padding: "25px 0", left:"0", width:"100%" }}
                textAlign='center' justify="space-between" >
                  <Box sx={{width:"100%"}}>
                <NextLink
                  href="/injury-compensation-law"
                  passHref
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: 'uppercase', py: 0, alignItems: 'flex-end' }}
                  >
                    FIND A LAWYER
                  </Button>
                </NextLink>
              </Box>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}

          >
            <Card
              sx={{
                height: '100%',
                p: 4,
                borderRadius: '20px',
                position: "relative"
              }}
            >
              <Box sx={{ my: 2, width: "35%" }}>
                <Image
                  layout='responsive'
                  src='/avstatic/estate-law.svg'
                  alt='Death and estate law'
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ paddingTop: "10px" }}>

                <Typography
                  variant="h3"
                  color="secondary"
                >
                  <small>Death &amp; estate law</small>
                </Typography>
              </Box>
              <Box sx={{ my: 2, paddingBottom: "20px" }}>
                <Typography
                  variant="p"
                  sx={{ my: 5 }}
                >
                  A death and estate lawyer can help you with:

                  <br />
                  <ul>
                    {[
                      "Making wills and succession planning",
                      "Trusts and estate administration",
                      "Litigation and dispute resolution",
                      "Applying for probate",
                      "Tax affairs",
                      "Asset distribution"
                    ].map((t, i) =>
                    <li key={i}>{t}</li>
                    )}
                    </ul>
                </Typography>
              </Box>
              <Box sx={{ justifyContent: 'center', position: "absolute", bottom: 0, padding: "25px 0", left:"0", width:"100%" }}
                textAlign='center' justify="space-between" >
                  <Box sx={{width:"100%"}}>
                <NextLink
                  href="/death-estate-law"
                  passHref
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: 'uppercase', py: 0, alignItems: 'flex-end' }}
                  >
                    FIND A LAWYER
                  </Button>
                </NextLink>
                </Box>
              </Box>
            </Card>
          </Grid>



        </Grid>
      </Container>

    </Box>
  )
};