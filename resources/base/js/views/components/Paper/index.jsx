import React, { forwardRef } from 'react';
import { Paper } from '@mui/material';

// Style
import useStyle from './style';
  
const PaperBase = forwardRef(({ children, ...rest }, ref) => {

    const classes = useStyle();

    rest.className = [
        rest.className,
        ...Object.values(classes)
    ].join(' ').trim();

    return (
        <Paper {...rest} ref={ref}>
            { children }
        </Paper>
    );
});

PaperBase.propTypes = {
    ...Paper.propTypes
};

export default PaperBase;