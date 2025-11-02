import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    progress : {
        width : '100%',
        height : '1px',
        position : 'absolute',
        bottom : 0,
        left : 0
    },
    input : {
        '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration' : {
            background : 'red',
            WebkitAppearance : 'none !important'
        }
    }
}));