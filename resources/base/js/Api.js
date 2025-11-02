const env = (process.env.REACT_APP_ENV === 'local' || process.env.REACT_APP_ENV === 'development') 
    ? 'https://reqres.in/'
    : (process.env.REACT_APP_ENV === 'staging') 
        ? 'https://reqres.in/' : 'https://reqres.in/';

const base_url = `${env}`;        
/**
 * Apis padrões da stack (Não modificar)
 */
export default {

    //
    base_url: `${base_url}`,
    accountLogin : `${base_url}/auth/token`,
    accountRecover : `${base_url}/Account/Recover`,

    metrics: `${base_url}/metrics/`,

    users: `${base_url}/users/`,
    clientes: `${base_url}/clientes/`
};