import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    root : {
        fontSize : theme.typography.pxToRem(16),
        fontWeight : 500,
        lineHeight : '22px',
        minWidth : 96,
        height : 48,
        padding : theme.spacing(0, 6),
        borderRadius : 48,
        '& .MuiButton-startIcon' : {
            marginLeft : '-4px',
            marginRight : '8px'
        },
        '& .MuiButton-endIcon' : {
            marginRight : '-4px',
            marginLeft : '8px'
        },
        transition : 'background .3s ease-out, box-shadow .3s ease-out',
        '&[color=primary]' : {
            color : theme.palette.primary.main,
        },
        '&[color=secondary]' : {
            color : theme.palette.secondary.main,
        },
        '&[color=error]' : {
            color : theme.palette.error.main,
        },
        '&:disabled' : {
            color : theme.palette.color_7,
        },
        '&[variant=contained], &[variant=outlined]' : {
            '&:hover' : {
                boxShadow : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
            },
        },
        '&[variant=contained]' : {
            background : alpha(theme.palette.primary.main, 0.33),
            color : theme.palette.color_1,
            '&[color=primary]' : {
                background : theme.palette.primary.main,
            },
            '&[color=secondary]' : {
                background : theme.palette.secondary.main,
            },
            '&[color=error]' : {
                background : theme.palette.error.main,
            },
            '&:disabled' : {
                background : theme.palette.color_7,
            },
        },
        '&[variant=outlined]' : {
            color : alpha(theme.palette.primary.main, 0.33),
            borderColor : alpha(theme.palette.primary.main, 0.33),
            '&[color=primary]' : {
                color : theme.palette.primary.main,
                borderColor : theme.palette.primary.main
            },
            '&[color=secondary]' : {
                color : theme.palette.secondary.main,
                borderColor : theme.palette.secondary.main
            },
            '&[color=error]' : {
                color : theme.palette.error.main,
                borderColor : theme.palette.error.main
            },
            '&:disabled' : {
                borderColor : theme.palette.color_7,
                color : theme.palette.color_7
            },
        }
    }
}));