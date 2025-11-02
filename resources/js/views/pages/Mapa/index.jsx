import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

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

    const [ ordensRequest ] = useFetch(`${Api.ordens}`);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ ordens, setOrdens ] = useState([]);

    //
    const getData = async () => {

        setIsLoading(true);
        const ordensResponse = await ordensRequest();
    
        if (ordensResponse.status === 200) {
            const data = await ordensResponse.json();
            setOrdens(data.items);
            setIsLoading(false);
        }
    };

    const getIcon = (type) => {

        let color;

        switch (type) {
        case 'PLÁSTICO': color = 'blue'; break;
        case 'VIDRO': color = 'yellow'; break;
        case 'PAPEL': color = 'orange'; break;
        case 'METAIS': color = 'black'; break;
        case 'ELETRONICOS': color = 'brown'; break;
        default: color = 'red';
        }

        return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [ 25, 41 ],
            iconAnchor: [ 12, 41 ],
            popupAnchor: [ 1, -34 ],
            shadowSize: [ 41, 41 ]
        });
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
                        heading="Locais para Coletas"                    
                    />

                    <Grid container spacing={spacing(2)}>
                        <Grid item sm={12}>
                            <MapContainer 
                                center={[ -25.4284, -49.2733 ]}
                                zoom={13}
                                style={{ height: '100vh', width: '100%', borderRadius: '8px' }}
                                scrollWheelZoom={true}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                { ordens.length && ordens?.map(loc => (
                                    <Marker key={loc.id} position={[ loc.latitude, loc.longitude ]} icon={getIcon(loc.tipo_material)}>
                                        <Popup>
                                            <strong>{ loc.nome_solicitante }</strong><br/>
                                            Tipo de lixo: { loc.tipo_material }
                                        </Popup>
                                    </Marker>
                                )) }
                            </MapContainer>
                        </Grid>
                    </Grid>
                </>
            )
    );
};

export default Mapa;