const login = (process.env.REACT_APP_ENV === 'local' || process.env.REACT_APP_ENV === 'development') 
    ? 'master' 
    : (process.env.REACT_APP_ENV === 'beta')
        ? 'master'
        : (process.env.REACT_APP_ENV === 'stage') 
            ? 'master' : 'master@euroit.com.br';
    
const password = (process.env.REACT_APP_ENV === 'local' || process.env.REACT_APP_ENV === 'development') 
    ? '2o0w1l9' 
    : (process.env.REACT_APP_ENV === 'beta')
        ? '2o0w1l9'
        : (process.env.REACT_APP_ENV === 'stage') 
            ? '2o0w1l9' : 'obstar76';

export default {
    login: login,
    password: password
};