import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    title : {
        background : theme.palette.color_1,
        boxShadow: `8px 2px 8px ${alpha(theme.palette.color_3, 0.1)}`,
        position : 'relative',
        zIndex : 1,
        padding : `${theme.spacing(4)}px 0`
    }
}));