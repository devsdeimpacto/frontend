import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Card, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Partials
import ModalMessage from '@/views/partials/ModalMessage';
import HeaderBreadcrumbs from '@/views/partials/HeaderBreadcrumbs';
import Loader from '@/views/partials/Loader';

// Components
import { Input, Select } from '@/views/components/Form';

// Apis
import api from '~/Api';

// Hooks
import usePage from '@/hooks/usePage';
import useFetch from '@/hooks/useFetch';

// Configs
import rules from '@/config/rules';

// Contexts
import { useUserContext } from '~/contexts/User';

// Utils
import { toCurrencyBRL } from '@/utils/formatters';

const PlanoDetail = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    usePage({
        id      : 'PlanoDetails',
        title   : 'Detalhes do Plano' 
    });

    const { hasFullServiceAccess } = useUserContext();

    const { push } = useHistory();
    const { route } = useRoute();

    const { planoId } = useParams();

    const [ openMessage, setOpenMessage ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ errors, setErrors ] = useState(null);

    const [ planoRequest, { headers: planoHeader } ] = useFetch(`${api.planos}`);

    const methods = useForm({
        mode : 'all',
        defaultValues : {
            nome: '',
            descricao: '',
            preco_cents: '',
            ciclo_faturamento: '',
            pagarme_planoId: '',
            features: '',
            qtd_parcelas: '0'
        }
    });

    const { handleSubmit, setValue, formState : { isSubmitting } } = methods;

    //
    const getData = async () => {
        try {
            const planoResponse = await planoRequest(`/${planoId}`, {
                method : 'GET',
                headers : {
                    ...planoHeader()
                },
            });

            if (planoResponse.status !== 200) {

                push(route('planos'));

                return false;
            }

            const data = await planoResponse.json();

            setValue('nome', data.nome);
            setValue('descricao', data.descricao);
            setValue('preco_cents', toCurrencyBRL(data.preco_cents));
            setValue('qtd_parcelas', data.qtd_parcelas);
            setValue('ciclo_faturamento', data.ciclo_faturamento);
            setValue('pagarme_planoId', data.pagarme_planoId);
            setValue('features', data.features);
            setValue('status', data.status);

        } catch (error) {
            setErrors('Ocorreu um erro, tente novamente mais tarde ou entre em contato com o administrador.');
        } finally {
            setLoading(false);
        }
    };

    //
    const onSubmit = async (data) => {
        try {

            const preco = data.preco_cents.replace('R$', '').replace('.', '').replace(',', '.').trim();

            const planoResponse = await planoRequest(`/${planoId}`, {
                method : 'PATCH',
                headers : {
                    ...planoHeader()
                },
                body : JSON.stringify({
                    ...data,
                    preco_cents: Math.ceil(parseFloat(preco).toFixed(2) * 100),
                    features: data.features.length == 0 ? data.features.split(',') : data.features,
                    qtd_parcelas: parseInt(data.qtd_parcelas)
                })
            });

            if (planoResponse.status === 200) { 

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

    useEffect(() => {
        setLoading(true);
        getData();
        setEdit(false);
    }, []);

    return (
        loading ? 
            <Loader />
            :
            (
                <>
                    { hasFullServiceAccess ?
                        <>
                            <HeaderBreadcrumbs
                                heading="Atualizar plano"
                                links={[
                                    { name: 'Planos', href: '/planos' },
                                    { name: 'Atualizar Plano', }
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
                                                                        <Input label="Nome" skeleton={loading} disabled={!edit} type="text" name="nome" rules={{
                                                                            required : rules.required
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Input label="Descrição" skeleton={loading} disabled={!edit} type="text" name="descricao" rules={{
                                                                            required : rules.required
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Input label="Preço" skeleton={loading} disabled={!edit} type="text" name="preco_cents" rules={{
                                                                            required : rules.required
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Input label="Parcelas" skeleton={loading} disabled={!edit} type="text" name="qtd_parcelas" rules={{
                                                                            required : rules.required
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Select label="Ciclo de Cobrança" name="ciclo_faturamento" skeleton={loading} disabled={!edit}>
                                                                            <option value=""></option>
                                                                            <option value="month">Mensal</option>
                                                                            <option value="year">Anual</option>
                                                                            <option value="avulso">Avulso</option>
                                                                        </Select>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Input label="ID Pagar.me" skeleton={loading} disabled type="text" name="pagarme_planoId" rules={{
                                                                            required : false
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={6}>
                                                                    <Box>
                                                                        <Select label="Status" name="status" skeleton={loading} disabled={!edit}>
                                                                            <option value=""></option>
                                                                            <option value="active">Ativo</option>
                                                                            <option value="inactive">Inativo</option>
                                                                        </Select>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sm={12}>
                                                                    <Box>
                                                                        <Input label="Features" skeleton={loading} disabled={!edit} type="text" name="features" rules={{
                                                                            required : rules.required
                                                                        }} />
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                    <Box mt={4} display="flex" justifyContent="flex-end">
                                                        {
                                                            !edit ? (
                                                                <Button type="submit" color="primary" variant="contained" title="Editar" startIcon={<EditOutlined />} onClick={() => setEdit(true)}>
                                                                    Editar
                                                                </Button>
                                                            ):
                                                                <>
                                                                    <Box mr={2}>
                                                                        <Button color="error" variant="outlined" title="Cancelar" disabled={isSubmitting} onClick={onClose}>
                                                                            Cancelar
                                                                        </Button>
                                                                    </Box>
                                                                    <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
                                                                        Salvar alterações
                                                                    </LoadingButton>
                                                                </>
                                                        }
                                                    </Box>
                                                </Card>
                                            </form>
                                        </FormProvider>
                                    </Box>
                                </Grid>
                            </Grid>
                            <ModalMessage open={openMessage} time={4000} onClose={onClose} message={(
                                <Typography variant="h4" color="primary">
                                    Plano atualizado com sucesso.
                                </Typography>
                            )} />
                        </>
                        :
                        <Redirect to='/documentos'/>
                    }
                </>
            )
        
    );
};

export default PlanoDetail;