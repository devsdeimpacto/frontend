import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Hooks
import usePage from '@/hooks/usePage';
import useFetch from '@/hooks/useFetch';

// Partials
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';

// API
import Api from '@/Api';
import Loader from '@/views/partials/Loader';

const Mapa = () => {

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
                    <HeaderBreadcrumbs
                        heading="Mapa"                    
                    />

                    <Grid container spacing={spacing(2)}>
                        <Grid item sm={12}>

                        </Grid>
                    </Grid>
                </>
            )
    );
};

export default Mapa;