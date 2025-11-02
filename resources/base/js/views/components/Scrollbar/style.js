import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    rootDiv: {
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden' 
    },
    simpleBar: {
        maxHeight: '100%',
        height: '100%',
        '& .simplebar-scrollbar': {
            '&:before': {
                backgroundColor: alpha(theme.palette.grey[600], 0.48)
            },
            '&.simplebar-visible:before': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main
            },
            '&.simplebar-visible:hover': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main
            }
        },
        '& .simplebar-track.simplebar-vertical': {
            width: 10
        },
        '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
            height: 6
        },
        '& .simplebar-mask': {
            zIndex: 'inherit'
        },
        '& .simplebar-placeholder': {
            display: 'none'
        },
    }
}));