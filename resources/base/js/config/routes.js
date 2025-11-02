import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { useMap } from 'react-router-mapping';
import { AuthRoute } from '@/Authenticator';

// Layouts
import Blank from '@/views/appearances/layouts/Blank';
import Login from '@/views/appearances/layouts/Login';

export default () => {

    const routes = useMap([
        {
            as          : AuthRoute,
            name        : 'forgotPassword',
            label       : 'Redefinição de Senha',
            path        : '/forgot-password',
            exact       : true,
            restricted  : true,
            component   : lazy(() => import(/* webpackChunkName: 'forgot-password' */'@/views/pages/ForgotPassword'))
        },
        {
            as          : AuthRoute,
            name        : 'updatePassword',
            label       : 'Criação de nova Senha',
            path        : '/update-password',
            exact       : true,
            restricted  : true,
            component   : lazy(() => import(/* webpackChunkName: 'forgot-password' */'@/views/pages/UpdatePassword'))
        },
        {
            as          : AuthRoute,
            name        : 'createAccount',
            label       : 'Criar Conta',
            path        : '/create-account',
            exact       : true,
            restricted  : true,
            component   : lazy(() => import(/* webpackChunkName: 'forgot-password' */'~/views/pages/Account'))
        },
        {
            as          : AuthRoute,
            name        : 'login',
            label       : 'Login',
            path        : '/login',
            exact       : true,
            restricted  : true,
            component   : lazy(() => import(/* webpackChunkName: 'login' */'@/views/pages/Login'))
        },
        {
            name        : 'auth',
            label       : 'Auth',
            path        : '/auth/:userPublicGuid/:companyPublicGuid',
            exact       : true,
            component   : lazy(() => import(/* webpackChunkName: 'auth' */'@/views/pages/Auth'))
        },
        {
            name        : 'notFound',
            label       : 'Não encontrado',
            path        : '*',
            component   : lazy(() => import(/* webpackChunkName: 'not-found' */'@/views/pages/NotFound'))
        }
    ]);

    const { auth, login, notFound, forgotPassword, updatePassword, createAccount } = routes;
    
    return {
        routes,
        Routes : [
            <Route key="auth" path="/auth">
                <Blank>
                    { auth }
                </Blank>
            </Route>,
            <Route key="forgot-password" exact path="/forgot-password">
                <Login>
                    { forgotPassword }
                </Login>
            </Route>,
            <Route key="update-password" exact path="/update-password">
                <Login>
                    { updatePassword }
                </Login>
            </Route>,
            <Route key="create-account" exact path="/create-account">
                <Login>
                    { createAccount }
                </Login>
            </Route>,
            <Route key="login" exact path="/login">
                <Login>
                    { login }
                </Login>
            </Route>,
            <Route key="not-found">
                <Blank>
                    { notFound }
                </Blank>
            </Route>,
        ]
    };
};