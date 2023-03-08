import { Box, Typography, Divider, Grid } from '@mui/material';

export const LawyerAccreditations = (props) => {

    const { accreditationsContainerRef, accreditationsRef, headerHeight, premiumAccreditations, ...other } = props;

    return (
        <Box sx={{ width: "100%", position: "relative", paddingTop: "20px" }}
            ref={accreditationsContainerRef}>
            <div id="people"
                ref={accreditationsRef}
                style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
            <Typography variant="h3"
                color="#FF5403" >Accreditations &#38; awards</Typography>
            <br />
            <Grid container
                spacing={1}
                sx={{ maxWidth: "100%" }}>

                {premiumAccreditations && premiumAccreditations.map((award, i) =>
                    <Grid item
                        key={i}
                        xs={12}
                        md={2.4}

                    >
                        <Box sx={{
                            height: "200px",
                            width: "200px",
                            backgroundImage: 'url(' + award.image + ')',
                            backgroundPosition: "center",
                            backgroundSize: "180px 180px",
                            backgroundRepeat: "no-repeat",
                            // backgroundColor: "red",
                        }}
                            align="right">
                        </Box>
                    </Grid>

                )}
            </Grid>

            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
        </Box>
    )

}