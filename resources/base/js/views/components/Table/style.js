import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    table : {
        width : '100%',
        borderCollapse : 'separate',
        borderSpacing : theme.spacing(0, 4),
        fontSize : theme.typography.pxToRem(16),
        lineHeight : theme.typography.pxToRem(24),
    },
    thead : {
        background : theme.palette.primary.main,
        height : 32,
        borderRadius : '12px',
        '& th' : {
            color : theme.palette.color_1,
            textAlign : 'left',
            padding : theme.spacing(2, 2),
            fontWeight : 'normal',
            whiteSpace : 'nowrap',
            border : 0,
            '&:first-child' : {
                borderTopLeftRadius : '12px'
            },
            '&:last-child' : {
                borderTopRightRadius : '12px'
            }
        }
    },
    tbody : {
        background : theme.palette.color_1,
        '& tr' : {
            borderRadius: '12px',
            boxShadow: `0 0 6px ${alpha(theme.palette.color_3, 0.29)}`,
        },
        '& td' : {
            color : theme.palette.color_2,
            textAlign : 'left',
            height : theme.spacing(2),
            padding : theme.spacing(2, 2),
            width : 'auto',
            '&.actions' : {
                textAlign : 'right'
            }
        }
    },
    checkboxTHead : {
        padding : 0,
        color : theme.palette.color_1,
        '& svg' : {
            color : theme.palette.color_1
        }
    },
    checkboxTBody : {
        padding : 0
    }
}));