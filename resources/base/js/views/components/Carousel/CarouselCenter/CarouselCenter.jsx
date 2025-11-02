import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useRoute } from 'react-router-mapping';
import { alpha, useTheme } from '@mui/material/styles';
import { Paper, Button, Typography, CardContent } from '@mui/material';

// Styles
import useStyles from './style';
import CarouselControlsArrowsBasic2 from '../controls/CarouselControlsArrowsBasic';

CarouselItem.propTypes = {
    item: PropTypes.object,
    to: PropTypes.string,
    size: PropTypes.number,
};

function CarouselItem ({ item, to, size }) {

    const classes = useStyles();

    const { route } = useRoute();
    const { image, title } = item;

    return (
        <Paper
            sx={{
                mx: 2,
                borderRadius: 2,
                overflow: 'hidden',
                paddingTop: `calc(16 /9 * ${size ? size : 60}%)`,
                position: 'relative',
                '&:hover img': {
                    width: '120%',
                    height: '120%'
                },
                marginRight: 0
            }}
        >
            <img className={classes.carouselImgStyle} alt={title} src={image} />
            
            <CardContent
                sx={{
                    bottom: 0,
                    zIndex: 9,
                    width: '100%',
                    textAlign: 'left',
                    position: 'absolute',
                    color: 'common.white',
                    backgroundImage: (theme) =>
                        `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(theme.palette.grey[900], 0)} 100%)`
                }}
            >
                <Typography variant="h4" gutterBottom>
                    { item.title }
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

export default function CarouselCenter ({ listItems, to, size }) {

    const classes = useStyles();
    const theme = useTheme();
    const carouselRef = useRef();
    const [ currentIndex, setCurrentIndex ] = useState(theme.direction === 'rtl' ? listItems.length - 1 : 0);

    const settings = {
        arrows: true,
        rtl: Boolean(theme.direction === 'rtl'),
        beforeChange: (current, next) => setCurrentIndex(next),
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '60px',
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: '0' }
            }
        ]
    };

    const handlePrevious = () => {
        carouselRef.current.slickPrev();
    };
    
    const handleNext = () => {
        carouselRef.current.slickNext();
    };

    return (
        <div className={classes.rootDiv}>
            <Slider ref={carouselRef} {...settings}>
                { listItems?.map((item, index) => (
                    <CarouselItem key={item.title} item={item} size={size} isActive={index === currentIndex} to={to}/>
                )) }
            </Slider>
            <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
        </div>
    );
}

CarouselCenter.propTypes = {
    listItems: PropTypes.array.isRequired,
    to: PropTypes.string,
    size: PropTypes.number
};