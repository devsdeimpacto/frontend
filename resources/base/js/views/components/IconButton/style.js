import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    root : {
        border : '2px solid transparent',
        '&[variant=contained]' : {
            background : alpha(theme.palette.primary.main, 0.33),
            color : theme.palette.color_1,
            '&.MuiIconButton-colorPrimary' : {
                background : theme.palette.primary.main,
            },
            '&.MuiIconButton-colorSecondary' : {
                background : theme.palette.secondary.main,
            },
            '&:disabled' : {
                background : theme.palette.color_7,
            },
        },
        '&[variant=outlined]' : {
            background : theme.palette.color_1,
            color : alpha(theme.palette.primary.main, 0.33),
            borderColor : alpha(theme.palette.primary.main, 0.33),
            '&.MuiIconButton-colorPrimary' : {
                color : theme.palette.primary.main,
                borderColor : theme.palette.primary.main
            },
            '&.MuiIconButton-colorSecondary' : {
                color : theme.palette.secondary.main,
                borderColor : theme.palette.secondary.main
            },
            '&:disabled' : {
                borderColor : theme.palette.color_7,
                color : theme.palette.color_7
            },
        }
    }
}));