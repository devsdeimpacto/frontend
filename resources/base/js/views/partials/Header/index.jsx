import React, { memo, useMemo } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useBreadcrumb, useRoute } from 'react-router-mapping';
import { ArrowBackRounded } from '@mui/icons-material';

// Styles
import useStyle from './style';

// Components
import IconButton from '@/views/components/IconButton';

const Header = memo(({ children }) => {

    /**
     * Styles
     */
    const classes = useStyle();
    const { spacing } = useTheme();
    
    /**
     * Hooks
     */
    const breadcrumb = useBreadcrumb();
    const { route } = useRoute();
    const breadcrumbInverted = useMemo(() => breadcrumb.reverse(), [ breadcrumb ]);

    return (
        <Grid container>
            <Grid item sm={12}>
                <Box className={classes.title}>
                    <Container>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow="1" display="flex" alignItems="center">
                                {
                                    breadcrumbInverted[1] ? (
                                        <Box mr={spacing()}>
                                            <IconButton color='primary' variant="outlined" size="small" component={Link} to={route(breadcrumbInverted[1].name)}>
                                                <ArrowBackRounded fontSize='small' />
                                            </IconButton>
                                        </Box>
                                    ) : null
                                }
                                <Typography variant="h2" color="primary">
                                    { breadcrumbInverted[0]?.label }
                                </Typography>
                            </Box>
                            <Box>
                                { children }
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
});

export default Header;