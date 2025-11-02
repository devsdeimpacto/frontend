import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    button : {
        color  : theme.palette.color_11,
    },
    toolbar : {
        zIndex : 1,
        bottom : theme.spacing(4),
        marginTop : theme.spacing(4),
        position:'fixed',
        top: 'auto', 
        width: '77%'
    },
    avatar : {
        color : theme.palette.primary.main,
        background : theme.palette.color_15,
        marginRight : theme.spacing(2),
    },
}));