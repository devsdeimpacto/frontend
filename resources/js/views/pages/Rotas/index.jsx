import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Hooks
import usePage from '@/hooks/usePage';

// Partials
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';

const Rotas = () => {

    /**
     * Hooks
     */
    usePage({
        id      : 'mapa',
        title   : 'Mapa' 
    });

    /**
     * Styles
     */
    const { spacing } = useTheme();

    return (
        <>
            <HeaderBreadcrumbs
                heading="Rotas"                    
            />

            <Grid container spacing={spacing(2)}>
                <Grid item sm={12}>
                    <Typography variant='h3' color='primary'>
                        Data: (02/11/2025) • Turno: Manhã
                    </Typography>
                    <Typography variant='h5' color='primary'>
                        Coletor: João
                    </Typography>
                    <Typography variant='body1' color='text'>
                        Ordem de atendimento:
                    </Typography>

                    <Typography variant='body1' color='text'>
                        Ponto A – Rua XV de Novembro, Centro
                    </Typography>
                    <Typography variant='body1' color='text'>
                        Ponto B – Rua Visconde de Guarapuava, Batel
                    </Typography>
                    <Typography variant='body1' color='text'>
                        Ponto C – Avenida Iguaçu, Água Verde
                    </Typography>
                    <Typography variant='h5' color='text'>
                        Rota sugerida: Base → XV de Novembro (Centro) → Visconde de Guarapuava (Batel) → Av. Iguaçu (Água Verde) → Base
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant='h5' color='primary'>
                        Coletor: Mateus
                    </Typography>
                    <Typography variant='body1' color='text'>
                        Ordem de atendimento:
                    </Typography>

                    <Typography variant='body1' color='text'>
                        Ponto D – Rua Marechal Deodoro, Centro
                    </Typography>
                    <Typography variant='body1' color='text'>
                        Ponto F – Rua Brigadeiro Franco, Rebouças/Batel
                    </Typography>
                    <Typography variant='h5' color='text'>
                        Rota sugerida: Base → Marechal Deodoro (Centro) → Brig. Franco (Rebouças/Batel) → Base
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default Rotas;