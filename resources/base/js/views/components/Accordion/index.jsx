import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Style
import useStyle from './style';
  
const AccordionBase = ({ children, title, expandIcon, skeleton, ...rest }) => {

    const classes = useStyle();

    rest.className = [
        rest.className,
        ...Object.values(classes)
    ].join(' ').trim();

    return (
        <Accordion {...rest} data-testid="accordion">
            <AccordionSummary disabled={skeleton} expandIcon={skeleton ? <Skeleton animation="wave" variant="circle" width={40} height={40} /> : expandIcon ? expandIcon : <ExpandMore fontSize="large" />} data-testid="accordion-summary">
                <Typography variant="h3" color="primary">
                    { title }
                </Typography>
            </AccordionSummary>
            <AccordionDetails data-testid="accordion-details">
                { children }
            </AccordionDetails>
        </Accordion>
    );
};

AccordionBase.propTypes = {
    /**
	 * Titulo superior do componente
	 */
    title : PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    /**
	 * Recebe um booleano para habilitar o skeleton
	 */
    skeleton: PropTypes.bool,
    /**
     * Icone do botão de expandir
     */
    expandIcon : PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    ...Accordion.propTypes
};

export default AccordionBase;