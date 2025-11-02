import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Partials
import Loader from '@/views/partials/Loader';

// Hooks
import useFetch from '@/hooks/useFetch';

// Api
import api from '@/Api';

const Auth = () => {

    const { push } = useHistory();

    const [ accountLoginRequest ] = useFetch(api.accountLogin);

    //
    const getAuth = async () => {

        const [ accountLoginResponse ] = await Promise.all([
            await accountLoginRequest(null, {
                method : 'POST'
            })
        ]);

        if (accountLoginResponse.status !== 200) {
            
            //
            push('/not-found');

            return false;
        }

        //
        await accountLoginResponse.json();
        
        //setCookie('access_token_docs', dataUser.data.token);

        //push('/');

        return false;
    };

    useEffect(() => {

        getAuth();
    }, []);

    return <Loader />;
};

export default Auth;