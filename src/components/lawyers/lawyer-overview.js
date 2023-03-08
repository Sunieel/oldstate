import { Box, Typography, Divider, Grid } from '@mui/material';
import Image from 'next/image';

export const LawyerOverview = (props) => {

    const { overviewContainerRef, overviewRef, headerHeight, premiumOverview, type, features, ...other } = props;

    return (
        <Box sx={{ width: "100%", position: "relative", paddingTop: "60px" }}
            ref={overviewContainerRef}>
            <div id="overview"
                ref={overviewRef}
                style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
            


            <Grid
                container
            >
                <Grid
                    item
                    md={8}
                    xs={12}
                    sx={{

                        pr: {
                            md: 10,
                            xs: 0
                        }

                    }}

                >

<Typography variant="h3"
                color="#FF5403" >Overview</Typography>
            <br />


                    <div>
                        <div
                            className="content"
                            dangerouslySetInnerHTML={{ __html: premiumOverview }}>
                        </div>
                    </div>

                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                    sx={{
                    }}

                >


                    <Box sx={{
                        backgroundColor: "white",
                        padding: 3,
                        borderRadius: "36px",
                        color: "#01023B",
                        '& li::before': {
                            content: '"--"',
                            letterSpacing: "-0.2em",
                            fontSize: "1.2em",
                            color: "red",
                            display: "inline-block",
                            width: "1em",
                            marginLeft: "-1em",
                        },
                        '& ul': { listStyle: "none", ml: 0, p: "0 18px", m: "2px 0" },
                        '& li': { m: "2px 0" },

                    }}>
                        {/* {features && features.includes("book-online") && <>

                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 60 }}>
                                            <Image
                                                src="/avstatic/BookOnline.png"
                                                // layout="responsive"
                                                width={60}
                                                height={60}
                                            />

                                        </td>
                                        <td>
                                            <Typography sx={{ fontSize: '1.2em', p: 1 }}>BOOK ONLINE</Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />
                        </>} */}

                        {features && features.includes("fixed-fees") && <>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 60 }}>
                                            <Image
                                                src="/avstatic/FixedFees.png"
                                                // layout="responsive"
                                                width={55}
                                                height={55}
                                            />

                                        </td>
                                        <td>
                                            <Typography sx={{ fontSize: '1.1em', p: 1, pl: 2 }}>FIXED FEES</Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />

                        </>}

                        {features && features.includes("free-first-appointment") && <>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 60 }}>
                                            <Image
                                                src="/avstatic/FreeFirstAppointment.png"
                                                // layout="responsive"
                                                width={55}
                                                height={55}
                                            />

                                        </td>
                                        <td>
                                            <Typography sx={{ fontSize: '1.1em', p: 1, pl: 2 }}>FREE FIRST APPOINTMENT</Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />

                        </>}

                        {features && features.includes("no-win-no-fee") && <>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 60 }}>
                                            <Image
                                                src="/avstatic/NoWinNoFee.png"
                                                // layout="responsive"
                                                width={60}
                                                height={50}
                                            />

                                        </td>
                                        <td>
                                            <Typography sx={{ fontSize: '1.1em', p: 1, pl: 2 }}>NO WIN, NO FEE*</Typography>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "10px 0" }} />

                        </>}


                        <br />
                        <Typography sx={{ fontSize: '0.9em', fontWeight: "bold" }}>AREAS OF LAW:</Typography>
                        <ul><li>{type}</li></ul>

                    </Box>


                    {features && features.includes("no-win-no-fee") && <>
                        <br />
                        <Typography sx={{ fontSize: '0.7em' }}>*Terms about No win, no fee to appear here</Typography>
                    </>
                    }
                </Grid>
            </Grid>


            {/* {premiumOverview && premiumOverview.map((content, j) =>
                <Typography
                    key={j}
                    sx={{
                        color: "#01023B",
                        fontWeight: (content.font == "h" ? 900 : "normal"),
                        marginBottom: "10px",
                    }}
                    variant="body2"
                >
                    {content.text}
                </Typography>
            )} */}
            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
        </Box>
    )

}