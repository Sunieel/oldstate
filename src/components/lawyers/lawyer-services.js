import { Box, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveIcon from '@mui/icons-material/Remove';

export const LawyerServices = (props) => {

    const { servicesContainerRef, servicesRef, headerHeight, premiumServices, ...other } = props;
    const [serviceExpanded, setServiceExpanded] = useState(-1);
    const handleServiceChange = i => (_, newI) => setServiceExpanded(newI ? i : false);

    return (
        <Box sx={{
            pt: "20px",
            width: "100%",
            position: "relative",
            '& .MuiAccordion-region, .MuiCollapse-wrapperInner, .MuiCollapse-wrapper, .MuiAccordionDetails-root': {
                backgroundColor: '#F2F1EF',
                border: "none",
            },
            '& .MuiPaper-root': {
                boxShadow: "none",
            }
        }}
            ref={servicesContainerRef}>
            <div id="services"
                ref={servicesRef}
                style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
            <Typography variant="h3"
                color="#FF5403" >Services</Typography>
            <br /><br />
            {premiumServices && premiumServices.map((service, i) =>
                <Accordion
                    key={i}
                    expanded={serviceExpanded === i}
                    onChange={handleServiceChange(i)}
                    sx={{
                        backgroundColor: '#F2F1EF',
                        border: "none",
                        pl: 0, ml: 0
                    }}
                >
                    <AccordionSummary
                        expandIcon={serviceExpanded === i ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
                        aria-controls={service.title + "-content"}
                        id={service.title + "-header"}
                        sx={{
                            borderTop: '2px solid #CCC',
                            backgroundColor: '#F2F1EF',
                            pl: 0, ml: 0
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 900, color: "#01023B", fontSize: "1.1em" }}
                            color="#01023B"
                        >{service.title.toUpperCase()}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        border: 'none',
                        backgroundColor: '#F2F1EF',
                        pl: 0, ml: 0,
                        '& .content h4':{
                            color: "#888",
                            textTransform: "uppercase",
                            fontWeight: "normal",
                            fontSize: "1.1em"
                        }
                    }}>
                        <div
                            className="content"
                            dangerouslySetInnerHTML={{ __html: service.content }}>
                        </div>
                        {/* {service.contents.map((content, j) => <div key={j}>
                            <Typography
                                key={j}
                                sx={{
                                    color: (content.font == "h" ? "#3A657E" : "#01023B"),
                                    fontWeight: (content.font == "h" ? 900 : "normal"),
                                    marginBottom: "10px",
                                }}
                                variant="body2"

                            >
                                {content.text}
                            </Typography>
                        </div>)} */}
                    </AccordionDetails>
                </Accordion>)}
            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
        </Box>
    )
}