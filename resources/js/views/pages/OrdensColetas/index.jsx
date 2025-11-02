import React, { useMemo } from 'react';
import { Box, Card, Chip, Grid, IconButton } from '@mui/material';
import { EastRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useRoute } from 'react-router-mapping';

// Hooks
import usePage from '@/hooks/usePage';

// Partials
import Crud from '~/views/partials/Crud';
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';
import Records from '~/views/partials/Crud/Records';
import Filter from '~/views/partials/Crud/Filter';
import OrdemColeta from './partials/OrdemColeta';

// Apis
import Api from '@/Api';

// Style
import useStyle from './style';

// Utils
import { ISOToDate } from '@/utils/formatters';

const OrdensColetas = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();
    const classes = useStyle();

    /**
     * Hooks
     */
    usePage({
        id      : 'OrdensColetas',
        title   : 'Ordens de Coletas' 
    });

    const { route } = useRoute();

    //
    const columns = useMemo(() => [
        {
            label   : 'OS',
            name    : 'numero_os'
        },
        {
            label   : 'Nome Solicitante',
            name    : 'nome_solicitante'
        },
        {
            label   : 'Tipo Pessoa',
            name    : 'tipo_pessoa'
        },
        {
            label   : 'Tipo do Lixo',
            name    : 'tipo_material'
        },
        {
            label   : 'Data de Criação',
            name    : 'created_at'
        },
        {
            name    : 'flag'
        },
        {
            name    : 'actions'
        }
    ], []);

    //
    const beforeOnRender = (data) => {

        return data.items.map((item) => {

            item.numero_os = (
                <>
                    <strong>{ item.numero_os }</strong>
                </>
            );

            item.nome_solicitante = 
                <>
                    <strong>{ item.nome_solicitante }</strong>
                </>;

            item.tipo_pessoa = 
                <>
                    <strong>{ item.tipo_pessoa }</strong>
                </>;

            item.tipo_material = item.tipo_material === 'OUTROS' ? (
                <Chip label="Outros" className={classes.outros} sx={{ borderRadius: '12px' }} />
            ) : item.tipo_material === 'VIDRO' ? <Chip label="Vidro" className={classes.vidro} sx={{ borderRadius: '12px' }} /> 
                : item.tipo_material === 'PAPEL' ? <Chip label="Papel" className={classes.papel} sx={{ borderRadius: '12px' }} /> 
                    : item.tipo_material === 'PLÁSTICO' ? <Chip label="Plástico" className={classes.plastico} sx={{ borderRadius: '12px' }} />
                        : item.tipo_material === 'METAIS' ? <Chip label="Metais" className={classes.metais} sx={{ borderRadius: '12px' }}/> 
                            : <Chip label="Eletronicos" className={classes.eletronico} sx={{ borderRadius: '12px' }} />;

            item.created_at = 
                <>
                    { ISOToDate(item.created_at) }
                </>;

            item.flag = item.status === 'draft' ? (
                <Chip label="Rascunho" className={classes.templateDraft} sx={{ borderRadius: '12px' }} />
            ) : item.status === 'archive' ? <Chip label="Arquivado" className={classes.templateArquivado} sx={{ borderRadius: '12px' }} /> 
                : item.status === 'inactive' ? <Chip label="Inativo" className={classes.templateInativo} sx={{ borderRadius: '12px' }} /> 
                    : <Chip label="Ativo" className={classes.templateAtivo} sx={{ borderRadius: '12px' }} />;

            item.actions = (
                <IconButton sx={{ border: '2px solid' }} color="primary" variant="outlined" size="small" value={item.id} title="Ver detalhes" component={NavLink} to={route('ordemDetails', { ordemId: item.id })}>
                    <EastRounded fontSize="inherit" />
                </IconButton>
            );

            return item;
        });
    };

    return (
        <>
            <Crud api={`${Api.ordens}`}>
                <HeaderBreadcrumbs
                    heading="Ordens de Coletas"
                    //links={[]}
                    //action={<HeaderAction />}
                />

                <Grid item sm={12}>
                    <Grid item sm={12}>
                        <Box mt={spacing(2)}>
                            <Card>
                                <Box padding={spacing(2)}>
                                    <Filter>
                                        <OrdemColeta />
                                    </Filter>
                                </Box>
                            </Card>
                        </Box>
                    </Grid> 
                    <Grid item sm={12}>
                        <Box mt={spacing(2)}>
                            <Records.List checkable={false} columns={columns} beforeOnRender={beforeOnRender} />
                        </Box>
                    </Grid>
                </Grid>
            </Crud>
                
        </>
    );
};

export default OrdensColetas; 