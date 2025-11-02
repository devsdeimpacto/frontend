import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export default makeStyles((theme) => ({
    dropzone : {
        position : 'relative',
        '&.dropzone-file, &.dropzone-image' : {
            position : 'relative',
            display : 'inline-flex',
            flexDirection : 'row',
            alignItems : 'center',
            border : '1px dashed transparent',
            borderRadius : 4,
            padding : theme.spacing(4),
            '& .dropzone-icon' : {
                width : 80,
                height : 80,
                display : 'inline-flex',
                borderRadius : 4,
                '& .dropzone-button' : {
                    width : 80,
                    height : 80,
                    flex : '0 0 80px',
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    background : 'transparent',
                    border : 0,
                    cursor : 'pointer',
                    transition: theme.transitions.create('background', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.shorter,
                    }),
                    '& .icon' : {
                        fontSize : theme.typography.pxToRem(44)
                    },
                    '& .dropzone-remove-button' : {
                        display : 'none',
                        position : 'absolute',
                        top : 0,
                        right : 0,
                        zIndex : 1
                    }
                }
            },
            '& .dropzone-content' : {
                marginLeft : theme.spacing(4),
                width: '100%',
                display : 'inline-flex',
                flexDirection : 'column',
                justifyContent : 'center',
                alignItems : 'center'
            }
        },
        // File 
        '&.dropzone-file' : {
            borderColor : theme.palette.primary.main,
            '& .dropzone-icon' : {
                background : alpha(theme.palette.primary.main, 0.18),
                '& .dropzone-button' : {
                    color : theme.palette.primary.main,
                }
            }
        },
        // Image
        '&.dropzone-image' : {
            display : 'inline-flex',
            borderColor : theme.palette.color_14,
            '& .dropzone-icon' : {
                borderRadius : '50% !important',
                background : alpha(theme.palette.color_14, 0.18),
                '& .dropzone-button' : {
                    color : theme.palette.color_14,
                },
                '& .dropzone-avatar' : {
                    width : '100%',
                    height : '100%',
                    display : 'flex',
                    backgroundSize : 'contain',
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : 'center center',
                    position : 'absolute',
                    top : 0,
                    left : 0,
                }
            }
        },
        '&.dropzone-dragenter' : {
            '& .dropzone-overlay' : {
                display : 'block'
            },
            '& .dropzone-icon, & .dropzone-content' : {
                opacity : 0
            }
        },
        '&.dropzone-error' : {
            '&.dropzone-file, &.dropzone-image' : {
                borderColor : `${theme.palette.error.main}`,
                '& .dropzone-icon' : {
                    background : alpha(theme.palette.error.main, 0.18),
                    '& .dropzone-button' : {
                        color : theme.palette.error.main
                    }
                }
            }
        },
        '&.dropzone-success' : {
            // Image
            '&.dropzone-image' : {
                borderColor : `${theme.palette.success.main}`
            },
            // File
            '&.dropzone-file' : {
                borderColor : `${theme.palette.success.main}`,
                '& .dropzone-icon' : {
                    background : alpha(theme.palette.success.main, 0.18),
                    '& .dropzone-button' : {
                        color : theme.palette.success.main
                    }
                }
            },
            '&:hover' : {
                '& .dropzone-remove-button' : {
                    display : 'block !important'
                }
            }
        },
        '& input[type=file]' : {
            display : 'none'
        },
        '& .Mui-error' : {
            textAlign : 'center'
        },
        '& .dropzone-overlay' : {
            display : 'none',
            width : '100%',
            height : '100%',
            position : 'absolute',
            top : 0,
            left : 0,
            zIndex : 1,
            border : `1px dashed ${theme.palette.primary.main}`,
            borderRadius : 4,
            background : `repeating-linear-gradient(45deg, 
                ${alpha(theme.palette.primary.main, .4)}, 
                ${alpha(theme.palette.primary.main, .4)} 16px, 
                ${alpha(theme.palette.primary.main, .3)} 16px, 
                ${alpha(theme.palette.primary.main, .3)} 32px)`,
        },
    },
}));