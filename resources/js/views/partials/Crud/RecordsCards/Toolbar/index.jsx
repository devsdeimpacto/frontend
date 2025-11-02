import React from 'react';
import { Box, Slide, Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Components
import Paper from '@/views/components/Paper';

// Context
import { useRecordListContext } from '../List';

// Styles
import useStyle from './style';

const ToolBar = ({ children }) => {

    /**
     * Styles
     */
    const classes = useStyle();

    /**
     * Hooks
     */
    const { checkList } = useRecordListContext();

    return (
        <Slide direction="up" in={!!checkList?.length} mountOnEnter unmountOnExit className={classes.toolbar}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box display="flex">
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <Avatar className={classes.avatar}>
                            { checkList?.length }
                        </Avatar>
                        <Typography variant="body1" className={classes.body1}>
                            Items selecionados
                        </Typography>
                    </Box>
                    { children }
                </Box>
            </Paper>
        </Slide>
    );
};

ToolBar.propTypes = { 
    checkList : PropTypes.array
};

ToolBar.defaultProps = { 
    checkList : []
};

export default ToolBar;