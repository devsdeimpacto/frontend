import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Hooks
import usePage from '@/hooks/usePage';
import useFetch from '@/hooks/useFetch';

// Partials
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';

// API
import Api from '@/Api';
import Loader from '@/views/partials/Loader';

// Context
import { useUserContext } from '~/contexts/User';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {

    /**
     * Hooks
     */
    usePage({
        id      : 'dashboard',
        title   : 'Dashboard' 
    });

    const { hasFullServiceAccess } = useUserContext();

    /**
     * Styles
     */
    const { spacing } = useTheme();

    const [ dashboardRequest ] = useFetch(`${Api.metrics}`);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ dashboard, setDashboard ] = useState({});

    //
    const getData = async () => {

        setIsLoading(true);
        const dashboardResponse = await dashboardRequest();
    
        if (dashboardResponse.status === 200) {
            const data = await dashboardResponse.json();
            setDashboard(data);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        isLoading ? 
            <Loader />
            :
            (
                <>
                    { hasFullServiceAccess ?
                        <>
                            <HeaderBreadcrumbs
                                heading="Dashboard"                    
                            />

                            <Grid container spacing={spacing(2)}>
                                <Grid item sm={4}>
                                    <Paper elevation={4}>
                                        <Box p={2}>
                                            <Typography variant='h6' color='gray.500'>
                                                Total de usuários cadastrados
                                            </Typography>
                                            <Typography variant='h2' color='primary'>
                                                { dashboard.total_users }
                                            </Typography>
                                            { /* <Typography variant='caption' color='gray.500'>
                                                Últimos 7 dias
                                            </Typography> */ }
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item sm={4}>
                                    <Paper elevation={4}>
                                        <Box p={2}>
                                            <Typography variant='h6' color='gray.500'>
                                                Total de usuários ativos
                                            </Typography>
                                            <Typography variant='h2' color='primary'>
                                                { dashboard.total_active_users }
                                            </Typography>
                                            { /* <Typography variant='caption' color='gray.500'>
                                                Últimos 7 dias
                                            </Typography> */ }
                                        </Box>
                                    </Paper>
                                </Grid>
                                
                                <Grid item sm={4}>
                                    <Paper elevation={4}>
                                        <Box p={2}>
                                            <Typography variant='h6' color='gray.500'>
                                                Total de Usuários Avulso
                                            </Typography>
                                            <Typography variant='h2' color='primary'>
                                                { dashboard?.total_usuarios_avulso }
                                            </Typography>
                                            { /* <Typography variant='caption' color='gray.500'>
                                                Últimos 7 dias
                                            </Typography> */ }
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item sm={4}>
                                    <Paper elevation={4}>
                                        <Box p={2}>
                                            <Typography variant='h6' color='gray.500'>
                                                Total de Usuários Mensal
                                            </Typography>
                                            <Typography variant='h2' color='primary'>
                                                { dashboard?.total_usuarios_mensal }
                                            </Typography>
                                            { /* <Typography variant='caption' color='gray.500'>
                                                Últimos 7 dias
                                            </Typography> */ }
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item sm={4}>
                                    <Paper elevation={4}>
                                        <Box p={2}>
                                            <Typography variant='h6' color='gray.500'>
                                                Total de Usuários Anual
                                            </Typography>
                                            <Typography variant='h2' color='primary'>
                                                { dashboard?.total_usuarios_anual }
                                            </Typography>
                                            { /* <Typography variant='caption' color='gray.500'>
                                                Últimos 7 dias
                                            </Typography> */ }
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </> 
                        :
                        <Redirect to="/documentos" />
                    }
                </>
            )
    );
};

export default Dashboard;