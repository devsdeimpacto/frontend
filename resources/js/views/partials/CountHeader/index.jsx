import React from 'react';
import { Typography, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

// Partials
import { useCrudContext } from '~/views/partials/Crud';

const CountHeader = ({ message }) => {

    const { tabs: { info }, pagination } = useCrudContext();

    return info.tab0 ? (
        <Typography variant='body2'>Exibindo <strong>{ (pagination.pageSize * (info.tab0.current - 1)) + info.tab0.count }</strong> de <strong>{ info.tab0.total }</strong> { message }</Typography>
    ) : <Skeleton variant="text" width="300px" height="24px" />;
};

CountHeader.propTypes = {
    /**
	 * Recebe uma string com a mensagem 
	 */
    message : PropTypes.string,
};

CountHeader.defaultProps = {
    message : 'registro(s)'
};

export default CountHeader;