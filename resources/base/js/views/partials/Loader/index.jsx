import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

// Style
import useStyle from './style';

const Loader = () => {

    const classes = useStyle();

    return (
        <Backdrop className={classes.root} open>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default Loader;