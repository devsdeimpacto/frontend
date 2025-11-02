const rules = {
    required 						: 'Campo obrigatório',
    maxLength 						: 'Valor máximo de {max} caracteres atingido',
    minLength 						: 'Valor mínimo de {min} caracteres não foi atingido',
    passwordsNotEquals				: 'As senhas não são idênticas',
    passwordHasManyRepeatLetters 	: 'A senha possui multíplos carácteres repetidos. [{letters}]',
    passwordHasLittleUniqueLetters	: 'A senha possui pocucos carácteres únicos',
    invalidPeriod 					: 'Período inválido',
    invalidCpf 						: 'CPF inválido',
    invalidCnpj						: 'CNPJ inválido',
    invalidDocument 				: 'Documento informado é inválido',
    invalidEmail                    : 'Campo de e-mail inválido!',
    existingCpf						: 'CPF existente',
    invalidCnh 						: 'CNH inválida'
};

export default rules;