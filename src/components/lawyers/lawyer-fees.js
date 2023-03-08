import { Box, Typography, Divider } from '@mui/material';

export const LawyerFees = (props) => {

    const { feesContainerRef, feesRef, headerHeight, premiumFees, ...other } = props;

    return (
        <Box sx={{ width: "100%", position: "relative", paddingTop: "20px" }}
            ref={feesContainerRef}>
            <div id="people"
                ref={feesRef}
                style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
            <Typography variant="h3"
                color="#FF5403" >Fee guide</Typography>
            <br />
            <table><tbody>
                {premiumFees && premiumFees.map((fee, i) => <tr key={i}>
                    <td>{fee.title}</td>
                    <td>{fee.price}</td>
                </tr>)}
            </tbody></table>

            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
        </Box>
    )

}