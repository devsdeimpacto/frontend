import { makeStyles } from '@mui/styles';
import { bgBlur } from '@/utils/cssStyles';

const NAV_WIDTH = 240;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

export default makeStyles((theme) => ({
    appBar: {
        ...bgBlur({ color: theme.palette.background.default }),
        boxShadow: 'none',
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${NAV_WIDTH + 1}px)`,
        },
        zIndex: 10
    },
    toolBar: {
        minHeight: HEADER_MOBILE,
        [theme.breakpoints.up('lg')]: {
            minHeight: HEADER_DESKTOP,
            paddingLeft: '40px',
            paddingRight: '40px'
        },
    }
}));