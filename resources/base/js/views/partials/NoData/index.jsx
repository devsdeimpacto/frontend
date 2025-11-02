import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import NoDataImg from '@/../images/Erro.svg'; 

const NoData = ({ message, avatar, ...rest }) => {
    return (
        <Box mt={2} mb={2} display="flex" justifyContent="center">
            { avatar ? <div>{ avatar }</div> : <img src={NoDataImg} style={{ width: 50 }} /> }
            <Box ml={2} display="flex" alignItems="center">
                <Typography {...rest} align="center">{ message }</Typography>
            </Box>
        </Box>
    );
};

NoData.propTypes = {
    /**
	 * Recebe uma string com a mensagem 
	 */
    message : PropTypes.string,
    /**
	 * Recebe uma imagem 
	 */
    avatar : PropTypes.node,
};

NoData.defaultProps = {
    message : 'Busca sem resultado'
};

export default NoData;