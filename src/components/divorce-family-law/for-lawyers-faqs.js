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
        '& ul li::before' : {
          content: '"--"', 
          letterSpacing: "-0.2em",
          fontSize: "1.2em",
          color: "red",
          display: "inline-block",
          width: "1em",
          marginLeft: "-1em",
        },
        // '& ol li::before' : {
        //   // content: '"-0"', 
        //   // letterSpacing: "-0.2em",
        //   // fontSize: "1.2em",
        //   // color: "red",
        //   // display: "inline-block",
        //   // width: "1em",
        //   // marginLeft: "-1em",
        // },
        '& ul': {listStyle: "none", ml: 0, p: "0 18px", m: "10px 0"},
        '& ol': { ml: 0, p: "0 18px", m: "10px 0"},
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
          sx={{ mb: 3 }}>Family law, divorce and separation</Typography>

        <Typography>
          <p>Divorce and separation are some of the most stressful and emotional experiences we can go
through. Advocat covers all Family law providers in Australia so you can quickly find the right
lawyer for you. Our firms are ranked by the quality of their reviews and feedback from their
clients. Some firms will offer free initial consultations as well as online meeting facilities so you
don’t have to travel to their offices unless you want to. Some of our firms will offer fixed fees for
each stage of your matter taking you off the “taxi meter” so you have some certainty about how
much you will spend on their services. We will give you a list of the best lawyers for you based on
the key things you have told us in your search. The family law firms in Advocat’s database are
experts at dealing with financial settlements, children and parenting matters, property and pets.
Some firms have expertise in cases where one or more of the parties no longer lives in Australia.
Just tell Advocat what you need and we will find the right lawyer for you.</p>

        </Typography>

        </Grid></Grid>

        <br />
        <Divider sx={{ my: 3 }} />
        <br />
        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>A family lawyer can help you with:</Typography>
        <Typography>
                <ul>
                <li>Divorce
</li><li> Separation
</li><li> De facto arrangements
</li><li> Children, custody and parenting
</li><li> Financial settlements
</li><li> Property matters
</li><li> Court Orders
</li><li> Orders concerning children
</li><li> Intervention Orders
</li><li> Preparing for court
</li><li> Pets</li>
                </ul>
              </Typography>

              <br />
        <Divider sx={{ my: 3 }} />
        <br />

        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Frequently asked questions - divorce and family law</Typography>
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
            <Typography variant="h6">DO I NEED A LAWYER?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography >
            <p>When you are faced with family breakdown, divorce, or another family law problem, one of the
decisions you need to make is whether you need a lawyer. Some families find their way through
their legal issues without legal advice or representation. It really depends on how difficult your
situation is and what is at stake.</p>
<Typography variant="p"
                sx={{ fontWeight: 'bold' }}>The checklist below may help you decide whether you need a lawyer to help you.</Typography>
            </Typography>
            <p>If you answer ‘yes’ to any of the questions below, you are more or likely to benefit from legal
advice:</p>
            <Typography>
                <ul>
                  <li> Are there children involved?           </li>
                  <li> Are you unsure of what you are entitled to?              </li>
                  <li> Has your partner hired a lawyer?         </li>
                  <li> Is violence an issue or a possible issue?               </li>
                  <li> Do you feel emotionally unprepared to handle the negotiations yourself?</li>
                  <li> Is there likely to be a disagreement over the dividing of the property or assets?</li>
                  <li> Is your partner likely to want to move interstate, overseas or far away with your children?</li>
                  <li> Are you transferring assets between yourselves and require assistance in obtaining an
exception from the payment of stamp duty or tax?</li>
                </ul>
              </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={2}
        expanded={serviceExpanded === 2}
        onChange={handleServiceChange(2)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 2 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">DO ALL FAMILY LAW MATTERS GO TO COURT?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>

              <p>Statistics show that approximately 85% of family law disputes are resolved without the court
being required to make a decision. In other words, parties have agreed on an outcome and
have only used the court to formalise that agreement or have decided that they do not require
the agreement to be formalised at all. Further, of the applications that are filed with the court
for determination only approximately 2% actually proceed to a final determination by a Judge
or Federal Magistrate. The remaining 13% of cases are settled after the case has been filed in
court but before the handing down of a final judgment.</p>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={3}
        expanded={serviceExpanded === 3}
        onChange={handleServiceChange(3)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 3 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHAT IS A DIVORCE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Divorce is the legal ending of a marriage.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={4}
        expanded={serviceExpanded === 4}
        onChange={handleServiceChange(4)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 4 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHAT IS A SEPERATION?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>The decision made by a party to a relationship to end the relations and then the communicating
of that decision to the other party. For a Divorce to be granted, there must have been an
irretrievable breakdown of the marriage and the parties must have been separated for at least
12 months immediately prior to the Divorce Application being made.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={5}
        expanded={serviceExpanded === 5}
        onChange={handleServiceChange(5)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 5 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHAT IS A DE FACTO RELATIONSHIP?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>A de facto relationship is defined as a genuine domestic relationship with another partner for a
period of at least two years. The Family Court Act gives legal rights to those in de facto
relationships including disputes regarding children and property settlements.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={6}
        expanded={serviceExpanded === 6}
        onChange={handleServiceChange(6)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 6 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">DOES A DIVORCE DEAL WITH MY PROPERTY AND CHILDRENS MATTERS AS
WELL?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>A Divorce does not deal with issues relating to property and children’s matters, so it is necessary
for Applications for property settlement and/or spousal maintenance to be made within 12
months of obtaining your Divorce. A lawyer can help you with this.</p>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={7}
        expanded={serviceExpanded === 7}
        onChange={handleServiceChange(7)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 7 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">HOW MUCH TIME WILL A COURT DETERMINE EACH PARENT GETS TO SPEND
WITH THE CHILDREN?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>The amount of time children spends with each of their parents will depend upon a number of
factors, including the age of the children, the living arrangements of each of the parents and
the attitude of the parents to each other and to the children. If you and your partner or spouse
have shared parental responsibility for the children, then the Court will consider whether there
should be a shared care agreement. If that is not in the best interests of the children, or is not
reasonably practicable for any reason, the Court will consider the children spending time with
the other parent and the terms on which that should take place.</p>
<p>
A lawyer can assist you and provide you with advice as to the factors to be taken into account
in your individual circumstances.
</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={8}
        expanded={serviceExpanded === 8}
        onChange={handleServiceChange(8)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 8 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">HOW DOES THE COURT DETERMINE WHO GETS WHAT IN A PROPERTY
SETTLEMENT AFTER SEPARATION?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Following a separation, Section 79 of the Family Law Act 1975 asks a few questions in order to
determine the division of assets.</p>
<Typography variant="p"
                sx={{ fontWeight: 'bold' }}>Here is the four-step process:</Typography>
                <ol>
                <li>Determine the net assets, including liabilities and superannuation of the parties.</li>
<li>Look at the financial contributions of each party to the married or de-facto relationship.
<p>Financial contributions include wages and lotto winnings.</p>
<p>Parental contributions are the duties performed by the parents including raising the children,
dropping them off to school and helping with their homework.</p>
<p>Homemaker contributions are the domestic duties performed in the relationship, for example,
cooking dinner. The quality of the homemaker contribution is irrelevant to the court.</p>
<p>Non-financial contributions are contributions that have resulted in the increased size of the
net asset pool. An example would be renovations to a house.</p>
</li>
<li>The party’s future needs, including any health issues and the ability to earn money.</li>
<li>The overall outcome is just and equitable. The court will look to see if the proposed settlement
is fair and takes into account the contributions made by both parties and their current and
future needs.</li>
</ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={9}
        expanded={serviceExpanded === 9}
        onChange={handleServiceChange(9)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 9 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">DOES A DIVORCE DEAL WITH MY PROPERTY AND CHILDRENS MATTERS AS
WELL?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>A Divorce does not deal with issues relating to property and children’s matters, so it is necessary
for Applications for property settlement and/or spousal maintenance to be made within 12
months of obtaining your Divorce. A lawyer can help you with this.</p>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={10}
        expanded={serviceExpanded === 10}
        onChange={handleServiceChange(10)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 10 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">ARE THERE TIME LIMITS FOR A PROPERTY SETTLEMENT?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>A property settlement after separation does come with some time limits. A married couple must
apply for a property settlement within 12 months of a divorce finalisation, whereas a de-facto
couple must apply within two years of separation.</p>
<p>Couples who fail to commence property settlement proceedings within these time limits may
lose their ability to apply to the court. However, it is possible to seek the court’s permission to
apply for a property settlement “out of time”. This is not guaranteed and can be quite costly.</p>

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
            <Typography variant="h6">HOW IS A PROPERTY SETTLEMENT FINALISED?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>If both parties have reached an agreement, the best way to finalise and formalise a property
settlement after separation is through Consent Orders. A consent order is a written agreement
that is approved by a court. In property matters, the Court must be satisfied that the settlement
is just and equitable.</p>
<p>Another option to formalise a property settlement is through a binding financial agreement.
This agreement does not require the court’s approval, however, it does require legal advice,
preferably from an independent law firm, prior to execution.</p>

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
            <Typography variant="h6">WHO GETS THE PETS IN A SEPARATION OR DIVORCE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>The Family Law Act hasn’t (yet) distinguished pets from property, and will consider pets in the
same way they might consider the family car:</p>
              <Typography>
                <ul>
                  <li> Who purchased the pet?     </li>
                  <li> Who cares for it?          </li>
                  <li> Who feeds it?     </li>
                  <li> Who pays for the insurance?               </li>
                  <li> Whose name is it registered in?</li>
       
                </ul>
              </Typography>
              <p>All of these factors help determine the overall ‘ownership’ of the item of property in question,
and will ultimately help you decide if keeping the pet independently is something you can
commit to either jointly, solo, or not at all.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  )
};