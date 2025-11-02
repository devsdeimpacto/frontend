import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    rootDiv: {
        overflow: 'hidden',
        position: 'relative',
        '&:before, &:after': {
            top: 0,
            left: 0,
            zIndex: 8,
            width: 48,
            content: '\'\'',
            height: '100%',
            display: 'none',
            position: 'absolute',
            //backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            [theme.breakpoints.up(480)]: {
                display: 'block'
            }
        }
    },
    carouselImgStyle: {
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute'
    }
}));