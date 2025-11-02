import Cookies from 'universal-cookie';

const cookies = new Cookies();

const cookieConfig 	= {
    path	: '/',
    domain	: window.location.hostname
};

/**
 * Retorna o valor de uma propriedade em uma string json, em um objeto json
 * 
 * @param {string} stringJson - String Json
 * @param {object} object - Objeto
 * @returns {string}
 */
const reduceObject = (stringJson, object) => {

    return (stringJson || '').split('.').reduce((o, p) => o[p] || '', object || {});
};

/**
 * Converte o binário de um arquivo para uma `string` em base64
 * 
 * @param {Blob} file - Binário do arquivo a ser convertido para base64
 * @returns {Promise}
 */
const fileToBase64 = (file) => new Promise((resolve) => {
    
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
});

/**
 * Converte uma `string` base64 em um `FileData`
 * 
 * @param {String} filename - Nome do arquivo com extensão
 * @param {String} base64 - String base64 que será convertido
 * @returns {Promise}
 */
const base64ToFile = (filename, base64) => new Promise((resolve) => {
    
    fetch(`data:application/pdf;base64,${base64}`)
        .then(async (response) => resolve(new File([ await response.blob() ], filename, { type : response.headers.get('Content-type') })));
});

/**
 * Converte uma `string` url em um `FileData`
 * 
 * @param {String} filename - Nome do arquivo com extensão
 * @param {String} url - Url ao qual o arquivo sera baixado e convertido
 * @returns {Promise}
 */
const urlToFile = (filename, url) => new Promise((resolve) => {
        
    fetch(url)
        .then(async (response) => resolve(new File([ await response.blob() ], filename, { type : response.headers.get('Content-type') })));
});

/**
 * Devolve o valor de um cookie
 * 
 * @param {string} name - Nome do cookie
 * @returns {string}
 */
const getCookie = (name) => {

    return cookies.get(name) || '';
};

/**
 * Remove o cookie com o nome informado
 * 
 * @param {string} name - Nome do cookie
 * @returns {void}
 */
const deleteCookie = (name) => {

    return cookies.remove(name, {
        ...cookieConfig
    });
};

/**
 * Define um cookie
 * 
 * @param {string} name - Nome do cookie
 * @param {string} value - Valor que o cookie herdara
 * @param {object} value - Opções usadas pela lib "universal-cookies"
 * @returns {void}
 */
const setCookie = (name, value, options) => {

    const date		= new Date(new Date().getTime() + (604800 * 1000)); // Por padrão é dados 7 (sete) dias de válidade
    const hours 	= date.setHours(date.getHours());
    const newDate 	= new Date(hours);

    cookies.set(name, value, {
        expires : newDate,
        ...cookieConfig,
        ...options
    });

    return true;
};

/**
 * Recebe um objeto e devolve o mesmo com todos os campos de string vazios, indefinidos e nulos removidos
 * 
 * @param {object} fields - Objeto a ser limpado
 * @returns {object}
 */
const sanitizeObject = (fields) => {

    if (fields instanceof Object) {

        for (const field in fields) {

            if (fields[field] instanceof Object) {

                fields[field] = sanitizeObject(fields[field]);

                if (!Object.keys(fields[field]).length) {

                    delete fields[field];
                }
            } else if (fields[field] === null || fields[field] === undefined || fields[field] === '') {

                delete fields[field];
            } else {

                fields[field] = isNaN(fields[field]) ? fields[field].trim() : fields[field];
            }
        }
    }

    return JSON.parse(JSON.stringify(fields));
};

export {
    reduceObject,
    fileToBase64,
    base64ToFile,
    urlToFile,
    getCookie,
    deleteCookie,
    setCookie,
    sanitizeObject
};