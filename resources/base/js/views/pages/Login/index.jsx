import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Grid, Box, Link, Alert, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { LoadingButton } from '@mui/lab';

// Components
import { Input } from '@/views/components/Form';

// Hooks
import usePage from '@/hooks/usePage';

// Utils
import { setJwt } from '@/utils/auth';
import { isEmail } from '@/utils/validators';
import { setCookie } from '@/utils/helpers';

// Config
import rules from '@/config/rules';

const Login = () => {

    /**
     * Hooks
     */
    usePage({
        id      : 'Login',
        title   : 'Login' 
    });

    const { route } = useRoute();
    const methods = useForm();
    const { handleSubmit, formState : { isSubmitting } } = methods;

    const { push } = useHistory();

    const [ errors, setErrors ] = useState(null);

    //
    const onSubmit = async (data) => {

        setErrors(null);

        const fakeAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
        const fakeUser = { id: 1, name: 'Recicla Paraná Gestão Ambiental Ltda', email: data.email };

        setJwt(fakeAccessToken);
        setCookie('access_token', fakeAccessToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        setCookie('user', fakeUser);

        // Redireciona para página inicial
        push('/');
    
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <Box>
                            <Typography variant='h4' color='primary'>Entre na sua conta</Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography variant='body1'>
                                Não tem uma conta?
                                <Link href="/create-account" color='secondary' underline='hover' ml={1}>Crie agora</Link>
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
                        <Box>
                            <Input label="Login" type="text" name="email" variant="outlined" rules={{
                                required : rules.required,
                                validate : (value) => isEmail(value) || rules.invalidEmail
                            }} />
                        </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Box mt={2} display='flex' justifyContent='end'>
                            <Link underline='hover' component={NavLink} to={route('forgotPassword')} title="Esqueci minha senha">
                                Esqueci minha senha?
                            </Link> 
                        </Box>
                        <Box mt={1}>
                            <Input label="Senha" type="password" name="password" variant="outlined" rules={{
                                required : rules.required
                            }} />
                        </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Box mt={2} display="flex" justifyContent="center">
                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                Login
                            </LoadingButton>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default Login;