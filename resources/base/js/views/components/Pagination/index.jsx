import React from 'react';
import { Pagination } from '@mui/material';

// Style
import useStyle from './style';
  
const PaginationBase = ({ ...rest }) => {

    const classes = useStyle();

    rest.className = [
        rest.className,
        ...Object.values(classes)
    ].join(' ').trim();

    return (
        <Pagination {...rest} color='secondary'/>
    );
};

PaginationBase.propTypes = {
    ...Pagination.propTypes
};

export default PaginationBase;