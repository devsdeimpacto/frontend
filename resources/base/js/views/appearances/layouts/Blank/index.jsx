import React, { Suspense } from 'react'; 
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
 
// Appearances
import theme from '@/views/appearances/themes/default';

// Partials
import Loader from '@/views/partials/Loader';
import Page from '@/views/partials/Page';

const Blank = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<Loader />}>
                <Page>
                    { children }
                </Page>
            </Suspense>
        </ThemeProvider>
    );
};

export default Blank;