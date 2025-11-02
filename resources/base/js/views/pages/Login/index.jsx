import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Grid, Box, Link, Alert, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useRoute } from 'react-router-mapping';
import { LoadingButton } from '@mui/lab';

// Components
import { Input } from '@/views/components/Form';

// Hooks
import useFetch from '@/hooks/useFetch';
import usePage from '@/hooks/usePage';

// Api
import api from '@/Api';

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

    const [ accountLogin ] = useFetch(api.accountLogin);
    const [ userRequest ] = useFetch(api.users);

    const { push } = useHistory();

    const [ errors, setErrors ] = useState(null);

    //
    const onSubmit = async (data) => {

        setErrors(null);

        const dataLogin = new URLSearchParams({ 
            username: data.email,
            password: data.password,
        });

        const response = await accountLogin(null, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body : dataLogin
        });
        
        if (response.status !== 200) {

            const { message } = await response.json();
            setErrors(message);

            return false;
        }

        const { access_token } = await response.json();

        setJwt(access_token);

        setCookie('access_token', access_token);
        //setCookie('refresh_token', refresh_token);

        const userResponse = await userRequest('me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (userResponse.status === 200) {
            const data = await userResponse.json();
            setCookie('user', data);
            localStorage.setItem('user', JSON.stringify(data));
        }

        push('/');

        setErrors('Acessos do usuário e senha não foram encontrados.');
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