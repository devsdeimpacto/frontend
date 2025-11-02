import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MappingProvider } from 'react-router-mapping';
import { Authenticator } from './Authenticator';

// Utils
import { isGuest } from '@/utils/auth';

// Routes
import useRoutesDefault from '@/config/routes';
import useRoutes from '~/config/routes';

export default () => {

    const { routes : routesDefault, Routes : RoutesDefault } = useRoutesDefault();
    const { routes, Routes } = useRoutes();

    return (	
        <BrowserRouter basename={process.env.BASENAME}>
            <Authenticator onValidator={isGuest} validRedirect="/" invalidRedirect="/login">
                <MappingProvider {...routesDefault} {...routes}>
                    <Switch>
                        { [ ...Routes ] }
                        { [ ...RoutesDefault ] }
                    </Switch>
                </MappingProvider>
            </Authenticator>
        </BrowserRouter>
    );
};