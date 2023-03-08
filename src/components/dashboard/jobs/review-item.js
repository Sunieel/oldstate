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
import { formatDistanceStrict } from 'date-fns';
import { useState } from 'react';

export const ReviewItem = (props) => {

    const { review, ...other } = props;

    const [showMore, setShowMore] = useState(false);

    return (
        <>

            <Box
                sx={{
                    maxWidth: "100%",
                    alignItems: {
                        xs: 'flex-start',
                        sm: 'center'
                    },
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row'
                    }
                }}
            >
                <Avatar
                    src={review.author_image}
                    sx={{ mr: 2 }}
                >
                </Avatar>
                <div>
                    <Typography color="#01023B"
sx={{ fontWeight: "bold" }}
variant="subtitle1">
                        {review.author_title}
                    </Typography>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            ml: -2,
                            mt: -1
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            noWrap
                            sx={{
                                ml: 2,
                                mt: 1
                            }}
                            variant="body2"
                        >
                            • {formatDistanceStrict(review.review_timestamp * 1000, new Date(), { addSuffix: true })}
                        </Typography>
                    </Box>
                </div>
            </Box>
            <div sx={{
                maxWidth: "100%",
                mt: 2,
            }}>
                <br />
                <Typography
                    sx={{
                        // display: "-webkit-box",
                        // WebkitLineClamp: 4,
                        // WebkitBoxOrient: "vertical",
                        // overflow: "hidden",
                        // pointer: "cursor",

                        fontSize: 'small'

                    }}
                    variant="body2"
                    color="#01023B"
                >
                    {review.review_text && (
                        review.review_text.length < 200 ? review.review_text
                            : (<>
                                {showMore ? review.review_text :
                                <>
                                {review.review_text.slice(0, 200)} ...
                                </>
                                }
                                <>
                                <br /><br />
                                {
                                    showMore ? <a href="#/"
onClick={() => setShowMore(false)}>SHOW LESS</a> : <a href="#/"
onClick={() => setShowMore(true)}>SHOW MORE</a>
                                }
                                <br /><br />
                                </>
                                </>)

                    )
                    }
                
                </Typography>
            </div>
            <Box sx={{
                mb: 3, '& .css-ryrseu-MuiRating-root': {
                    color: "#FF5403"
                }
            }}>
                <Rating
                    value={review.review_rating}
                    readOnly
                    precision={0.1}
                />
            </Box>


        </>
    )
};