
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; 

// Context
export const UserContext = createContext({});

// Hook
export const useUserContext = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {

    /**
     * Hoos
     */
    const [ user, setUser ] = useState();

    const [ forceUpdate, setForceUpdate ] = useState(false);

    //
    const getData = async () => {

        const storage = localStorage.getItem('user');

        const currentUser = storage ? JSON.parse(storage) : null;

        localStorage.setItem('user', JSON.stringify(currentUser));

        setUser({
            ...currentUser
        });
    };

    //
    const refreshUser = useCallback(() => {

        setForceUpdate(!forceUpdate);
    }, [ forceUpdate ]);

    useEffect(() => {

        getData();
    }, [ forceUpdate ]);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            { children }
        </UserContext.Provider>
    );
};