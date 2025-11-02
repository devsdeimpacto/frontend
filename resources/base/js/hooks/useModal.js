import React, { createContext, useCallback, useContext, useState } from 'react';

// Components
import Modal from '@/views/components/Modal';

const Context = createContext([]);

export const useModalContext = () => {

    return useContext(Context);
};

const useModal = () => {

    const [ attributes, setAttributes ] = useState({
        open 					: false,
        fullWidth				: true,
        maxWidth 				: 'md',
        disableEscapeKeyDown 	: true
    });

    const toggle = useCallback((_, reason) => {

        if (reason !== 'backdropClick') {
            
            setAttributes((old) => ({
                ...old,
                open : !old.open
            }));
        }
    }, []);

    const modal = useCallback(({ children, ...rest }) => (
        <Modal {...attributes} onClose={toggle} {...rest}>
            <Context.Provider value={[ toggle, attributes ]}>
                { children }
            </Context.Provider>
        </Modal>
    ), [ attributes ]);
	
    return [ modal, toggle, attributes ];
};

export default useModal;