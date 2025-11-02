import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import { Box } from '@mui/material';

import 'simplebar-react/dist/simplebar.min.css';

// Styles
import useStyles from './style';

Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default function Scrollbar ({ children, sx, ...other }) {

    const classes = useStyles();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        return (
            <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                { children }
            </Box>
        );
    }

    return (
        <div className={classes.rootDiv}>
            <SimpleBarReact className={classes.simpleBar} timeout={500} autoHide={true} sx={sx} {...other}>
                { children }
            </SimpleBarReact>
        </div>
    );
}