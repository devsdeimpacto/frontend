import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Link, Stack, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

import PropTypes from 'prop-types';

// Images
import Logo from '@/../images/logo-primary.svg';

// Hooks
import useCollapseDrawer from '@/hooks/useCollapseDrawer';

// Components
import MHidden from '@/views/components/MHidden';
import Scrollbar from '@/views/components/Scrollbar';
import NavSection from '@/views/components/NavSection';

const DRAWER_WIDTH = 240;
const COLLAPSE_WIDTH = 102;

const Aside = ({ menu, isOpenSidebar, onCloseSidebar }) => {   

    const { isCollapse, collapseClick, collapseHover, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

    const [ nav, ] = useState(menu || []);
   
    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column'
                },
            }}>
            <Stack
                spacing={3}
                sx={{
                    px: 2.5,
                    pt: 3,
                    pb: 2,
                    ...(isCollapse && {
                        alignItems: 'center'
                    })
                }}
            >
                <Stack direction="row" display='flex' alignItems="center" justifyContent="center">
                    <Link href="/" underline="none">
                        <img src={Logo} alt="Deu Ruim Aqui" />
                    </Link>  
                </Stack>
            </Stack>

            <NavSection navConfig={nav} isShow={!isCollapse} />
        </Scrollbar>
    );
  
    return (
        <RootStyle
            sx={{
                width: {
                    lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
                },
                ...(collapseClick && {
                    position: 'absolute'
                })
            }}
        >
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    { renderContent }
                </Drawer>
            </MHidden>

            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default',
                            ...(isCollapse && {
                                width: COLLAPSE_WIDTH
                            }),
                            ...(collapseHover && {
                                borderRight: 0,
                                backdropFilter: 'blur(6px)',
                                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                                boxShadow: (theme) => theme.customShadows.z24,
                                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
                            }),
                            display: 'block', 
                            overflow: 'hidden',
                        }
                    }}
                >
                    { renderContent }
                </Drawer>
            </MHidden>

        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.complex
        })
    }
}));

Aside.propTypes = {
    /**
	 * Recebe um booleano para definir se o menu renderizará aberto ou fechado
	 */
    isOpenSidebar: PropTypes.bool,
    /**
	 * Recebe uma função para definir se o menu renderizará aberto ou fechado
	 */
    onCloseSidebar: PropTypes.func,
    /**
	 * Recebe um array para montagem do menu
	 */
    menu : PropTypes.arrayOf(
        PropTypes.shape({
            icon    : PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]).isRequired,
            label   : PropTypes.string.isRequired,
            href    : PropTypes.string,
            sub     : PropTypes.arrayOf(
                PropTypes.shape({
                    label   : PropTypes.string.isRequired,
                    href    : PropTypes.string,
                })
            ),
            live    : PropTypes.bool
        })
    ).isRequired,
};

Aside.defaultProps = {
    isOpenSidebar  : false,
    menu    : []
};

export default Aside;