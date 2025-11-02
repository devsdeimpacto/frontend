import React from 'react';
import { useRoute } from 'react-router-mapping';

import { BarChartOutlined, FeedOutlined, MapOutlined } from '@mui/icons-material';

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
                    label   : 'Ocorrências',
                    href    : route('ocorrencias'),
                    live    : true
                },
            ]
        }
    ];

    return list;
};

export default useMenu;