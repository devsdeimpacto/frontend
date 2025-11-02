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
}));