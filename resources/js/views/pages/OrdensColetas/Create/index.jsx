import React, { useState } from 'react';
import { Grid, Box, Typography, Card, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { useHistory, NavLink, Redirect } from 'react-router-dom';

// Partials
import ModalMessage from '@/views/partials/ModalMessage';
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';

// Components
import { Input, Select } from '@/views/components/Form';

// Apis
import api from '~/Api';

// Hooks
import usePage from '@/hooks/usePage';
import useFetch from '@/hooks/useFetch';

// Configs
import rules from '@/config/rules';

// Context
import { useUserContext } from '~/contexts/User';
import { LoadingButton } from '@mui/lab';

const PlanoCreate = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    usePage({
        id      : 'PlanoCreate',
        title   : 'Cadastrar plano' 
    });

    const { hasFullServiceAccess } = useUserContext();

    const { push } = useHistory();
    const { route } = useRoute();

    const [ openMessage, setOpenMessage ] = useState(false);
    const [ errors, setErrors ] = useState(null);

    const [ planoRequest, { headers: planoHeader } ] = useFetch(`${api.planos}`);

    const methods = useForm({
        defaultValues: {
            nome: '',
            descricao: '',
            preco_cents: '',
            qtd_parcelas: '1',
            ciclo_faturamento: '',
            features: ''
        }
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    //
    const onSubmit = async (data) => {
        try {

            const preco = data.preco_cents.replace('.', '').replace(',', '.');

            const planoResponse = await planoRequest(null, {
                method : 'POST',
                headers : {
                    ...planoHeader()
                },
                body : JSON.stringify({
                    ...data,
                    preco_cents: Math.ceil(parseFloat(preco) * 100),
                    features: data.features.split(','),
                    qtd_parcelas: parseInt(data.qtd_parcelas)
                })
            });

            if (planoResponse.status === 201) { 
                setOpenMessage(true);
            } else {
                const { message } = await planoResponse.json();
                setErrors(message);
            }
        } catch (error) {
            setErrors('Ocorreu um erro, tente novamente mais tarde ou entre em contato com o administrador.');
        }
    };

    //
    const onClose = () => {
        setOpenMessage(false);
        push(route('planos'));
    };

    return (
        <>
            { hasFullServiceAccess ?
                <>
                    <HeaderBreadcrumbs
                        heading="Adicionar um novo plano"
                        links={[
                            { name: 'Planos', href: '/planos' },
                            { name: 'Novo Plano', }
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
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Card variant="elevation" sx={{ padding: spacing(3) }}>
                                            <Box padding={spacing(2)}>
                                                <Box mt={spacing()}>
                                                    <Grid container spacing={spacing(2)}>
                                                        <Grid item sm={6}>
                                                            <Box>
                                                                <Input label="Nome" type="text" name="nome" rules={{
                                                                    required : rules.required
                                                                }} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <Box>
                                                                <Input label="Descrição" type="text" name="descricao" rules={{
                                                                    required : rules.required
                                                                }} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <Box>
                                                                <Input label="Preço" type="text" name="preco_cents" rules={{
                                                                    required : rules.required
                                                                }} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <Box>
                                                                <Input label="Parcelas" type="text" name="qtd_parcelas" rules={{
                                                                    required : rules.required
                                                                }} />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <Box>
                                                                <Select label="Ciclo Cobrança" name="ciclo_faturamento">
                                                                    <option value=""></option>
                                                                    <option value="month">Mensal</option>
                                                                    <option value="year">Anual</option>
                                                                    <option value="avulso">Avulso</option>
                                                                </Select>
                                                            </Box>
                                                        </Grid>    
                                                        <Grid item sm={12}>
                                                            <Box>
                                                                <Input label="Features" type="text" name="features" rules={{
                                                                    required : rules.required
                                                                }} />
                                                            </Box>
                                                        </Grid>                                       
                                                    </Grid>
                                                </Box>
                                            </Box>
                                            <Box mt={spacing(2)} display="flex" justifyContent="flex-end">
                                                <Box ml={spacing()}>
                                                    <Button color="error" variant="outlined" title="Cancelar" disabled={isSubmitting} style={{ marginRight : spacing() }} component={NavLink} to={route('planos')}>
                                                        Cancelar
                                                    </Button>
                                                </Box>
                                                <Box ml={spacing()}>
                                                    <LoadingButton type="submit" color="primary" variant="contained" title="Cadastrar" loading={isSubmitting}>
                                                        Cadastrar
                                                    </LoadingButton>
                                                </Box>
                                            </Box>
                                        </Card>
                                    </form>
                                </FormProvider>
                            </Box>
                        </Grid>
                    </Grid>
                    <ModalMessage open={openMessage} time={4000} onClose={onClose} message={(
                        <Typography variant="h4" color="primary">
                            Plano cadastrado com sucesso.
                        </Typography>
                    )} />
                </>
                :
                <Redirect to='/documentos'/>
            }
        </>
    );
};

export default PlanoCreate;