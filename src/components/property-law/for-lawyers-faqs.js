import { Box, Container, Typography, Accordion, Divider, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIcon  from '@mui/icons-material/ArrowForward';
import RemoveIcon  from '@mui/icons-material/Remove';
import { useState } from 'react';

export const ForLawyersFaqs = (props) => {
  // const types = lawyerTypes.map(type => type.cat);

  const [serviceExpanded, setServiceExpanded] = useState(-1);
  const handleServiceChange = i => (_, newI) => setServiceExpanded(newI ? i : false);

  return (
    <Box
      sx={{
        backgroundColor: '#F2F1EF',
        py: 10,
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
          // alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiAccordion-region, .MuiCollapse-wrapperInner, .MuiCollapse-wrapper, .MuiAccordionDetails-root': {
            backgroundColor: '#F2F1EF',
            border: "none",
        },
        '& .MuiPaper-root': {
            boxShadow: "none",
        }
        }}
      >
        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Property law</Typography>

<Grid
          // alignItems="center"
          container
          // justifyContent="center"
          // spacing={3}
        >
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              // order: {
              //   xs: 2,
              //   md: 1,
              // },
              // pb: 20,
              // pt: !isMobile ? 0 : 20
            }}

          >

        <Typography>
          <p>Buying and selling property covers some of the most significant transactions we undertake in the
course of our lives. Property transactions can be exciting and rewarding but also stressful if we
are not in control of the process. Engaging a property lawyer helps you to remain in control of
your transaction and minimise the bureaucracy around the legal aspects of the transaction such
as conveyancing, questions of title and compliance with local law. Advocat covers all of the
lawyers involved in Property law in Australia, so tell us what you need, and we will find the right
lawyer for you and your transaction.</p>

        </Typography>

        </Grid></Grid>

        <br />
        <Divider sx={{ my: 3 }} />
        <br />
        <Grid
          // alignItems="center"
          container
          // justifyContent="center"
          // spacing={3}
        >
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              // order: {
              //   xs: 2,
              //   md: 1,
              // },
              // pb: 20,
              // pt: !isMobile ? 0 : 20
            }}

          >
        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>A property lawyer can help you with:</Typography>
        <Typography>
                <ul>
                <li>Advise you on the legal aspects of selling your property privately or tell you the obligations of
the buyer
</li><li> Help you write up the sale and purchase agreement
</li><li> Check over amendments to the sale and purchase agreement while you are in negotiations with
the buyer
</li><li> Liaise with the buyer’s lawyer
</li><li> Receive and hold the buyer’s deposit into trust account
</li><li> Arrange the release of mortgage documents as required by lending institutions, and arrange
mortgage payments
</li><li> Receive final payment from the buyer’s lawyer and arrange keys to be transferred
</li><li> Arrange for the transfer of rates payments as at the settlement date
</li><li> Forward a notice of sale to Land Information
</li><li> Help you with questions on things like insurance and title insurance</li>
                </ul>
              </Typography>

              </Grid></Grid>
              <br />
        <Divider sx={{ my: 3 }} />
        <br />

        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Frequently asked questions - conveyancing and property law</Typography>
        <br />
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={1}
        expanded={serviceExpanded === 1}
        onChange={handleServiceChange(1)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 1 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">WHAT IS THE DIFFERENCE BETWEEN A CONVEYENCER AND A LAWYER?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <p>Legal knowledge and scope to act and advise clients in property matters is essentially the key
differences between conveyancers and lawyers. If a legal question arises or a there is a dispute
about a point of law, which does happen frequently on conveyancing matters, a conveyancer
has only a limited scope to be able to deal with the issue. They are not lawyers and cannot offer
legal advice or prepare legal documents beyond a Contract of Sale.</p>

<p>The differences really come to light when a problem does arise. For conveyancers’ when an
issue does arise either it is often not dealt with fully as a conveyancer has limited scope and you
have to take your file to a lawyer for another opinion costing you time and money.</p>
<p>Often the other side will call your bluff as they know for you to assert your rights you would have
to spend money to get advice and seek a lawyer to act and quite often you can end up “rolling
over” on something because of the extra work is takes to get another opinion.</p>
<p>When these issues arise on conveyancing matters under the supervision of a lawyer, they have
the ability to advise you quickly and thoroughly without the need to package up your file and
take it elsewhere. The costs and time saving here is enormous.</p>
<p>There is no telling where and when these issues will arise, and some complex transactions can
be very simple and likewise simple matters can become extremely complex very quickly.</p>
<p>The other key difference is a lawyer usually has much more experience in negotiating difficult
and complex scenarios and settling disputes. If they have extensive litigation experience, they
are usually more skilled in providing solutions and getting the parties to an appropriate
agreement. The weight of expertise can mean a lot when you are in difficult negotiations.</p>
</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={11}
        expanded={serviceExpanded === 11}
        onChange={handleServiceChange(11)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 11 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHAT IS CONVEYANCING?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>

              <p>Conveyancing is the process of transferring ownership of a property from one person to
another. The ownership of a property is registered on the Certificate of Title.</p>
<Typography variant="p"
                sx={{ fontWeight: 'bold' }}>The process of conveyancing generally involves:</Typography>
<Typography>
                <ul>
                  <li> changing the name of the registered proprietor on title,   </li>
                  <li> removing or placing mortgages or caveats etc. on title.        </li>
                  <li> payment of monies in exchange for the property.    </li>
                  <li> finalisation of outstanding rates and fees associated with the property.         </li>
                  <li> preparing legal documentation and lodging of stamp duty.</li>
                  <li> arranging settlement with all parties; and</li>
                  <li> advising you of your rights and responsibilities under the contract of sale to meet your
contractual obligations</li>
       
                </ul>
              </Typography>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={12}
        expanded={serviceExpanded === 12}
        onChange={handleServiceChange(12)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 12 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">DO I NEED A CONVEYANCER OR LAWYER TO BUY A HOUSE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Yes, in most states you do because as settlements are online and you need to lodge stamp duty
details online.</p>
              <p>Electronic conveyancing can only be done with registered users on the relevant platforms as is
the case with submitting Duties with the State Revenue Offices.</p>
              <p>The process of conveyancing may seem simple in principle, but it is very complex in reality. You
need specialist knowledge and legal understanding to be able to settle a property and
understand all the required elements in order to settle.</p>
              <p>There are many time frames and contractual requirements that need to be complied with and
unique forms and processes when buying properties. To become very skilled requires a few
years of full-time work in a conveyancing role with high volumes.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={14}
        expanded={serviceExpanded === 14}
        onChange={handleServiceChange(14)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 14 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">HOW DO YOU ENTER INTO A CONTRACT FOR SALE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Once you have found a property you would like to purchase will be asked by the real estate
agent to sign the contract for sale and pay an initial deposit of 0.25% of the contract price. This
will remove the property from the market and stop the vendor from selling to another party.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={15}
        expanded={serviceExpanded === 15}
        onChange={handleServiceChange(15)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 15 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">ONCE A PURCHASER HAS ENTERED INTO A CONTRACT FOR SALE IF FOR ANY
REASON CAN THEY GET OUT OF IT?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>When a purchaser enters into a contract for sale they have something called a cooling-off
period which is normally the length of five (5) business days. The cooling-off period is in place so
that if for any reason the purchaser does not want to go through with the purchase they can
rescind (pull out or cancel) the contract. It is important to note that if you choose to pull out you
will forfeit the 0.25% deposit paid when signing a contract to the vendor. However, there is no
cooling off period if you have instructed your lawyer/licensed conveyancer to sign a section 66w
certificate which waives your cooling off right. A cooling off period does also not apply in an
auction. It is important to have your loan formally approved and inspections carried out before
attending an auction or before waiving your cooling off rights.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={16}
        expanded={serviceExpanded === 16}
        onChange={handleServiceChange(16)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 16 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHAT INSURANCE WOULD I NEED IF I AM BUYING?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>If you are buying a home unit, a certificate of currency should be obtained from the body
corporate’s insurer to make sure the property is adequately insured. Your lender requires details
and proof of this on or before settlement. If you are moving into the property before settlement,
the seller would probably want to make a special arrangement whereby you are responsible for
insurance from the time you take possession.</p>

            </Typography>
          </AccordionDetails>
        </Accordion>
       
      </Container>
    </Box>
  )
};