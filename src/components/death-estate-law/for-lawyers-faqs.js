import { Box, Container, Typography, Accordion, Divider, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon  from '@mui/icons-material/ArrowForward';
import RemoveIcon  from '@mui/icons-material/Remove';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
        '& li': {m: "8px 0"},


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
          sx={{ mb: 3 }}>Death &amp; estate law</Typography>

<Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={7}
            xs={12}
            sx={{
            }}
          >

        <Typography>
          <p>Death and Estate Lawyers can help you to deal with the death of of someone in your family,
            friend or wider community. When a person dies, their property and assets are that person’s
            estate. In most cases, the deceased person has left instructions, called a will, which says what
            they want to happen to their estate after their death. The people who will inherit the deceased
            person’s property and assets are beneficiaries. The property and assets that a beneficiary
            receives is a bequest, a legacy, or an inheritance. Most wills name an executor whose role it is to
            administer the will, sometimes the executor is a lawyer but not always; in that case the executor
            may need the assistance of a lawyer to administrate the will.</p>

          <p>Death and Estate lawyers also help you to prepare for your death and help you feel secure about
            the future of your loved ones, they can do this by making a will with you, creating trusts for your
            children and making sure your wishes are followed after your death.</p>
          <p>Death and Estate Lawyers also cover things like power of attorney, health directives, and
            superannuation.</p>

        </Typography>

        </Grid></Grid>
<br />
        <Divider sx={{ my: 3 }} />
        <br />

        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Frequently asked questions - wills, estates &amp; power of attorney</Typography>
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
            <Typography variant="h6">WHAT IS A WILL?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography >
              A will is a legal document which sets out who will receive your property and possessions when
              you die.
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
                  onChange={handleServiceChange(8)}>
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
            <Typography variant="h6">HOW DO I MAKE A VALID WILL?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>At least two witnesses are required</Typography>

              <p>You must sign your Will in front of two or more witnesses. The witnesses must also sign the Will
                either when you are present, or remotely using an audio visual link. This means that the witness
                does not need to be physically present to witness a signature as long as: one witness is a lawyer
                or justice of the peace, they can see the Will-maker sign the Will, all sign on the same day, the
                witness includes a statement that all of the requirements have been met.</p>

              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>You must have the mental capacity</Typography>

              <p>To make a valid Will you must also have testamentary capacity. This means that you are not
                suffering from a disorder of the mind or sane delusion.</p>
              <p>
                The test for testamentary capacity is that you must know and understand: what a Will is – the
                nature and the effect it has. Approximately what you have to leave in a Will – you don’t need to
                know the exact value. Any reasonable claims that may be made against your property, for
                example, a claim by someone who is financially dependent on you.</p>
              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>Avoiding a challenge by getting an affidavit</Typography>

              <p>If there is something unusual about the signing of the Will, you can get an affidavit to prevent
                possible problems or challenges later. For example, you could get a doctor to assess your
                capacity and sign an affidavit about your capacity at the time you made your Will. An affidavit
                should state that you are of sound mind and you understood what you were doing when you
                signed the document. This may prevent a later challenge to the Will. It’s a good idea to make
                sure the doctor is experienced in making these assessments. It is advisable for the doctor to
                witness the Will being signed.</p>
              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>Marriage and divorce</Typography>

              <p>Marriage and divorce affect the validity of a Will. In the case of either occurrence it is a good
                idea to review and / or revise your Will.</p>
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
                  onChange={handleServiceChange(2)}>
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
            <Typography variant="h6">WHAT IS THE ROLE OF AN EXECUTOR OF A WILL?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>An executor is a person (or sometimes more than one person) named in a Will to carry out the
                wishes of the Will-maker after their death. Often lawyers or specialist trustee companies are
                named as executors.</p>
              <Typography>
                <ul>
                  <li> collect all the assets and have them valued, if needed             </li>
                  <li> find out what debts are owed and pay them from the money made by selling the assets               </li>
                  <li> arrange tax returns          </li>
                  <li> claim life insurance                </li>
                  <li> arrange the funeral</li>
                  <li> apply for a grant of probate (they must be over 18 when they apply)</li>
                  <li> distribute the estate according to the Will</li>
                  <li> take or defend legal action on behalf of the estate.</li>
                </ul>
              </Typography>
              <p>Executors often need to hire a lawyer to assist them with some of this. <Typography variant="span"
                sx={{ fontWeight: 'bold' }}>The cost of the lawyer
                comes out of the estate.</Typography> </p>
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
                  onChange={handleServiceChange(3)}>
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
            <Typography variant="h6">HOW DO I DISPUTE OR CHALLENGE A WILL OR ESTATE?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Should you ever want to contest a will, it’s important to have a legal representative who
                understands both the legal aspects and the strong emotions that often come with these
                situations.</p>
              <p>No one likes to feel wronged. The first step is to contact an estate dispute lawyer who will work
                with you to reduce the stress and complexities of contesting a will, while building your case to
                assist you to achieve a favourable outcome.</p>
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
                  onChange={handleServiceChange(4)}>
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
            <Typography variant="h6">WHAT IS POWER OF ATTORNEY?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>At some time in your life you may be faced with an event – such as an accident or illness – that
                might take away your capacity to make your own decisions about things like:</p>
              <ul>

                <li> where you live</li>
                <li> how you spend your money</li>
                <li> what support services you may need</li>
              </ul>
              <p>If you don’t have a power of attorney you may not be able to choose who should make decisions
                on your behalf and it could lead to conflict over who should take charge of the decision-making
                process if you are unable to do this yourself.</p>
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
                  onChange={handleServiceChange(5)}>
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
            <Typography variant="h6">WHY SHOULD I GET A POWER OF ATTORNEY?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>A power of attorney gives you choice and control over who makes decisions for you when you
                are no longer able to do so. This could be because you lose the legal capacity to make
                decisions, or because you are travelling overseas and need someone to make decisions for you
                while you are away.</p>

              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>There are three types of powers:</Typography>
              <ul>
                <li>general non-enduring powers of attorney
                </li><li> supportive powers of attorney (for help with decisions)
                </li><li> general enduring powers of attorney (for financial, legal and personal decisions).</li>
              </ul>
              <Typography variant="p"
                sx={{ fontWeight: 'bold' }}>Records and documents you may be required to provide:</Typography>
              <ul>
                <li> The non-enduring power and the supportive powers of attorney documents continue until
                  you either revoke (cancel) the power or you lose legal capacity to make particular decisions.
                </li><li> An ‘enduring’ power of attorney means that your power of attorney continues when you are
                  unable to make decisions on your own.
                </li><li> The Office of the Public Advocate has information and resources including downloadable
                  forms to help you make a power of attorney.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  )
};