import React, { forwardRef } from 'react';
import IconButton from '@mui/material/IconButton';

// Style
import useStyle from './style';
  
const IconButtonBase = forwardRef(({ children, ...rest }, ref) => {

    const classes = useStyle();

    rest.className = [
        rest.className,
        ...Object.values(classes)
    ].join(' ').trim();

    return (
        <IconButton {...rest} ref={ref}>
            { children }
        </IconButton>
    );
});

IconButtonBase.propTypes = {
    ...IconButton.propTypes
};

export default IconButtonBase;