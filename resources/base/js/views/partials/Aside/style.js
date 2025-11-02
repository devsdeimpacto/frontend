import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({  
    rootDiv: {
        [theme.breakpoints.up('lg')]: {
            flexShrink: 0,
            transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.complex
            })
        }
    },
    root: { 
        display: 'flex',
        position: 'relative',
        zIndex: 2,
        '& .nav-primary' : { 
            background: theme.palette.color_1,
            width: 140,
            position: 'fixed',
            height: '100vh',
            zIndex: 1101, 
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            boxShadow: '0px 0px 8px #00000029'
        },
    }, 
    navUp: {   
        '&' : {
            height : 0,
            flexGrow : 1,
            display : 'flex',
            flexDirection : 'column'
        },
        '& .logo' : { 
            marginTop : theme.spacing(4),
            textAlign : 'center',
            '& a' : { 
                display: 'block'
            }
        },
        '& .platform' : { 
            padding: '0 20px',
            marginTop: 20,
      
            '& .icon': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }, 
            '& > span ': { 
                textAlign: 'center',
                marginTop: 0,
                fontSize: theme.typography.pxToRem(14),
                color: theme.palette.primary.main, 
                fontWeight: 500,
                display: 'block',

            }
        }
    }, 
    nav: {
        marginTop : theme.spacing(4),
        display: 'block', 
        overflow: 'hidden',
        '& > ul' : { 
            padding: 0, 
            height : '100%',
            paddingLeft : '8px',
            overflowY : 'scroll',
            '& > li' : { 
                listStyle: 'none',
                display: 'block', 
                marginBottom: 20,

                '& >  button ' : { 
                    width : '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'none'
            },
            '&::-webkit-scrollbar-thumb': {
                display : 'none'
            },
            '&:hover' : {
                '&::-webkit-scrollbar-thumb': {
                    display : 'block'
                }
            }
        },
    },  
    btnNav: {
        display: 'flex',
        flexDirection: 'column', 
        background: 'transparent',
        border: 0,
        outline: 'none',
        cursor: 'pointer',
        textDecoration : 'none',
        '& .icon-circle' : { 
            width: 33,
            height: 33,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all ease-in-out 0.2s', 
            color: theme.palette.color_9,
        },
        
        '& > span ' : {  
            marginTop: 8,
            fontSize: theme.typography.pxToRem(14),
            color: theme.palette.color_9,
            textAlign: 'center',
            transition: 'all ease-in-out 0.2s',
            fontWeight: 900,
        },  
        '&[data-act="true"], &.active' : { 
            '& .icon-circle' : {
                background: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderRadius: '100%'
            },
            '& > span' : { 
                color: theme.palette.primary.main,
            },
        },
    },  
    listSubItem: { 
        position: 'relative',
        zIndex: 1, 
        display: 'block',
        padding: 0, 
        paddingLeft: 20,

        '& > a' : {
            display: 'block',
            background: 'transparent',
            paddingLeft: 20,
            textDecoration: 'none',
            fontSize: 16,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,   
                
            '& span': { 
                display : 'flex',
                paddingTop: 10,
                paddingBottom: 10, 
                color: theme.palette.color_1,
                position : 'relative',
                '&:before, &:after' : {
                    background : theme.palette.color_1,
                    borderRadius : 0,
                    zIndex : 2
                }
            },
            '&:before, &:after, & span:before, & span:after': {
                background: theme.palette.primary.main,
                width: 8,
                height: 8,
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: 3,
                right: 0,
                opacity: 0,
                visibility: 'hidden', 
            },
            '&:after, & span:after': {
                top: '100%',
                borderTopRightRadius: 8,
            },  
            '&:before, & span:before': {
                bottom: '100%',
                borderBottomRightRadius: 8,
            }, 
            '&.active' : {
                background: theme.palette.color_1,
                '& span': {
                    fontWeight: 900,
                    color: theme.palette.primary.main, 
                },
                '&:before, &:after, & span:before, & span:after': {
                    opacity: 1,
                    visibility: 'visible'
                }, 
            }
        },
    },
    navDown: {
        paddingBottom : theme.spacing(4)
    },
    btnClose: { 
        background: theme.palette.color_4,
        width: 35,
        height: 35,
        color: theme.palette.color_1,
        fontSize: 20,

        '&:hover': {
            background: theme.palette.color_4,
        },

        '& svg': {
            width: '1.2em',
            height: '1.2em',
        }
    },
    contentDrawer: {
        display: 'flex',
        position: 'relative', 
        zIndex: 1,
    }, 
    hide: {
        opacity: '0',
        minHeight : 'auto !important'
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: 340,
        paddingLeft: 140,
        background: theme.palette.primary.main,
        paddingTop: 40,
        border: 0
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1), 
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    section: {
        padding: `0 0 ${theme.spacing(3)}px 0`,
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 140, 
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 340,
    }, 
}));