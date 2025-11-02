import React from 'react';
import PropTypes from 'prop-types';

// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// ----------------------------------------------------------------------

const SIZE = 40;

const ICON_SIZE = {
    width: 30,
    height: 30
};

const RootStyle = styled(Box)(({ theme }) => ({
    top: 0,
    bottom: 0,
    zIndex: 9,
    height: SIZE,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    position: 'absolute',
    padding: theme.spacing(0, 2),
    justifyContent: 'space-between'
}));

const ArrowStyle = styled(IconButton)(({ theme }) => ({
    width: SIZE,
    height: SIZE,
    opacity: 0.48,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    background: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadiusSm,
    transition: theme.transitions.create('opacity'),
    '&:hover': {
        opacity: 1,
        background: theme.palette.grey[900]
    }
}));

// ----------------------------------------------------------------------

CarouselControlsArrowsBasic2.propTypes = {
    arrowLine: PropTypes.bool,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func
};

export default function CarouselControlsArrowsBasic2 ({ arrowLine, onNext, onPrevious, ...other }) {
    const theme = useTheme();
    const isRTL = theme.direction === 'rtl';

    return (
        <RootStyle {...other}>
            <ArrowStyle size="small" onClick={onPrevious}>
                { arrowLine ? (
                    <>
                        { isRTL ? <KeyboardArrowRight sx={{ ...ICON_SIZE }} /> : <KeyboardArrowLeft sx={{ ...ICON_SIZE }} /> }
                    </>
                ) : (
                    <>
                        { isRTL ? <KeyboardArrowRight sx={{ ...ICON_SIZE }} /> : <KeyboardArrowLeft sx={{ ...ICON_SIZE }} /> }
                    </>
                ) }
            </ArrowStyle>

            <ArrowStyle size="small" onClick={onNext}>
                { arrowLine ? (
                    <>
                        { isRTL ? <KeyboardArrowLeft sx={{ ...ICON_SIZE }} /> : <KeyboardArrowRight sx={{ ...ICON_SIZE }} /> }
                    </>
                ) : (
                    <>
                        { isRTL ? <KeyboardArrowLeft sx={{ ...ICON_SIZE }} /> : <KeyboardArrowRight sx={{ ...ICON_SIZE }} /> }
                    </>
                ) }
            </ArrowStyle>
        </RootStyle>
    );
}