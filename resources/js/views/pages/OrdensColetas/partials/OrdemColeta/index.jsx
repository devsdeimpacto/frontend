import React from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';

// Components
import { Input, Select } from '@/views/components/Form';

const OrdemColeta = () => {
    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const { setValue } = useFormContext();

    return (
        <Grid container spacing={spacing()}>
            <Grid item sm={4}>
                <Box>
                    <Input
                        label="Buscar por nome"
                        type="search"
                        name="name"
                        onBlur={(e) => setValue('name', e.target.value.trim())}
                    />
                </Box>
            </Grid>
            <Grid item sm={2}>
                <Select label="Status" name="status">
                    <option value=""></option>
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                </Select>
            </Grid>
        </Grid>
    );
};

export default OrdemColeta;