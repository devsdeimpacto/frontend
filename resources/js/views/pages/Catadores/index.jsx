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
import CatadorFilter from './partials/CatadorFilter';

// Apis
import Api from '@/Api';

// Style
import useStyle from './style';

// Utils
import { ISOToDate } from '@/utils/formatters';

const Catadores = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();
    const classes = useStyle();

    /**
     * Hooks
     */
    usePage({
        id      : 'Planos',
        title   : 'Planos' 
    });

    const { route } = useRoute();

    //
    const columns = useMemo(() => [
        {
            label   : 'Nome',
            name    : 'nome'
        },
        {
            label   : 'CPF',
            name    : 'cpf'
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

        return data.map((item) => {

            item.nome = (
                <>
                    <strong>{ item.nome }</strong>
                </>
            );

            item.cpf = 
                <>
                    <strong>{ item.cpf }</strong>
                </>;

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
                <IconButton sx={{ border: '2px solid' }} color="primary" variant="outlined" size="small" value={item.id} title="Ver detalhes" component={NavLink} to={route('catadores')}>
                    <EastRounded fontSize="inherit" />
                </IconButton>
            );

            return item;
        });
    };

    return (
        <>
            <Crud api={`${Api.catadores}`}>
                <HeaderBreadcrumbs
                    heading="Catadores"
                    //links={[]}
                    //action={<HeaderAction />}
                />

                <Grid item sm={12}>
                    <Grid item sm={12}>
                        <Box mt={spacing(2)}>
                            <Card>
                                <Box padding={spacing(2)}>
                                    <Filter>
                                        <CatadorFilter />
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

export default Catadores; 