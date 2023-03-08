import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Item,
  Rating,
  TextField,
  LinearProgress,
  Grid,
  Typography,
  Divider
} from '@mui/material';
import { Star as StarIcon } from '../../../icons/star';
import { getInitials } from '../../../utils/get-initials';
import { ReviewItem } from './review-item';

import { useMounted } from '../../../hooks/use-mounted';

const axios = require('axios').default;

const sortOptions = [
  {
    label: 'Newest',
    value: 'review_timestamp|desc'
  },
  {
    label: 'Highest Rating',
    value: 'review_rating|desc'
  },
  {
    label: 'Lowest Rating',
    value: 'review_rating|asc'
  },
];

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) => (sortDir === 'desc'
  ? (a, b) => descendingComparator(a, b, sortBy)
  : (a, b) => -descendingComparator(a, b, sortBy));

const applySort = (towns, sort) => {
  const [sortBy, sortDir] = sort.split('|');
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = towns.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

export const CompanyReviews = (props) => {
  const { averageRating, reviewsPerScore, placeId, reviews, ...other } = props;
  const [rating, setRating] = useState(null);
  // const [sortedReviews, setSortedReviews] = useState(null);

  const [rawRewiews, setRawReviews] = useState(null);


  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);

  const isMounted = useMounted();

  useEffect(async () => {
    if (isMounted) {
      // TODO this API is unauthenticated, because it's called from client side
      // even if user is logged out.
      // can maybe put it behind unauthenticated Cognito users to block scrapes?
      // UPDATE: we will be putting these in GraphQL instead

      try {
        console.log("GETTING REVIEWS");
        
        // DUMMY REVIEWS FOR XYZ LAWYERS (demo only)
        if(placeId === "custom.d6109539-32c7-4ba0-926d-4cc1caabdaca"){

          setRawReviews([{
            "query": "fake",
            "name": "XYZ Lawyers",
            "google_id": "fake",
            "place_id": "custom.d6109539-32c7-4ba0-926d-4cc1caabdaca",
            "reviews": 61,
            "rating": 4.9,
            "review_id": "fake",
            "author_title": "John Smith",
            "review_text": "Great service!",
            "review_rating": 5,
            "review_timestamp": 1630486377,
        },{
          "query": "fake",
          "name": "XYZ Lawyers",
          "google_id": "fake",
          "place_id": "custom.d6109539-32c7-4ba0-926d-4cc1caabdaca",
          "reviews": 61,
          "rating": 4.9,
          "review_id": "fake",
          "author_title": "Jane Doe",
          "review_text": "Helped me through a difficult time. Thank you",
          "review_rating": 4.9,
          "review_timestamp": 1630486377,
      },{
        "query": "fake",
        "name": "XYZ Lawyers",
        "google_id": "fake",
        "place_id": "custom.d6109539-32c7-4ba0-926d-4cc1caabdaca",
        "reviews": 61,
        "rating": 4.9,
        "review_id": "fake",
        "author_title": "Bob Blake",
        "review_text": "Highly recommend +++",
        "review_rating": 5,
        "review_timestamp": 1630486377,
    }]);

        } else {
          const raw = await axios.get(`https://kb1gawdrwe.execute-api.ap-southeast-2.amazonaws.com/?place_id=${placeId}`);
          // console.log(raw.data)
          // setReviews(raw.data)

          // setSortedReviews(applySort(raw.data, sort));
          setRawReviews(raw.data);
        }

        setLoading(false)

      } catch (error) {
        console.error("ERROR GETTING REVIEWS", error);
        setLoading(false);
      }
    }
  }, [isMounted]);



  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: '/avstatic/mock-images/avatars/avatar-anika_visser.png',
    name: 'Anika Visser'
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const [sort, setSort] = useState(sortOptions[0].value);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    // setSortedReviews(applySort(sortedReviews, sort));
  };

  const sortedReviews = rawRewiews ? applySort(rawRewiews, sort) : null;

  return (
    <div {...other}
      style={{ maxWidth: "100%", paddingTop: "20px" }}>
      <Box sx={{
        mb: 3, 
        '& .MuiRating-root': {
          color: "#FF5403"
        }
      }}>
        <Typography variant="h3"
          color="#FF5403" >
          Reviews
        </Typography>
        <br />
        <table>
          <tbody>
            <tr>
              <td><Rating
                value={averageRating}
                readOnly
                precision={0.1}
              /></td>
              <td><Typography variant="body2"
                color="#FF5403"
                sx={{ fontWeight: "bold" }} >
                {averageRating}
              </Typography> </td>
              <td><Typography variant="body2"
                color="#FF5403" >
                ({reviews} REVIEWS)
              </Typography> </td>
            </tr>
          </tbody>
        </table>

      </Box>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc" }} />
      {/* <Card variant="outlined"> */}
      {/* <CardContent
          sx={{
            alignItems: {
              xs: 'flex-start',
              sm: 'center'
            },
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            mt: -1,
            '& > *': {
              mr: 2,
              mt: 1
            }
          }}
        > */}
      {/* <Typography variant="subtitle2">
        Overall reviews
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Rating
          value={averageRating / 5}
          precision={0.1}
          readOnly
          max={1}
          sx={{ mr: 1 }}
        />
        <Typography variant="subtitle2">
          {averageRating}
          /5
        </Typography>
      </Box>
      <Typography
        color="textSecondary"
        variant="body2"
      >
        •
        {' '}
        {reviews}
        {' '}
        reviews in total
      </Typography> */}

      <br />

      <TextField
        label="Sort By"
        name="sort"
        onChange={handleSortChange}
        select
        SelectProps={{ native: true }}
        value={sort}
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </TextField>
      <br /><br />
      <Divider sx={{ borderBottomWidth: 2, borderColor: "#ccc" }} />

      <br />
      {/* <Box max={1}
              sx={{ mr: 1 }}>
                  <Box max={1}
              sx={{ mr: 1 }}> */}

      {/* <div sx={{width:'100%'}}></div>
              <br /><br /><br /> */}

      {/* "reviews_per_score":{"1":3,"2":0,"3":0,"4":2,"5":21}, */}

      {/* <Grid container
        spacing={2}
        sx={{ width: '50%', marginTop: '5px' }}>
        
        {[5, 4, 3, 2, 1].map((i) => (<>
          <Grid item
            xs={2}>
            <Grid container
              spacing={1}>
              <Grid item
                xs={6}>
                <Typography color="textSecondary"
                  variant="subtitle2">{i}</Typography>
              </Grid>
              <Grid item
                xs={6}>
                <Rating
                  disabled={true}
                  value={i}
                  precision={0.1}
                  readOnly
                  max={1}
                  sx={{ mr: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item
            xs={8}>
            <LinearProgress sx={{ marginTop: '10px' }}
              value={(reviewsPerScore[i + ""] / reviews) * 100}
              variant="determinate" />
          </Grid>
          
          <Grid item
            xs={2}>
            <Typography color="textSecondary"
              variant="subtitle2">{Math.round((reviewsPerScore[i + ""] / reviews) * 100)}%</Typography>
          </Grid>
        </>))}
      </Grid> */}

      {/* {reviewsPerScore[i+""]/reviews.length*100} */}


      {/* </Box><Box max={1}
          sx={{ mr: 1 }}> */}



      {/* </Box>
            </Box> */}

      {/* <Box sx={{ mt: 3 }}>
              
          <Box sx={{ mt: 1 }}>
            
          </Box>
          </Box> */}

      {/* </CardContent>
      </Card> */}
      {/* {reviews.slice(0, 2).map((review, i) => ( */}

      <Grid container
        spacing={2}
        sx={{ maxWidth: "100%" }}>
        {loading ? 'loading reviews' : !sortedReviews ? 'error loading reviews' : sortedReviews.map((review, i) => (
          // <Card
          //   key={i}
          //   sx={{ mt: 3 }}
          //   variant="outlined"
          // >
          // <CardContent>
          <Grid item
            key={i}
            xs={12}
            md={4}
            sx={{
              display: !showAll && i > 5 ? "none" : "block"
            }}>
            <ReviewItem review={review} />
          </Grid>
          //   </CardContent>
          // </Card>
        ))}

      </Grid>

      {(sortedReviews && sortedReviews.length > 5 && !showAll) && <Box align="center"><br /><Button
        variant="contained"

        sx={{
          backgroundColor: "transparent",
          border: "2px solid #01023B",
          color: "#01023B",
          marginBottom: "10px"
        }}
        onClick={() => setShowAll(true)}
      >
        SHOW ALL REVIEWS
      </Button></Box>}

      {/* <Box sx={{ mt: 3 }}>
        <Button>
          Load more
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: 3
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{ mr: 2 }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            placeholder="Send your review"
            multiline
            rows={3}
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              m: -1,
              mt: 3
            }}
          >
            <Rating
              onChange={handleRatingChange}
              sx={{ m: 1 }}
              value={rating}
            />
            <Button
              variant="contained"
              sx={{ m: 1 }}
            >
              Send Review
            </Button>
          </Box>
        </Box>
      </Box> */}
    </div>
  );
};

// CompanyReviews.defaultProps = {
//   reviews: "",
//   averageRating: ""
// };

// CompanyReviews.propTypes = {
//   reviews: PropTypes.string.isRequired,
//   averageRating: PropTypes.string.isRequired
// };
