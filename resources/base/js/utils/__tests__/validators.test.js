import { isCpf, isCnpj, isEmail, isCnh, isRenavam, isVin } from '../validators';

describe('Testando funções de validators.js', () => {

    it('Deve retornar um booleano indicando se o valor informado é um CPF válido ou inválido', () => {

        const result_1 = isCpf('242.421.700-92'); // Válido
        const result_2 = isCpf('90767140028'); // Válido
        const result_3 = isCpf(77088875004); // Válido
        const result_4 = isCpf('815.052.570-01'); // Inválido
        const result_5 = isCpf('50272631059'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeTruthy();
        expect(result_4).toBeFalsy();
        expect(result_5).toBeFalsy();
    });

    it('Deve retornar um booleano indicando se o valor informado é um CNPJ válido ou inválido', () => {

        const result_1 = isCnpj('28.032.653/0001-71'); // Válido
        const result_2 = isCnpj('66719386000102'); // Válido
        const result_3 = isCnpj(66448402000161); // Válido
        const result_4 = isCnpj('71.882.179/0001-38'); // Inválido
        const result_5 = isCnpj('80974524000164'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeTruthy();
        expect(result_4).toBeFalsy();
        expect(result_5).toBeFalsy();
    });

    it('Deve retornar um booleano indicando se o valor informado é um E-mail válido ou inválido', () => {

        const result_1 = isEmail('johndoe@test.com'); // Válido
        const result_2 = isEmail('john.doe@test.com.br'); // Válido
        const result_3 = isEmail('johndoe@test'); // Inválido
        const result_4 = isEmail('johndoe'); // Inválido
        const result_5 = isEmail('johndoe@.com'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeFalsy();
        expect(result_4).toBeFalsy();
        expect(result_5).toBeFalsy();
    });

    it('Deve retornar um booleano indicando se o valor informado é uma CNH válida ou inválida', () => {

        const result_1 = isCnh('35938220372'); // Válido
        const result_2 = isCnh(24916102700); // Válido
        const result_3 = isCnh('42303715389'); // Inválido
        const result_4 = isCnh(16089677068); // Inválido
        const result_5 = isCnh('5461521810'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeFalsy();
        expect(result_4).toBeFalsy();
        expect(result_5).toBeFalsy();
    });

    it('Deve retornar um booleano indicando se o valor informado é um Renavam válido ou inválido', () => {

        const result_1 = isRenavam('49959779542'); // Válido
        const result_2 = isRenavam(39217282313); // Válido
        const result_3 = isRenavam('11897523681'); // Inválido
        const result_4 = isRenavam(69742969579); // Inválido
        const result_5 = isRenavam('4340542611'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeFalsy();
        expect(result_4).toBeFalsy();
        expect(result_5).toBeFalsy();
    });

    it('Deve retornar um booleano indicando se o valor informado é um Chassi válido ou inválido', () => {

        const result_1 = isVin('JN8AS5MTXEW610268'); // Válido
        const result_2 = isVin('1me bp88u0 gg 643233'); // Válido
        const result_3 = isVin('3EXVB99E4H3BS5755'); // Inválido
        const result_4 = isVin('8An 7AVeAl u9 w91761'); // Inválido

        expect(result_1).toBeTruthy();
        expect(result_2).toBeTruthy();
        expect(result_3).toBeFalsy();
        expect(result_4).toBeFalsy();
    });
});