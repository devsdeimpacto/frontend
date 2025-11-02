import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListSubheader, ListItemButton, } from '@mui/material';
import { KeyboardArrowDownOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';

// Style
import useStyle from './style';
import { useTheme } from '@mui/styles';
import { alpha } from '@mui/material/styles';

NavItem.propTypes = {
    active: PropTypes.func,
    isShow: PropTypes.bool,
    item: PropTypes.object
};

function NavItem ({ item, active, isShow }) {

    const theme = useTheme();
    const classes = useStyle();
    const isActiveRoot = active(item.href);
    const { label, href, icon, info, children } = item;
    const [ open, setOpen ] = useState(isActiveRoot);

    const { pathname } = useLocation();
    const matchSub = (path) => (pathname.split('/')[1] ? path.includes(pathname.split('/')[1]) : false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    if (children) {

        return (
            <>
                <ListItemButton  
                    className={classes.listItem}
                    onClick={handleOpen}
                    sx={matchSub(href) && {
                        background: alpha(theme.palette.primary.light, 0.1),
                        borderRadius: '4px',
        
                        '& div': {
                            color: theme.palette.primary.main
                        },
                        '& svg': {
                            color: theme.palette.primary.main
                        }
                    }}
                    disableGutters
                >
                    <ListItemIcon className={classes.listItemIcon}>{ icon }</ListItemIcon>

                    { isShow && (
                        <>
                            <ListItemText disableTypography primary={label} />
                            { info }
                            <Box
                                sx={{ width: 20, height: 20, ml: 1, mr: 1 }}
                            >
                                { open ? <KeyboardArrowDownOutlined/> : <KeyboardArrowRightOutlined/> }
                            </Box>
                        </>
                    ) }
                </ListItemButton>

                { isShow && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            { children.map((item) => {
                                const { label, href } = item;
                                const isActiveSub = active(href);
                                
                                return (
                                    <ListItemButton 
                                        disableGutters 
                                        className={classes.listItem}
                                        key={label}
                                        component={RouterLink}
                                        to={href}
                                    >
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    width: 4,
                                                    height: 4,
                                                    display: 'flex',
                                                    borderRadius: '50%',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: 'text.disabled',
                                                    transition: (theme) => theme.transitions.create('transform'),
                                                    ...(isActiveSub && {
                                                        transform: 'scale(2)',
                                                        bgcolor: 'primary.main'
                                                    })
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText disableTypography sx={isActiveSub && { color: theme.palette.primary.main }} primary={label} />
                                    </ListItemButton>
                                );
                            }) }
                        </List>
                    </Collapse>
                ) }
            </>
        );
    }

    return (
        <ListItemButton 
            className={classes.listItem}
            component={RouterLink}
            to={href}
            sx={isActiveRoot && {
                background: alpha(theme.palette.primary.light, 0.1),
                borderRadius: '4px',

                '& div': {
                    color: theme.palette.primary.main
                },
                '& svg': {
                    color: theme.palette.primary.main
                }
            }}
            disableGutters
        >
            <ListItemIcon className={classes.listItemIcon}>{ icon }</ListItemIcon>
            { isShow && (
                <>
                    <ListItemText disableTypography primary={label} />
                    { info }
                </>
            ) }
        </ListItemButton>
    );
}

NavSection.propTypes = {
    isShow: PropTypes.bool,
    navConfig: PropTypes.array
};

export default function NavSection ({ navConfig, isShow, ...other }) {

    const classes = useStyle();
    const { pathname } = useLocation();
    const match = (path) => (path ? !!matchPath(path, { path: pathname, exact: true }) : false);

    return (
        <Box {...other}>
            { navConfig.map((list) => {
                const { subheader, items } = list;
                return (
                    <List key={subheader} disablePadding sx={{ p: 1 }}>
                        { isShow && subheader && <ListSubheader className={classes.ListSubheader} disableSticky disableGutters>{ subheader }</ListSubheader> }
                        { items.map((item) => (
                            <NavItem key={item.label} item={item} active={match} isShow={isShow} />
                        )) }
                    </List>
                );
            }) }
        </Box>
    );
}