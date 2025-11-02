import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    root : {
        boxShadow: `0 0 6px ${alpha(theme.palette.color_3, 0.29)}`,
        '& h3' : {
            margin : 0,
            width : '100%',
            cursor : 'pointer'
        },
        '&.Mui-disabled' : {
            background  : 'none'
        },
        '& .MuiAccordionSummary-root, & .MuiAccordionDetails-root' : {
            padding : `0 ${theme.spacing(4)}px`,
            minHeight : '80px',
            margin : 0
        },
        '& .MuiAccordionSummary-root' : {
            '& .MuiIconButton-edgeEnd' : {
                margin : 0,
                padding : 0,
                background : theme.palette.secondary.main,
                color : theme.palette.color_1,
                marginLeft : `${theme.spacing(4)}px`,
            }
        }
    }
}));