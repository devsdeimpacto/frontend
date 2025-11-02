import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';

// Appearances
import Loader from '@/views/partials/Loader';
import themes from './default';

//
import GlobalStyles from './default/styles/globalStyles';
import componentsOverride from './default/styles/overrides';

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider ({ children }) {

    const theme = createTheme(themes);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                <Suspense fallback={<Loader />}>                 
                    { children }                     
                </Suspense>
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}