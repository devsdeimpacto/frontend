import React from 'react';
import { useRoute } from 'react-router-mapping';

import { AltRouteOutlined, BarChartOutlined, FeedOutlined, MapOutlined, PeopleOutline } from '@mui/icons-material';

const useMenu = () => {

    const { route } = useRoute();

    const list = [
        {
            subheader   : null,
            items       : [
                {
                    icon    : <BarChartOutlined/>,
                    label   : 'Dashboard',
                    href    : route('dashboard'),
                    live    : true
                },
                {
                    icon    : <MapOutlined/>,
                    label   : 'Mapa',
                    href    : route('mapa'),
                    live    : true
                },
                {
                    icon    : <FeedOutlined/>,
                    label   : 'Ordens de Coletas',
                    href    : route('ordens'),
                    live    : true
                },
                {
                    icon    : <AltRouteOutlined/>,
                    label   : 'Rotas',
                    href    : route('rotas'),
                    live    : true
                },
                {
                    icon    : <PeopleOutline/>,
                    label   : 'Catadores',
                    href    : route('catadores'),
                    live    : true
                },
            ]
        }
    ];

    return list;
};

export default useMenu;