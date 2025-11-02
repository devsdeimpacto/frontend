import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { ClearRounded, FilterListRounded } from '@mui/icons-material';

// Components
import IconButton from '@/views/components/IconButton';

// Context
import { useCrudContext } from '~/views/partials/Crud';

// Styles
import useStyle from './style';

const Filter = ({ children }) => {

    /**
     * Styles
     */
    const classes = useStyle();

    /**
     * Hooks
     */
    const { setCrudData, filter } = useCrudContext();
    const methods = useForm();

    const { handleSubmit, reset } = methods;

    //
    const onSubmit = (data) => {

        setCrudData((old) => ({
            ...old,
            filter : {
                ...data,
            },
            pagination : {
                ...old.pagination,
                page : 1
            },
        }));
    };

    //
    const clearFilter = () => {

        setCrudData((old) => ({
            ...old,
            filter : {},
            pagination : {
                ...old.pagination,
                page : 1
            },
        }));

        reset();
    };

    return useMemo(() => (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex">
                    <Box display="flex" alignItems="center" flexGrow="1" sx={{ marginLeft: 2 }}>
                        { children }
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {
                            Object.values(filter).length ? (
                                <Box ml={2}>
                                    <IconButton title="Limpar Filtro" variant="contained" size="small" className={classes.clearFilter} onClick={clearFilter}>
                                        <ClearRounded fontSize="small" />
                                    </IconButton>
                                </Box>
                            ) : null
                        }
                        <Box ml={2}>
                            <Button title="Filtrar" type="submit" color="secondary" variant="contained" fontSize="small" startIcon={<FilterListRounded />}>
                                Filtrar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    ), [ filter ]);
};

export default Filter;