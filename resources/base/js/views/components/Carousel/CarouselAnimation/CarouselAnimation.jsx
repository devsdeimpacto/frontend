import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useRoute } from 'react-router-mapping';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, Paper, Button, Typography, CardContent } from '@mui/material';

import CarouselControlsPaging2 from '../controls/CarouselControlsPaging2';

// Styles
import useStyles from './style';

CarouselItem.propTypes = {
    item: PropTypes.object,
    to: PropTypes.string
};

function CarouselItem ({ item, to }) {

    const classes = useStyles();
    const theme = useTheme();

    const { route } = useRoute();
    const { image, title } = item;

    return (
        <Paper
            sx={{
                position: 'relative',
                paddingTop: { xs: '100%', md: '40%' },
            }}
        >
            <img className={classes.carouselImgStyle} alt={title} src={image} />
            <Box
                sx={{
                    top: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%, ${alpha(
                        theme.palette.grey[900],
                        0
                    )} 100%)`
                }}
            />
            <CardContent
                sx={{
                    bottom: 0,
                    width: '100%',
                    maxWidth: 480,
                    textAlign: 'left',
                    position: 'absolute',
                    color: 'common.white'
                }}
            >
                <Typography variant="h3" gutterBottom>
                    { item.title }
                </Typography>
                  
                <Typography variant="body2" noWrap gutterBottom>
                    { item.description }
                </Typography>
                   
                { to && 
                    <Button variant="contained" sx={{ mt: 3 }} component={NavLink} to={route(`${to}`, { id: item?.id })}>
                        Ler Mais
                    </Button> 
                }
                
            </CardContent>
        </Paper>
    );
}

export default function CarouselAnimation ({ listItems, to }) {

    const classes = useStyles();
    const theme = useTheme();
    
    const carouselRef = useRef();
    const [ currentIndex, setCurrentIndex ] = useState(theme.direction === 'rtl' ? listItems.length - 1 : 0);

    const settings = {
        speed: 2500,
        dots: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: Boolean(theme.direction === 'rtl'),
        beforeChange: (current, next) => setCurrentIndex(next),
        ...CarouselControlsPaging2({
            sx: { mt: 3 }
        }),
        responsive: [
            {
                breakpoint: 1024,
            },
            {
                breakpoint: 600,
            },
            {
                breakpoint: 480,
            }
        ]
    };

    return (
        <Card sx={{ borderRadius: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Slider ref={carouselRef} {...settings} className={classes.slider}>
                { listItems?.map((item, index) => (
                    <CarouselItem key={item.title} item={item} isActive={index === currentIndex} to={to}/>
                )) }
            </Slider>
        </Card>
    );
}

CarouselAnimation.propTypes = {
    listItems: PropTypes.array.isRequired,
    to: PropTypes.string
};