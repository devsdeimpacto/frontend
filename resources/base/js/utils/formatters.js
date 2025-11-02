import { format, isDate, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import currency from 'currency.js';

/**
 * Converte uma data no formato DD/MM/YYYY para o formato date ISO YYYY-MM-DD
 * 
 * @param {string} date - Data DD/MM/YYYY
 * @returns {string}
 */
const dateToISO = (date) => {

    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/g;

    if (pattern.test(date)) {

        return format(new Date(date.replace(pattern, '$3/$2/$1')), 'yyyy-MM-dd', {
            locale : ptBR
        });
    }
};

/**
 * Converte uma data no formato datetime YYYY-MM-DD para o formato DD/MM/YYYY
 * 
 * @param {string} date - Data YYYY-MM-DD
 * @returns {string}
 */
const ISOToDate = (date) => {

    if (!isNaN(new Date(date).getTime())) {

        return format(new Date(date), 'dd/MM/yyyy', {
            locale : ptBR
        });
    }
};

/**
 * Converte uma data no formato datetime YYYY-MM-DD para o formato DD/MM/YYYY
 * 
 * @param {string} date - Data YYYY-MM-DD
 * @returns {string}
 */
const convertDateBR = (date) => { 

    if (!isNaN(parseISO(date).getTime())) {

        return format(parseISO(date), 'dd/MM/yyyy', {
            locale : ptBR
        });
    }
};

/**
 * Recebe uma data no formato datetime YYYY-MM-DD e retorna as horas, minutos
 * 
 * @param {string} date - Data YYYY-MM-DD
 * @returns {string}
 */
const getHoursAndMinutes = (date) => {

    date = new Date(date);

    if (!isNaN(date.getTime())) {

        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
};

/**
 * Converte um objeto para uma querystring
 * 
 * @param {object} params - Objeto que será convertido para uma querystring
 * @returns {string}
 */
const queryParamsStringfy = (params) => {

    return Object.keys(params).map((key) => {

        let value = params[key];

        if (isDate(value)) {

            value = value.toISOString();
        }

        return value ? `${key}=${typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : value}` : false;
    }).filter((item) => item).join('&');
};

/**
 * Converte o valor informado para decimal
 * 
 * @param {any} value - Valor a ser convertido
 * @returns {number}
 */
const toDecimal = (value) => {

    if (!isNaN(value)) {

        value = Number(value).toFixed(0);
    }

    value = String(value).replace(/\D/g, '');
    value = parseFloat(value).toFixed(0);

    return !isNaN(value) ? value : 0;
};

/**
 * Converte o valor informado para o padrão BRL
 * 
 * @param {string} value - Valor a ser convertido
 * @returns {string}
 */
const toCurrencyBRL = (value) => {

    value = toDecimal(value);

    value = currency(value, { 
        fromCents : true, 
        precision : 2
    }).format({
        symbol : 'R$ ',
        decimal : ',',
        separator : '.'
    });
	
    return value;
};

/**
 * Converte o valor informado para o padrão placa Mercosul
 * 
 * @param {string} value - Valor a ser convertido
 * @returns {string}
 */
const plateToMercosul = plate => {
    const map = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
    if (/[0-9]/.test(plate[4]))
        return plate.slice(0, 4) + map[plate[4]] + plate.slice(5, 7);
    
};

export {
    dateToISO,
    ISOToDate,
    getHoursAndMinutes,
    queryParamsStringfy,
    toCurrencyBRL,
    toDecimal,
    convertDateBR,
    plateToMercosul
};