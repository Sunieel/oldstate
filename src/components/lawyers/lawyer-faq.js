import { Box, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveIcon from '@mui/icons-material/Remove';

export const LawyerFaq = (props) => {

    const { faqContainerRef, faqRef, headerHeight, premiumFaqs, ...other } = props;
    const [faqExpanded, setFaqExpanded] = useState(-1);
    const handleFaqChange = i => (_, newI) => setFaqExpanded(newI ? i : false);

    return (
        <Box sx={{
            width: "100%",
            position: "relative",
            paddingTop: "20px",
            '& .MuiAccordion-region, .MuiCollapse-wrapperInner, .MuiCollapse-wrapper, .MuiAccordionDetails-root': {
                backgroundColor: '#F2F1EF',
                border: "none",
            },
            '& .MuiPaper-root': {
                boxShadow: "none",
            }
        }}
            ref={faqContainerRef}>
            <div id="people"
                ref={faqRef}
                style={{ position: "absolute", top: "-" + headerHeight + "px", left: 0 }}></div>
            <Typography variant="h3"
                color="#FF5403" >Frequently asked questions</Typography>
            <br />
            <br />
            {premiumFaqs && premiumFaqs.map((faq, i) =>
                <Accordion
                    key={i}
                    expanded={faqExpanded === i}
                    onChange={handleFaqChange(i)}
                    sx={{
                        backgroundColor: '#F2F1EF',
                        border: "none",
                    }}
                >
                    <AccordionSummary
                        expandIcon={faqExpanded === i ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
                        aria-controls={faq.question + "-content"}
                        id={faq.question + "-header"}
                        sx={{
                            borderTop: '2px solid #CCC',
                            backgroundColor: '#F2F1EF',
                            pl: 0, ml: 0
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 900, color: "#01023B", fontSize: "1.1em"  }}
                            color="#01023B"
                        >{faq.question.toUpperCase()}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        border: 'none',
                        backgroundColor: '#F2F1EF',
                        pl: 0, ml: 0
                    }}>
                        <p
                            style={{
                                color: "#01023B",
                                marginBottom: "10px",
                            }}
                            // variant="body2"
                        >
                            {faq.answer}
                        </p>
                    </AccordionDetails>
                </Accordion>)}

            <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc", width: "100%", margin: "40px 0" }} />
        </Box>
    )
}