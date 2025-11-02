
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'; 

// Utils
import { deleteCookie, getCookie } from '@/utils/helpers';

// Hooks
import useFetch from '@/hooks/useFetch';

// Api
import api from '~/Api';
import { deleteJwt } from '@/utils/auth';

// Context
export const UserContext = createContext({});

// Hook
export const useUserContext = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {

    /**
     * Hoos
     */
    const [ { ...user }, setUser ] = useState();

    const [ forceUpdate, setForceUpdate ] = useState(false);

    const [ me ] = useFetch(`${api.users}/me`);

    //
    const getData = async () => {

        let userList = [];

        const storage = localStorage.getItem('user');

        if (storage === 'undefined') {
            deleteJwt();
            deleteCookie('access_token');
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            deleteCookie('user');

            localStorage.removeItem('user');

            window.location.href = '/';
        }

        let currentUser = storage ? JSON.parse(storage) : null;

        const response = await me(null, {
            headers : {
                'Authorization'	: `Bearer ${getCookie('access_token')}`,
            }
        });

        if (response.status === 200) {

            const data = await response.json();

            setUser(data);

            userList = data;
        } else if (response.status === 401) {

            deleteJwt();
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            deleteCookie('user');

            localStorage.removeItem('user');

            //window.location.href = '/';
        }

        currentUser = userList;
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