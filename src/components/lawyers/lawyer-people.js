import { Box, Typography, Divider, Grid } from '@mui/material';
import { LawyerPeopleSpiel } from './lawyer-people-spiel';

export const LawyerPeople = (props) => {

    const {peopleContainerRef, peopleRef, headerHeight, premiumPeople,  ...other} = props;

    return (
        <Box sx={{ width: "100%", position: "relative", paddingTop: "20px" }}
                ref={peopleContainerRef}>
                <div id="people"
                  ref={peopleRef}
                  style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
                <Typography variant="h3"
                  color="#FF5403" >People</Typography>
                <br />
                <Grid container
                  spacing={2}
                  sx={{ maxWidth: "100%" }}>
                  {premiumPeople && premiumPeople.map((person, i) =>

                    <Grid item
                      key={i}
                      xs={12}
                      md={4}

                    >
                      <Box sx={{
                        backgroundColor: "white",
                        padding: 0,
                        borderRadius: "36px",
                        maxWidth: "280px",
                      }} >

                        <Box sx={{
                          height: "240px",
                          width: "100%",
                          backgroundImage: 'url(' + (person.image ? person.image : '/icons/no-profile-image.svg') + ')',
                          borderRadius: "36px 36px 0 0",
                          backgroundPosition: "center",
                          backgroundSize: "280px 280px",
                          backgroundRepeat: "no-repeat",
                          paddingBottom: "20px",
                          paddingRight: "25px",
                          borderBottom: "2px solid #1A504B"

                        }}
                          align="right">
                        </Box>

                        <Box sx={{
                          padding: "20px",
                        }}>

                          <Typography
                            color="#01023B"
                            variant="body2"
                            sx={{
                              fontWeight: 900,
                              textTransform: "uppercase"
                            }}
                          >
                            {person.name}
                          </Typography>
                          <Typography
                            color="#AAA"
                            variant="body2"
                          >
                            {person.title}
                          </Typography>

                          <br />

                          <Typography
                            color="#01023B"
                            variant="body2"
                          >
                            {person.specialty}
                          </Typography>

                          <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />

                          <Typography
                            color="#01023B"
                            variant="body2"
                          >
                            LOCATION: {person.location}
                          </Typography>

                          <Typography
                            color="#01023B"
                            variant="body2"
                          >
                            LANGUAGES SPOKEN: {person.languages}
                          </Typography>

                          <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />

                          <LawyerPeopleSpiel spiel={person.spiel} />

                        </Box>
                      </Box></Grid>)}
                </Grid>

                <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
              </Box>
    )

}