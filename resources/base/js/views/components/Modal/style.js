import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    paper : {
        background : theme.palette.color_1,
        borderRadius : 16,
        boxShadow : `0 0 8px ${alpha(theme.palette.color_3, 0.29)}`
    },
    root : {
        '& .MuiBackdrop-root' : {
            background : alpha(theme.palette.color_1, .1),
            backdropFilter : 'blur(5px)',
        },
        '& .MuiDialogTitle-root' : {
            padding : `${theme.spacing(4)}px ${theme.spacing(4)}px 0`,
            '& .MuiIconButton-root' : {
                minWidth : 0,
                float : 'right',
                padding : 0,
                '& .MuiSvgIcon-root' : {
                    color : theme.palette.primary.main,
                    verticalAlign : 'middle',
                    fontSize : theme.typography.pxToRem(32)
                }
            }
        },
        '& .MuiDialogContent-root' : {
            padding : `${theme.spacing(4)}px ${theme.spacing(4)}px`
        }
    }
}));