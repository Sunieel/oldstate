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
import { useState } from 'react';

export const LawyerPeopleSpiel = (props) => {

    const { spiel, ...other } = props;

    const [showMore, setShowMore] = useState(false);

    return (
        
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
                    {spiel && (
                        spiel.length < 200 ? spiel
                            : (<>
                                {showMore ? spiel :
                                <>
                                {spiel.slice(0, 200)} ...
                                </>
                                }
                                <div style={{
                                    fontWeight: 900, 
                                    color:"#01023B",
                                    '& a::hover, a::visited': {
                                        color: '#01023B',
                                    }
                                    }}>
                                <br /><br />
                                {
                                    showMore ? <a href="#/"
onClick={() => setShowMore(false)}
style={{color: '#01023B'}}>HIDE</a> : <a href="#/"
onClick={() => setShowMore(true)}
style={{color: '#01023B'}}>READ MORE</a>
                                }
                                <br /><br />
                                </div>
                                </>)

                    )
                    }
                
                </Typography>
            
    )
};