import React, { useState, useCallback, useMemo } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Partials
import { useCrudContext } from '~/views/partials/Crud';
import { useRecordListContext } from '~/views/partials/Crud/Records/List';
import Toolbar from '~/views/partials/Crud/Records/Toolbar';
import ModalMessage from '@/views/partials/ModalMessage';

// Hooks
import useFetch from '@/hooks/useFetch';
import useModal from '@/hooks/useModal';

// Images
import ErroSvg from '@/../images/Erro.svg';

// API
import Api from '~/Api';

const CategoriesToolbar = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const { setCrudData } = useCrudContext();
    const { checkList } = useRecordListContext();
    const [ Modal, toggle, attributes ] = useModal();
    const [ isActive, setIsActive ] = useState(false);
    const [ modalConfig, setModalConfig ] = useState({
        open        : false,
        message     : '',
        hasError    : false,
        hasDeleted  : false
    });

    const [ categoryRequest, { headers: categoriesHeader } ] = useFetch(`${Api.categoriesUpdateStatus}`);

    //
    const onActive = useCallback(() => {

        setIsActive(true);
        toggle();
    }, []);

    const onDesactive = useCallback(() => {
        setIsActive(false);
        toggle();
    }, []);

    //
    const setStatus = async () => {

        const categories = checkList.map((item) => {
            
            if (isActive) {
                
                if (item.status === 'inactive') {

                    return {
                        categoryId: item.id,
                        status: 'active'
                    };
                }
            } else {
                
                if (item.status === 'active') {

                    return {
                        categoryId: item.id,
                        status: 'inactive'
                    };
                }
            }
        });

        const response = await categoryRequest(null, {
            method : 'PUT',
            headers: {
                ...categoriesHeader()
            },
            body : JSON.stringify(categories)
        });

        if (response.status === 200) {

            setModalConfig({
                open : true,
                message : `Categoria(s) ${isActive ? 'ativado(s)' : 'desativado(s)'} com sucesso`
            });

            setCrudData((old) => ({
                ...old,
                forceUpdate : !old.forceUpdate
            }));

            toggle();
        }
    };

    //
    const onClose = () => {

        setModalConfig({
            open : false
        });
    };

    return useMemo(() => (
        <>
            <Toolbar>
                <Box display="flex" alignItems="center">
                    {
                        checkList.filter((item) => item.status === 'active').length ? (
                            <Button color="error" variant="outlined" title="Desativar" style={{ marginRight : spacing(4) }} onClick={onDesactive}>
                                Desativar
                            </Button>
                        ) : null
                    }
                    {
                        checkList.filter((item) => item.status === 'inactive').length ? (
                            <Button color="primary" variant="contained" title="Ativar" onClick={onActive}>
                                Ativar
                            </Button>
                        ) : null
                    } 
                </Box>
            </Toolbar>
            <Modal>
                <Grid container>
                    <Grid item sm={12}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img src={ErroSvg} width="100" />
                            <Box mt={8}>
                                <Typography variant="h4" color="primary">
                                    Você tem certeza que deseja { isActive ? 'Ativar' : 'Desativar' } a categoria?
                                </Typography>
                            </Box>
                            <Box mt={4}>
                                <Typography variant="body1">
                                    {
                                        isActive ? 'Após ativar a categoria, o usuário poderá visualizar a mesma no Aplicativo.' : 'Após desativar a categoria, ela não aparecerá no Aplicativo.'
                                    }
                                </Typography>
                            </Box>
                            <Box mt={8}>
                                <Button color="error" variant="outlined" title="Cancelar" style={{ marginRight : spacing(4) }} onClick={toggle}>
                                    Cancelar
                                </Button>
                                <Button color="primary" variant="contained" title={isActive ? 'Ativar' : 'Desativar'} onClick={setStatus}>
                                    { isActive ? 'Ativar' : 'Desativar' }
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
            <ModalMessage open={modalConfig.open} time={4000} onClose={onClose} message={(
                <Typography variant="h4" color="primary">
                    { modalConfig.message }
                </Typography>
            )} />
        </>
    ), [ checkList, isActive, attributes.open, modalConfig.open ]);
};

export default CategoriesToolbar;