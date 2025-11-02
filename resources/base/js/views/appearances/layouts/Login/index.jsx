import React, { Suspense } from 'react'; 
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Box, Container } from '@mui/material';
 
// Appearances
import theme from '@/views/appearances/themes/default';

// Partials
import Loader from '@/views/partials/Loader';
import Page from '@/views/partials/Page';

// Images
import Logo from '@/../images/logo-primary.svg';

// Styles
import useStyle from './style';

const Login = ({ children }) => {

    /**
     * Styles
     */
    const classes = useStyle();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<Loader />}>
                <Page>
                    <div className={classes.root}>
                        <Container>
                            <Box height="100vh" display="flex" flexDirection="column" justifyContent="center">
                                <Grid container spacing={theme.spacing()} display="flex" direction="row" justifyContent="center">
                                    <Grid item sm={6} xs={12} display='flex'>
                                        <Box display="flex" justifyContent="center">
                                            <img src={Logo} width="500" alt="Deu Ruim Aqui" />
                                        </Box>
                                    </Grid>
                                    <Grid item sm={6} xs={12} style={{ display : 'flex', alignItems : 'center' }}>
                                        <Box width={'100%'}>
                                            { children }
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </div>
                </Page>
            </Suspense>
        </ThemeProvider>
    );
};

export default Login;