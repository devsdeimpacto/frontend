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

const ForgotPassword = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const [ openModal, setOpenModal ] = useState(false);

    const methods = useForm();
    const { handleSubmit, setError, formState : { isSubmitting } } = methods;

    const [ accountRecover ] = useFetch(api.users);
    const { route } = useRoute();
    const { push } = useHistory();

    const [ errors, setErrors ] = useState(null);

    //
    const onSubmit = async (data) => {

        const response = await accountRecover('recover-password', {
            method : 'POST',
            body : JSON.stringify(data)
        });
        
        if (response.status === 201) {

            setOpenModal(true);

            return false;
        }

        setErrors('Erro ao enviar. Verifique se os dados informados são válidos');

        setError('email', {
            type    : 'manual',
            message : 'Erro ao enviar. Verifique se os dados informados são válidos'
        });
    };

    //
    const onClose = () => {

        setOpenModal(false);
        push(route('updatePassword'));
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Typography variant='h4' color='primary'>Esqueceu sua senha?</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography variant='body1'>
                                    Insira o endereço de e-mail associado à sua conta e lhe enviaremos um link para redefinir sua senha.
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
                        <Grid item sm={12} xs={12}>
                            <Box mt={2} display="flex" justifyContent="center">
                                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                    Enviar código
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
                            E-mail de redefinição enviado!
                        </Typography>
                    </Box>
                    <Box mt={spacing()}>
                        <Typography variant="body1" align="center">
                            O processo de redefinição de senha já foi iniciado. Verifique seu e-mail para obter instruções de como prosseguir.
                        </Typography>
                    </Box>
                </Grid>
            )} />
        </>
    );
};

export default ForgotPassword;