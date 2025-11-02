import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, AppBar, Toolbar, IconButton, Divider, ClickAwayListener, 
    Paper, List, ListItemText, MenuItem, useTheme, ListItemIcon
} from '@mui/material';
import { AccountCircleOutlined, LogoutOutlined, MenuOutlined, MoreVert } from '@mui/icons-material';

// Hooks
import usePopper from '@/hooks/usePopper';

// Styles
import useStyles from './style';

// Utils
import { deleteJwt } from '@/utils/auth';
import MHidden from '@/views/components/MHidden';
import useCollapseDrawer from '@/hooks/useCollapseDrawer';

const COLLAPSE_WIDTH = 102;

HeaderBar.propTypes = {
    chat: PropTypes.node,
    onOpenSidebar: PropTypes.func,
    help: PropTypes.node,
    profile: PropTypes.node
};

export default function HeaderBar ({ children, chat, onOpenSidebar, help, profile }) {

    const classes = useStyles();
    const theme = useTheme();

    const { isCollapse } = useCollapseDrawer();
    const [ Popper, toggle ] = usePopper();
    const user = JSON.parse(localStorage.getItem('user'));

    const avatarRef = useRef(null);

    //
    const onLogout = (e) => {

        e.preventDefault();

        deleteJwt();

        window.location.href = '/';
    };

    useEffect(() => {

    }, [ user ]);

    return (
        <AppBar className={classes.appBar} sx={{
            ...(isCollapse && {
                width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
            })
        }}>
            <Toolbar className={classes.toolBar}>

                <MHidden width="lgUp">
                    <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                        <MenuOutlined sx={{ width: 30, height: 30, color: theme.palette.primary.main }}/>
                    </IconButton>
                </MHidden>

                <Box sx={{
                    top: 0,
                    left: 0,
                    zIndex: 99,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    { children }
                </Box>
                <Box sx={{ flexGrow: 1 }} />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <>
                        { chat }

                        { help }

                        <Box sx={{
                            minWidth: '200px',
                            backgroundColor: '#FFF',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px',
                            boxShadow: '0px 0px 8px #00000029'
                        }}>
                            <AccountCircleOutlined color="secondary" fontSize="large" />
                            <Box ml={2}>
                                <ListItemText primary={`${user?.name}`} sx={{
                                    width: '120px',
                                    whiteSpace: 'nowrap',
                                    '&.MuiListItemText-root > span': {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }} />
                            </Box>
                            <IconButton variant="contained" ref={avatarRef} onClick={toggle}>
                                <MoreVert color='secondary' />
                            </IconButton>
                            <Popper anchorEl={avatarRef.current} placement="bottom">
                                <ClickAwayListener onClickAway={toggle}>
                                    <Paper style={{ padding : 0, marginRight: 15 }}
                                        sx={{ 
                                            boxShadow: (theme) => theme.customShadows.z48,
                                        }}
                                    >
                                        <List>
                                            {
                                                user?.nome ? (
                                                    <>
                                                        <Box sx={{ my: 1.5, px: 2.5 }}>
                                                            <ListItemText 
                                                                color='primary' 
                                                                primary={`${user?.name}`} 
                                                            />
                                                        </Box>
                                                    </>
                                                ) : null
                                            }
                                            <Divider/>

                                            { profile && (
                                                <Stack sx={{ p: 2 }}>
                                                    { profile }
                                                </Stack>
                                            ) }

                                            <Box sx={{ p:2 }}>
                                                { /* <MenuItem onClick={() => {}} sx={{ 
                                                    borderRadius: 1,
                                                    paddingLeft: '10px'
                                                }}>
                                                    <ListItemIcon sx={{ 
                                                        '&.MuiListItemIcon-root': { minWidth: '25px' }
                                                    }}>
                                                        <PersonOutline fontSize='small'/>
                                                    </ListItemIcon>
                                                    <ListItemText disableTypography primary='Perfil'/>
                                                </MenuItem> */ }
                                                <MenuItem onClick={onLogout} sx={{ 
                                                    borderRadius: 1,
                                                    paddingLeft: '10px'
                                                }}>
                                                    <ListItemIcon sx={{ 
                                                        '&.MuiListItemIcon-root': { minWidth: '25px' },
                                                        color: theme.palette.error.main 
                                                    }}>
                                                        <LogoutOutlined fontSize='small'/>
                                                    </ListItemIcon>
                                                    <ListItemText disableTypography sx={{ color: theme.palette.error.main }} primary='Logout'/>
                                                </MenuItem>
                                            </Box>

                                        </List>
                                    </Paper>
                                </ClickAwayListener>
                            </Popper>
                        </Box>
                    </>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}