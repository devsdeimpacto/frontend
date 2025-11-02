import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Link, Alert, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { LoadingButton } from '@mui/lab';

// Components
import { Checkbox, Input } from '@/views/components/Form';

// Hooks
import useFetch from '@/hooks/useFetch';
import usePage from '@/hooks/usePage';

// Api
import api from '@/Api';

// Partials
import ModalMessage from '@/views/partials/ModalMessage';

// Utils
import { isEmail } from '@/utils/validators';

// Config
import rules from '@/config/rules';

const createAccount = () => {

    /**
     * Hooks
     */
    usePage({
        id      : 'CriarConta',
        title   : 'Criar conta' 
    });

    const { route } = useRoute();
    const methods = useForm({
        defaultValues: {
            termos: false
        }
    });
    const { control, setValue, handleSubmit, formState : { isSubmitting } } = methods;

    const [ userRequest ] = useFetch(api.users);
    const { push } = useHistory();

    const [ openMessage, setOpenMessage ] = useState(false);
    const [ errors, setErrors ] = useState(null);

    //
    const onSubmit = async (data) => {
        setErrors(null);

        try {

            const { nome, sobrenome, email, password, confirmPassword } = data;

            if (password !== confirmPassword) {
                setErrors('As senhas não conferem.');
            } else {
                const response = await userRequest(null, {
                    method: 'POST',
                    body: JSON.stringify({
                        nome,
                        sobrenome,
                        email,
                        password,
                        termos: {
                            aceito: true,
                            data_aceite: new Date()
                        }
                    })
                });

                if (response.status === 201) {
                    setOpenMessage(true);
                } else {
                    const { message } = await response.json();
                    setErrors(message);
                }
            }

        } catch (error) {
            setErrors('Ocorreu um erro, tente novamente mais tarde ou entre em contato com o administrador.');
        }
    };

    //
    const onClose = () => {

        setOpenMessage(false);
        push(route('login'));
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Typography variant='h4' color='primary'>Comece totalmente grátis</Typography>
                            </Box>
                            <Box>
                                <Typography variant='body1'>
                                    Já tem uma conta? 
                                    <Link href="/login" color='secondary' underline='hover' ml={1}>Comece agora mesmo!</Link>
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
                        <Grid item sm={6} xs={12} mt={8}>
                            <Box>
                                <Input label="Nome" variant="outlined" type="text" name="nome" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12} mt={8}>
                            <Box>
                                <Input label="Sobrenome" variant="outlined" type="text" name="sobrenome" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Input label="Email" variant="outlined" type="text" name="email" rules={{
                                    required : rules.required,
                                    validate : (value) => isEmail(value) || rules.invalidEmail
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Input label="Senha" variant="outlined" type="password" name="password" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box>
                                <Input label="Confirmar Senha" variant="outlined" type="password" name="confirmPassword" rules={{
                                    required : rules.required
                                }} />
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12} mt={2}>
                            <Box display='flex' alignItems='center'>
                                <Controller control={control} rules={{ required: rules.required }} name={'termos'} render={({ field : { value } }) => (
                                    <>
                                        <Checkbox
                                            name={'termos'}
                                            sx={{
                                                mr: '0px'
                                            }}
                                            label={
                                                <Typography variant='body2'>
                                                    Ao me inscrever, concordo com os
                                                    <Link href="/termos-uso" target="_blank" color='secondary' underline='hover'> Termos de Serviço </Link>
                                                    e a
                                                    <Link href="/termos-uso" target="_blank" color='secondary' underline='hover'> Política de privacidade.</Link>
                                                </Typography>
                                            }
                                            value={value}
                                            checked={value}
                                            onChange={(e) => setValue('termos', e.target.checked)}
                                        />
                                    </>
                                )} /> 
                            </Box>
                        </Grid>
                        <Grid item sm={12} xs={12} mt={2}>
                            <Box display="flex" justifyContent="center">
                                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                    Criar Conta Grátis
                                </LoadingButton> 
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
            <ModalMessage open={openMessage} time={4000} onClose={onClose} message={(
                <Typography variant="h4" color="primary">
                    Conta criada com sucesso.
                </Typography>
            )} />
        </>
    );
};

export default createAccount;