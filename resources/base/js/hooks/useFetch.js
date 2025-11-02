// Hook
import { useEffect } from 'react';

// Utils
import Fetch from '@/utils/fetch';
import { deleteJwt } from '@/utils/auth';

const useFetch = (url) => {

    const request = new Fetch(url);

    const send = async (path, options) => {

        try {
            const response = await request.send(path, options);

            if (response.status === 401) {
                console.log('Não autorizado');
                deleteJwt();
                window.location.href = '/login';
            }

            return response;
        } catch (error) {
            console.log('Erro na requisição:', error);
            //deleteJwt();
            //window.location.href = '/login';
            throw error; 
        }
    };

    const abort = () => {

        return request.abort();
    };

    const headers = () => {

        return request.getHeaders();
    };

    useEffect(() => {

        return () => abort();
    }, []);
	
    return [ send, { abort, headers } ];
};

export default useFetch;