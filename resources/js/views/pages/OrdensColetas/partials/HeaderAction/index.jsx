import React from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { useRoute } from 'react-router-mapping';
import { NavLink } from 'react-router-dom';

const HeaderAction = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    const { route } = useRoute();

    return (
        <>
           
            <Box display="flex" alignItems="center">
                
                <Box ml={spacing()}>
                    <Button color="primary" title="Adicionar plano" variant="contained" startIcon={<AddCircleOutlineRounded />} component={NavLink} to={route('planoCreate')}>
                        Criar rotas
                    </Button>
                </Box>
                { /* <Box ml={spacing()}>
                    <Button color="error" title="Excluir veículos" variant="outlined" startIcon={<RemoveCircleOutlineRounded />}>
                        Excluir veículos
                    </Button>
                </Box> */ }
            </Box>
        </>
    );
};

export default HeaderAction;