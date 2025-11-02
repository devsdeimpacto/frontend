import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';   

// Images
import IconCircleSucess from '@/../images/icon-circle-sucess.svg';

// Hooks
import useModal from '@/hooks/useModal'; 

// Style
import useStyle from './style';

const ModalMessage = ({ message, avatar, onClose, time, ...rest }) => {
    
    /**
     * Style
     */
    const classes = useStyle(); 
    const theme = useTheme(); 
  
    /**
     * Hooks
     */
    const [ Modal, toggle ] = useModal(); 

    //
    const onCloseMessage = () => {

        if (!onClose) {

            toggle();

            return false;
        }

        onClose();
    };

    return (
        <>  
            <Modal {...rest} className={classes.modal} onClose={onCloseMessage}> 
                <Box display="flex" justifyContent="center">
                    { message }
                </Box>
                <Box mt={theme.spacing(3)} mb={theme.spacing(3)} display="flex" justifyContent="center">
                    { avatar ? avatar : <img src={IconCircleSucess} /> }
                </Box>
                <ProgressBar time={time} onClose={onCloseMessage} />
            </Modal>
        </>
    );
};

ModalMessage.propTypes = {
    /**
	 * Recebe um valor booleano que indica se o modal sera aberto ou fechado
	 */
    open : PropTypes.bool,
    /**
	 * Recebe uma string com a mensagem 
	 */
    message : PropTypes.node,
    /**
	 * Recebe uma imagem 
	 */
    avatar : PropTypes.node,
    /**
	 * Recebe um callback que sera acionado quando o modal for fechado
	 */
    onClose : PropTypes.func,
    /**
	 * Recebe um number que sera usado como tempo para o fechamento do modal
	 */
    time: PropTypes.number
};

ModalMessage.defaultProps = {
    open    : false,
    message : (
        <Typography variant="h2" color="primary" style={{ fontWeight: 'normal' }}>
            Dados salvos com <strong>sucesso!</strong>
        </Typography>
    ),
    time    : 2000
};

const ProgressBar = ({ onClose, time }) => {

    const [ progress, setProgress ] = useState(0); 

    useEffect(() => {

        const timeout = setTimeout(() => {

            if (progress >= 100) {

                clearTimeout(timeout);

                onClose();

                return false;
            }

            setProgress(progress + 1);
        }, (time / 100));

        return () => clearTimeout(timeout);
    }, [ progress ]);

    return <LinearProgress variant="determinate" color="secondary" value={progress} />;
};

ProgressBar.propTypes = {
    onClose : PropTypes.func.isRequired,
    time : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default ModalMessage;