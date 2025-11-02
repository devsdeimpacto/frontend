import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    root : {
        background : alpha(theme.palette.common.white, .1),
        backdropFilter : 'blur(5px)',
        zIndex : 1
    }
}));