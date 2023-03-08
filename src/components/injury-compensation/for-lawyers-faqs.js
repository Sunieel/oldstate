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
          sx={{ mb: 3 }}>Personal injury &amp; compensation law</Typography>

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
          <p>Personal injury &amp; compensation law covers legal matters that arise when an injury (physical and
            / or psychological) has happened to you or a loved one. You can seek compensation from the
            person, people, or organisation responsible for your injury.</p>


          <Typography variant="p"
sx={{ fontWeight: 'bold' }}>Because of the broad nature of personal injuries, they are subdivided into smaller legal
            categories for example:</Typography>
          <ul>
            <li> Work-related injuries or injuries resulting from commuting to work
            </li><li> Motor vehicle accidents
            </li><li> Injuries resulting from crime/assault including sexual assault
            </li><li> Injuries resulting from the use of public spaces e.g., shopping centres
            </li><li> Injuries arising from product defects</li>
          </ul>
          <p>Due to the variety in personal injuries and the fact that each State or Territory in Australia has
            different requirements from proving a claim and doling compensation it is recommended that
            before you go out and pursue your claim you first consult with a specialised lawyer. Tell us where
            you are and what you need and Advocat will find the right specialist lawyer for your
            circumstances.</p>
        </Typography>

        </Grid></Grid>
<br />
        <Divider sx={{ my: 3 }} />
        <br />

        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Employment law</Typography>

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
          <p>Employment law covers a different set of circumstances from Personal Injury and Compensation
Law. Advocat can help find you a lawyer that is a good fit for you from specialist across
Australia.</p>


          <Typography variant="p"
sx={{ fontWeight: 'bold' }}>Employment Law covers the following issues in reference to your workplace:</Typography>
          <ul>
            <li>Unfair Dismissal
            </li><li> Unfair Redundancy
            </li><li> Adverse Action
            </li><li> Workplace Harassment
            </li><li> Workplace Discrimination</li>
            <li> Workplace Investigations</li>
            <li> Sham Contracts</li>
            <li> General Protections</li>
          </ul>

          


          

        </Typography>

        </Grid></Grid>

        <br />
        <Divider sx={{ my: 3 }} />
        <br />

        <Typography variant="h3"
          color="secondary"
          sx={{ mb: 3 }}>Frequently asked questions - injury &amp; compensation</Typography>
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
            <Typography variant="h6">HOW MUCH COMPENSATION CAN I EXPECT?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography >
              The Civil Liability Act, established in 2003, places upper limits on the maximum amount of
              compensation that will be awarded for the different aspects of your claim, such as claiming for
              non-monetary or punitive damages, e.g., psychological trauma or loss of quality of life.
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
            <Typography variant="h6">IS THERE A TIME LIMIT FOR MY CLAIM?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              There is also a time limit over which you can claim against the responsible party. However, the
              time limits vary from case to case and are dependent on factors such as, the necessity or
              urgency to claim based on medical issues. For this reason, you should open your claim as soon
              after your injury as you can.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={111}
        expanded={serviceExpanded === 111}
        onChange={handleServiceChange(111)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 111 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">WHO CAN CLAIM?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Any person who has been injured within Australia, as the result of another party’s negligence
                can claim for compensation.</p>
              <p>This includes being injured in a motor vehicle accident by a licensed vehicle or if you are a
                dependent of the individual who was injured. Any form of personal injury can be claimed for,
                provided it can be shown that the cause was directly due to another&apos;s negligence or action.
                Instances of criminal assaults or injury arising from criminal action, your claim will be against
                particular parties or persons. For example, if a person unlawfully enters your house and assaults
                you, you can claim for the subsequent medical fees incurred as well as open a case of criminal
                assault.</p>
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
            <Typography variant="h6">WHAT CAN I CLAIM FOR?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                <li> Past and future medical expenses arising from your injuries.                  </li>
                <li> Past and future loss of earnings                  </li>
                <li> Funeral costs                  </li>
                <li> Non-monetary damages                  </li>
                <li> Material damages</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={122}
        expanded={serviceExpanded === 122}
        onChange={handleServiceChange(122)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 122 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">HOW DO I CLAIM?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The claims process does not happen overnight. It can take from 6 to 12 months before you will
              be compensated. The best way to initiate the claims process is to begin by consulting a
              specialist personal injury lawyer to verify the validity of your claim. Most law firms offer a free
              first consultation, during which your case will be determined, and you will be advised on how to
              proceed. Your lawyer will go through the arduous process of collecting all the documents,
              medical reports and statements on your behalf and make sure that your claim is lodged through
              the proper channels.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        sx={{
        backgroundColor: '#F2F1EF',
        border: "none",
        }}
        key={13}
        expanded={serviceExpanded === 13}
        onChange={handleServiceChange(13)}
        >
          <AccordionSummary
expandIcon={serviceExpanded === 13 ? <RemoveIcon color="secondary" /> : <ArrowForwardIcon color="secondary" />}
sx={{
    borderTop: '2px solid #CCC',
    backgroundColor: '#F2F1EF',
    pl: 0, ml: 0
}}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">HOW IS A CLAIM PROVEN?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Proving a claim against a negligent party is not a simple process and may require the advice
                and guidance of a solicitor that is specialised in personal injury claims. The majority of firms
                offer a free first consultation where the merits of your claim will be assessed. Your lawyer will
                gather all the appropriate documents and affidavits to lodge a successful claim.</p>
              <p>Note that in the case of motor vehicle accidents and work-related injuries, negligence does not
                need to be proven.</p>

              <Typography variant="p"
sx={{ fontWeight: 'bold' }}>Records and documents you may be required to provide:</Typography>
              <ul>
                <li> Medical report from a physician accepted by the insurance companies involved, describing
                  the injuries you suffered as a result of the accident and the required treatment.
                </li><li> Financial records (receipts and invoices) of medical treatment received.
                </li><li> Estimates of costs of future medical treatment that are deemed necessary
                </li><li> Financial records and reports indicating your loss of earnings and/or inability to perform
                  your job on a temporary or permanent basis.
                </li><li> A psychological report describing any trauma of post-traumatic stress disorder resulting
                  from the accident.
                </li><li> Police reports lodged by the parties involved.
                </li><li> Insurance accredited assessment of the value of material damages suffered by you (i.e.,
                  damage to your car, road, fences, pavement etc.).</li>
              </ul>
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
            <Typography variant="h6">WHAT WILL REDUCE THE VALUE OF YOUR CLAIM?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Even if the accident was not your fault at all, if you did not take appropriate responsibility for
                yourself or others with you were in your duty of care, it may be determined that your negligence
                worsened the injuries incurred as a result of the accident.</p>
              <p>The value of your claim is also limited by the economic situation of the person you are claiming
                against. This is particularly important if he/she does not have insurance, as you will then be
                calming directly from his/her pocket. However, the person might not be able to afford to pay
                compensation or cover it by selling their assets and this will reduce the amount you are
                compensated by.</p>
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
            <Typography variant="h6">WHO WILL I CLAIM FROM?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p> Depending on what personal injuries you are claiming for, you will variably claim from either
                your insurance, or the party responsible for your injuries, or both.</p>
              <p>If your claim is processed via your insurance, they will need the same documents you would
                provide a lawyer with. If the accident was not your fault at all, then your insurance will claim
                from the other party’s insurance. If that party does not have insurance, then you will have to
                seek legal action against them directly and if successful they will have to pay the compensation
                from their own money. If you are partly/wholly to blame for the accident, some of the damage
                may be covered by your insurance, but you will probably be expected to pay an excess fee.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  )
};