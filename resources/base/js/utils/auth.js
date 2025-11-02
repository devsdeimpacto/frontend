import jwtDecode from 'jwt-decode';

// Utils
import { getCookie, deleteCookie, setCookie } from '@/utils/helpers';

const cookieName = 'access_token';

/**
 * Verifica se o usuário em questão é convidado
 * 
 * @returns {boolean}
 */
const isGuest = () => {

    return getJwt().length > 0;
};

/**
 * Define o cookie com o jwt do usuario
 * 
 * @param {string} token - Token JWT que será salvo nos cookies
 * @returns {boolean}
 */
const setJwt = (token) => {

    try {

        jwtDecode(token);
    } catch (error) {

        console.error('Jwt informado é invalido');

        return false;
    }

    setCookie(cookieName, token);

    return true;
};

/**
 * Devolve uma string com o JWT da requisição
 * 
 * @returns {string}
 */
const getJwt = () => {

    return getCookie(cookieName);
};

/**
 * Remove o cookie com os dados do usuario
 * 
 * @returns {void}
 */
const deleteJwt = () => {

    deleteCookie(cookieName);
};

/**
 * Devolve um objeto com JWT decodificado
 * 
 * @returns {Object}
 */
const getUser = () => {

    const jwt = getJwt();

    return jwt ? jwtDecode(jwt) : {};
};

export {
    isGuest, 
    setJwt,
    getJwt,
    deleteJwt,
    getUser
};