/**
 * Verifica se o valor informado é um cpf válido
 * 
 * @param {string} cpf - Número do Cpf
 * @returns {boolean}
 */
const isCpf = (cpf) => {

    let numbers,
        digits,
        sum,
        i,
        result,
        digits_equals = 1;
	
    cpf = String(cpf).replace(/[.|\-]/g, '');

    if (cpf.length < 11) {

        return false;
    }

    for (i = 0; i < cpf.length - 1; i = i + 1) {

        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {

            digits_equals = 0;

            break;
        }
    }

    if (!digits_equals) {

        numbers = cpf.substring(0, 9);
        digits	= cpf.substring(9);
        sum	= 0;

        for (i = 10; i > 1; i = i - 1) {

            sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (parseInt(result, 10) !== parseInt(digits.charAt(0), 10)) {

            return false;
        }

        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i = i - 1) {
            sum += numbers.charAt(11 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (parseInt(result, 10) !== parseInt(digits.charAt(1), 10)) {

            return false;
        }

        return true;
    }

    return false;
};

/**
 * Verifica se o valor informado é um cnpj válido
 * 
 * @param {string} cnpj - Número do Cnpj
 * @returns {boolean}
 */
const isCnpj = (cnpj) => {
        
    let size,
        sum,
        i,
        numbers,
        result,
        pos;

    cnpj = String(cnpj).replace(/[^\d]+/g, '');
 
    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == '00000000000000' || 
		cnpj == '11111111111111' || 
		cnpj == '22222222222222' || 
		cnpj == '33333333333333' || 
		cnpj == '44444444444444' || 
		cnpj == '55555555555555' || 
		cnpj == '66666666666666' || 
		cnpj == '77777777777777' || 
		cnpj == '88888888888888' || 
		cnpj == '99999999999999')
        return false;

    // Valida DVs
    size = cnpj.length - 2;
    numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) {
        return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
	
    if (result != digits.charAt(1)) {
        return false;
    }

    return true;
};

/**
 * Verifica se o valor informado é um email válido
 * 
 * @param {string} email - Email
 * @returns {boolean}
 */
const isEmail = (email) => {
    
    return (/^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email || null);
};

/**
 * Verifica se o valor informado é uma cnh válida
 * 
 * @param {string} cnh - Número da CNH
 * @returns {boolean}
 */
const isCnh = (cnh) => {
    
    cnh = String(cnh).replace(/\D/g, '').padStart(11, '0');
            
    var dsc = 0;
    var v = 0;

    for (let i = 0, j = 9; i < 9; i++, j--) {
            
        v += Number(cnh[i]) * j;
    }

    var vl1 = v % 11;

    if (vl1 >= 10) {
            
        vl1 = 0;
        dsc = 2;
    }

    v = 0;
    
    for (let i = 0, j = 1; i < 9; ++i, ++j) {
        
        v += (Number(cnh[i]) * j);
    }

    var x = v % 11;
    var vl2 = (x >= 10) ? 0 : x - dsc;

    return Number(`${vl1}${vl2}`) === Number(cnh.substring(cnh.length - 2, cnh.length));
};

/**
 * Verifica se o valor informado é um renavam válido
 * 
 * @param {string} renavam - Número do Renavam
 * @returns {boolean}
 */
const isRenavam = (renavam) => {

    renavam = String(renavam).replace(/\D/g, '').padStart(11, '0');

    var renavamSemDigito = renavam.substring(0, 10);
    
    var renavamReversoSemDigito = renavamSemDigito.split('').reverse().join('');
    
    let soma = 0;
    let multiplicador = 2;
    
    for (let i=0; i<10; i++){
        
        const algarismo = renavamReversoSemDigito.substring(i, i+1);
        
        soma += algarismo * multiplicador;
        
        multiplicador = multiplicador >= 9 ? 2 : (multiplicador + 1);
    }
    
    let ultimoDigitoCalculado = 11 - (soma % 11);

    ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);

    const digitoRealInformado = Number(renavam.substring(renavam.length - 1, renavam.length));

    return (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado) === digitoRealInformado;
};

/**
 * Verifica se o valor informado é um chassi válido
 * 
 * @param {string} vin - Número do Chassi
 * @returns {boolean}
 */
const isVin = (vin) => {

    vin = String(vin).toLowerCase().replace(/\s+/g, '');

    if (!/^[^\Wioq]{17}$/.test(vin)) { 
        
        return false; 
    }

    const transliterationTable = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
        'e': 5,
        'f': 6,
        'g': 7,
        'h': 8,
        'j': 1,
        'k': 2,
        'l': 3,
        'm': 4,
        'n': 5,
        'p': 7,
        'r': 9,
        's': 2,
        't': 3,
        'u': 4,
        'v': 5,
        'w': 6,
        'x': 7,
        'y': 8,
        'z': 9
    };

    const weightsTable = [ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ];
    
    let sum = 0;

    for (let i = 0; i < vin.length; i++) {

        sum += transliterationTable[vin[i]] * weightsTable[i];
    }

    const mod = sum % 11;
    const check_digit = mod === 10 ? 'x' : mod;

    return check_digit == vin[8];
};

export {
    isCpf,
    isCnpj,
    isEmail,
    isCnh,
    isRenavam,
    isVin
};