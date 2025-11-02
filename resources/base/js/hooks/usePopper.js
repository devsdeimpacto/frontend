import React, { createContext, useCallback, useContext, useState } from 'react';
import Popper from '@mui/material/Popper';

const Context = createContext([]);

export const usePopperContext = () => {

    return useContext(Context);
};

const usePopper = () => {

    const [ attributes, setAttributes ] = useState({
        open            : false,
        disablePortal   : true
    });

    const toggle = useCallback(() => {

        setAttributes((old) => ({
            ...old,
            open : !old.open
        }));
    }, []);

    const popper = useCallback(({ children, ...rest }) => (
        <Popper {...attributes} {...rest}>
            <Context.Provider value={[ toggle, attributes ]}>
                { children }
            </Context.Provider>
        </Popper>
    ), [ attributes ]);
	
    return [ popper, toggle, attributes ];
};

export default usePopper;