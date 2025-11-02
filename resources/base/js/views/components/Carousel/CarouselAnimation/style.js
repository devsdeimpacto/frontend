import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    carouselImgStyle: {
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    },
    slider: {
        '& .slick-list': {
            borderRadius: 16
        }
    }
}));