import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Grid, Box, Typography, Link, Alert } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { useTheme } from '@mui/material/styles';

// Components
import { Input } from '@/views/components/Form';

// Partials
import ModalMessage from '@/views/partials/ModalMessage';

// Hooks
import useFetch from '@/hooks/useFetch';

// Api
import api from '@/Api';

// Utils
import { isEmail } from '@/utils/validators';

// Config
import rules from '@/config/rules';
import { LoadingButton } from '@mui/lab';

const UpdatePassword = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const [ openModal, setOpenModal ] = useState(false);

    const methods = useForm();
    const { handleSubmit, formState : { isSubmitting } } = methods;

    const [ accountRecover ] = useFetch(api.users);
    const { route } = useRoute();
    const { push } = useHistory();

    const [ errors, setErrors ] = useState(null);

    //
    const onSubmit = async (data) => {
        try {
            const response = await accountRecover('reset-password', {
                method : 'POST',
                body : JSON.stringify({
                    email: data.email,
                    code: data.code,
                    password: data.password
                })
            });
        
            if (response.status === 200) {

                setOpenModal(true);

                return false;
            } else {
                const { message } = await response.json();
                setErrors(message);
            }
       
        } catch (error) {
            setErrors('Ocorreu um erro, tente novamente mais tarde ou entre em contato com o administrador.');
        }
    };

    //
    const onClose = () => {

        setOpenModal(false);
        push(route('login'));
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={spacing(2)}>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Typography variant='h4' color='primary'>Recuperação de Senha</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant='body1'>
                                    Preencha os campos abaixo para poder realizar a recuperação da sua senha.
                                </Typography>
                            </Box>
                        </Grid>
                        { errors && (
                            <Grid item sm={12} xs={12}>
                                <Box sx={{ my: 6 }}>
                                    <Alert severity="error" variant='filled' elevation={2}>{ errors }</Alert>
                                </Box>
                            </Grid>
                        ) }
                        <Grid item sm={12} xs={12} mt={8}>
                            <Box mb={4}>
                                <Input label="E-mail" type="text" name="email" rules={{
                                    required : rules.required,
                                    validate : (value) => isEmail(value) || rules.invalidEmail
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12} spacing={spacing(2)}>
                            <Box>
                                <Input label="Código" type="text" name="code" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Input label="Senha" type="password" name="password" variant="outlined" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Input label="Confirmar nova senha" type="password" name="confirm_password" variant="outlined" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box mt={2} display="flex" justifyContent="center">
                                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                    Atualizar senha
                                </LoadingButton>
                            </Box>
                        </Grid>
                        <Grid item sm={12}>
                            <Box mt={spacing(2)} display="flex" justifyContent="center">
                                <Link underline='hover' component={NavLink} to={route('login')} title="Voltar">
                                    Voltar para o login
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
            <ModalMessage open={openModal} time={4000} onClose={onClose} message={(
                <Grid>
                    <Box>
                        <Typography variant="h2" color="primary" style={{ fontWeight: 'normal' }}>
                            Senha Alterada com Sucesso!
                        </Typography>
                    </Box>
                    <Box mt={spacing()}>
                        <Typography variant="body1" align="center">
                            Agora é só realizar o Login novamente e terá acesso a sua conta.
                        </Typography>
                    </Box>
                </Grid>
            )} />
        </>
    );
};

export default UpdatePassword;