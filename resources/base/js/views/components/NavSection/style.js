import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    ListSubheader: {
        ...theme.typography.overline,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        color: theme.palette.text.primary
    },
    listItem: {
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(2.5),
        color: theme.palette.grey[500],
        borderRadius: 12,
        marginBottom: 5,
        '&:hover' : {
            borderRadius: 12,
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),

            '& svg': {
                color: theme.palette.primary.main,
            }
        }
    },
    listItemIcon: {
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.grey[500]
    },
    itemActive: {
        borderRadius: 12,
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.info.main, 0.1),

        '& svg': {
            color: theme.palette.primary.main,
        }
    },
    itemSubActive: {}
}));