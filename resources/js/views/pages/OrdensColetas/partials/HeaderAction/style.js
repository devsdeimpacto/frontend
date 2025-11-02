import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    textarea : {
        flexWrap : 'wrap'
    },
    chipError : {
        color : theme.palette.color_1,
        background : `${theme.palette.error.light} !important`,
        '&:hover' : {
            background: `${theme.palette.error.main} !important`,
        },
    }
}));