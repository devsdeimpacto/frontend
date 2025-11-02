import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Hooks
import usePage from '@/hooks/usePage';

// Partials
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';

import DonutChart from './Donut';
import LixoPorBairroChart from './LixoBairro';

const Dashboard = () => {

    /**
     * Hooks
     */
    usePage({
        id      : 'dashboard',
        title   : 'Dashboard' 
    });

    /**
     * Styles
     */
    const { spacing } = useTheme();

    return (
        <>
            <HeaderBreadcrumbs
                heading="Dashboard"                    
            />

            <Grid container spacing={spacing(2)}>
                <Grid item sm={12}>
                    <Paper elevation={4}>
                        <Box p={2}>
                            <Typography variant='h6' color='gray.500'>
                                Lixo Por Bairro
                            </Typography>
                            <LixoPorBairroChart />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={12}>
                    <Paper elevation={4}>
                        <Box p={2}>
                            <Typography variant='h6' color='gray.500'>
                                Total por Tipo de Lixo
                            </Typography>
                            <DonutChart />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </> 
    );
};

export default Dashboard;