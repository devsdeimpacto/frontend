import React, { lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useMap } from 'react-router-mapping';
import { AuthRoute } from '@/Authenticator';

// Layouts
import Default from '@/views/appearances/layouts/Default';

// Context
import { UserProvider } from '~/contexts/User';

export default () => {

    const routes = useMap([
        {
            as          : AuthRoute,
            name        : 'home',
            label       : 'Home',
            path        : '/',
            exact       : true,
            isPrivate   : true,
            component   : () => <Redirect to="/dashboard" />
        },
        {
            as          : AuthRoute,
            name        : 'dashboard',
            label       : 'Dashboard',
            path        : '/dashboard',
            exact       : true,
            isPrivate   : true,
            component   : lazy(() => import(/* webpackChunkName: 'example' */'~/views/pages/Dashboard')),
            routes      : []
        }
    ]);
    
    const values = Object.values(routes);

    return {
        routes,
        Routes : [
            <Route isPrivate key="custom" exact path={values.map((route) => route.props.path).flat()}>
                <UserProvider>
                    <Default>
                        {
                            values.map((route) => route)
                        }
                    </Default>
                </UserProvider>    
            </Route>
        ]
    };
};