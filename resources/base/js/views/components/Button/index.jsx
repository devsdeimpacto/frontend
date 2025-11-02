import React, { cloneElement, forwardRef } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@mui/material/ButtonBase';

// Style
import useStyle from './style';
  
const Button = forwardRef(({ children, startIcon, endIcon, ...rest }, ref) => {

    const classes = useStyle();

    rest.className = [
        rest.className,
        ...Object.values(classes)
    ].join(' ').trim();

    return (
        <ButtonBase {...rest} ref={ref} data-testid="button" sx={{ borderRadius: 48, border: '2px solid transparent' }}>
            { startIcon ? cloneElement(startIcon, { className : 'MuiButton-startIcon', 'data-testid' : 'button-start-icon' }, null) : null }
            { children }
            { endIcon ? cloneElement(endIcon, { className : 'MuiButton-endIcon', 'data-testid' : 'button-end-icon' }, null) : null }
        </ButtonBase>
    );
});

Button.propTypes = {
    /**
	 * Adiciona um ícone no início do botão
	 */
    startIcon : PropTypes.element,
    /**
	 * Adiciona um ícone no fim do botão
	 */
    endIcon : PropTypes.element,
};

export default Button;