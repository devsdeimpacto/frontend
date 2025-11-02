import React, { useEffect, useState } from 'react';
import { Grid, Box, Card, Alert, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRoute } from 'react-router-mapping';
import { useHistory, useParams } from 'react-router-dom';

// Partials
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';
import Loader from '@/views/partials/Loader';

// Apis
import api from '~/Api';

// Hooks
import usePage from '@/hooks/usePage';
import useFetch from '@/hooks/useFetch';
import { ISOToDate } from '@/utils/formatters';

// Style
import useStyle from '../style';

// Images
import ImageLixo from '../../../../../../resources/base/images/image-lixo.jpeg';

const PlanoDetail = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();
    const classes = useStyle();

    /**
     * Hooks
     */
    usePage({
        id      : 'PlanoDetails',
        title   : 'Detalhes do Plano' 
    });

    const { push } = useHistory();
    const { route } = useRoute();

    const { ordemId } = useParams();

    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);
    const [ ordem, setOrdem ] = useState({});

    const [ ordemRequest, { headers: ordemHeader } ] = useFetch(`${api.ordens}/ordens-servico`);

    //
    const getData = async () => {
        try {
            const ordemResponse = await ordemRequest(`/${ordemId}`, {
                method : 'GET',
                headers : {
                    ...ordemHeader()
                },
            });

            if (ordemResponse.status !== 200) {

                push(route('ordens'));

                return false;
            }

            const data = await ordemResponse.json();

            setOrdem(data);

        } catch (error) {
            setErrors('Ocorreu um erro, tente novamente mais tarde ou entre em contato com o administrador.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    return (
        loading ? 
            <Loader />
            :
            (
                <>
                    <HeaderBreadcrumbs
                        heading="Detalhes da Ordem de Serviço"
                        links={[
                            { name: 'Ordens', href: '/ordens' },
                            { name: 'Detalhes da Ordem de Serviço', }
                        ]}
                                    
                    />
                    <Grid container justifyContent="center">
                        { errors && (
                            <Grid item sm={12} xs={12}>
                                <Box sx={{ my: 6 }}>
                                    <Alert severity="error" variant='filled' elevation={2}>{ errors }</Alert>
                                </Box>
                            </Grid>
                        ) }
                        <Grid item sm={8}>
                            <Box mt={spacing(2)}>
                                <Card variant="elevation" sx={{ padding: spacing(3) }}>
                                    <Box padding={spacing(2)}>
                                        <Box mt={spacing()}>
                                            <Grid container spacing={spacing(2)}>
                                                <Grid item sm={12}>
                                                    <Typography variant='h3' color='primary'>{ ordem.numero_os }</Typography>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Typography variant='body1' color='text'>Criada: { ISOToDate(ordem.created_at) }</Typography>
                                                </Grid>
                                                <Grid item sm={12} mt={4}>
                                                    <Typography variant='h5' color='text'>{ ordem.solicitacao.nome_solicitante }</Typography>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Box display='flex' alignContent='center' alignItems='center'> 
                                                        <Typography variant='body1'>Tipo do Lixo:</Typography>
                                                        <Box ml={2}>
                                                            {
                                                                ordem.tipo_material === 'OUTROS' ? (
                                                                    <Chip label="Outros" className={classes.outros} sx={{ borderRadius: '12px' }} />
                                                                ) : ordem.tipo_material === 'VIDRO' ? <Chip label="Vidro" className={classes.vidro} sx={{ borderRadius: '12px' }} /> 
                                                                    : ordem.tipo_material === 'PAPEL' ? <Chip label="Papel" className={classes.papel} sx={{ borderRadius: '12px' }} /> 
                                                                        : ordem.tipo_material === 'PLÁSTICO' ? <Chip label="Plástico" className={classes.plastico} sx={{ borderRadius: '12px' }} />
                                                                            : ordem.tipo_material === 'METAIS' ? <Chip label="Metais" className={classes.metais} sx={{ borderRadius: '12px' }}/> 
                                                                                : <Chip label="Eletronicos" className={classes.eletronico} sx={{ borderRadius: '12px' }} />
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Typography variant='body1' color='text'>Endereço: { ordem.solicitacao.endereco }</Typography>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Box>
                                                        <img src={ImageLixo} width='500' alt="Imagem de Lixo" style={{ borderRadius: 4 }}/>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )
        
    );
};

export default PlanoDetail;