import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    templateDraft: {
        background: theme.palette.warning.main,
        color: theme.palette.color_1,
    },
    templateAtivo: {
        background : theme.palette.success.main,
        color: theme.palette.color_1,
    },
    templateArquivado: {
        background : theme.palette.color_9,
        color: theme.palette.color_1,
    },
    templateInativo: {
        background : theme.palette.error.main,
        color: theme.palette.color_1,
    },
    metais: {
        background : 'black',
        color: theme.palette.color_1,
    },
    eletronico: {
        background : 'brown',
        color: theme.palette.color_1,
    },
    papel: {
        background : 'orange',
        color: theme.palette.color_1,
    },
    plastico: {
        background : 'blue',
        color: theme.palette.color_1,
    },
    vidro: {
        background : 'yellow',
        color: theme.palette.color_3,
    },
    outros: {
        background : 'red',
        color: theme.palette.color_1,
    }
}));