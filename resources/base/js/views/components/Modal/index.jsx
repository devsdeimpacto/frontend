import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';

// Style
import useStyle from './style';

const ModalBase = ({ children, ...rest }) => {

    const classes = useStyle();

    return (
        <Dialog classes={classes} {...rest}>
            <DialogTitle disableTypography={true}>
                <IconButton onClick={rest.onClose}>
                    <CloseRounded fontSize="medium" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                { children }
            </DialogContent>
        </Dialog>
    );
};

ModalBase.propTypes = {
    ...Dialog.propTypes
};
  
export default ModalBase;