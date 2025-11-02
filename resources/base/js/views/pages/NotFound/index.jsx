import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Logo from '@/../images/logo-primary.svg';
 
// Styles
import useStyle from './style';

// Utils
import { isGuest } from '@/utils/auth';

const NotFound = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();
    const classes = useStyle();

    //
    const onClick = (e) => {

        if (!isGuest()) {

            e.preventDefault();

            window.location.href = '/';

            return false;
        }
    };

    return (
        <Box className={classes.gridContainer}>
            <Box m='auto'>
                <Box className={classes.gridImg}>
                    <img src={Logo} alt="Logo Deu Ruim Aqui" className={classes.imgNotFound}/>
                </Box>
                <Box>
                    <Typography variant="h2" align="center" color="primary">
                        Página não encontrada
                    </Typography>
                </Box>
                <Box mt={spacing()} textAlign="center">
                    <Link component={NavLink} to="/" color="primary" title="Voltar" onClick={onClick}>
                        Voltar
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFound;