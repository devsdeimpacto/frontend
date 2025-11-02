const env = (process.env.REACT_APP_ENV === 'local' || process.env.REACT_APP_ENV === 'development') 
    ? 'https://backend-production-43d8c.up.railway.app/'
    : (process.env.REACT_APP_ENV === 'staging') 
        ? 'https://backend-production-43d8c.up.railway.app/' : 'https://backend-production-43d8c.up.railway.app/';

const base_url = `${env}`;        
/**
 * Apis padrões da stack (Não modificar)
 */
export default {

    //
    base_url: `${base_url}`,

    metrics: `${base_url}/metrics/`,

    catadores: `${base_url}/catadores/`,
    ordens: `${base_url}/solicitacoes/`
};