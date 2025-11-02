import { dateToISO, ISOToDate, getHoursAndMinutes, queryParamsStringfy, toDecimal, toCurrencyBRL } from '../formatters';

describe('Testando funções de formatters.js', () => {

    it('Deve retornar uma data no formato ISO', () => {

        const result = dateToISO('21/09/1990');

        expect(result).toEqual('1990-09-21');
    });

    it('Deve retornar uma data no formato date', () => {

        const result = ISOToDate('1990-09-21');

        expect(result).toEqual('20/09/1990');
    });

    it('Deve retornar a hora e os minutos da data informada', () => {

        const result = getHoursAndMinutes('1990-09-21T15:25:53Z');

        expect(result).toEqual('12:25');
    });

    it('Deve retornar uma queryparams com base em um objeto', () => {

        const result = queryParamsStringfy({
            name        : 'John Doe',
            email       : 'johndoe@teste.com',
            vehicle : {
                brand   : 'VW',
                km      : 12000,
            }
        });

        expect(encodeURI(result)).toEqual('name=John%20Doe&email=johndoe@teste.com&vehicle=%257B%2522brand%2522%253A%2522VW%2522%252C%2522km%2522%253A12000%257D');
    });

    it('Deve retornar um valor convertido de string ou float para decimal', () => {

        const result_1 = toDecimal('123');
        const result_2 = toDecimal('123.51');
        const result_3 = toDecimal('0.99');
        const result_4 = toDecimal('0.49');
        const result_5 = toDecimal('abc456');
        const result_6 = toDecimal('abc');

        expect(Number(result_1)).toEqual(123);
        expect(Number(result_2)).toEqual(124);
        expect(Number(result_3)).toEqual(1);
        expect(Number(result_4)).toEqual(0);
        expect(Number(result_5)).toEqual(456);
        expect(Number(result_6)).toEqual(0);
    });

    it('Deve retornar um valor convertido de string ou inteiro em centavos para a moeda Real (R$) formatada', () => {

        const result_1 = toCurrencyBRL('12300');
        const result_2 = toCurrencyBRL('12451');
        const result_3 = toCurrencyBRL('99');
        const result_4 = toCurrencyBRL(456);
        const result_5 = toCurrencyBRL(45689);
        const result_6 = toCurrencyBRL(0);

        expect(result_1).toEqual('R$ 123,00');
        expect(result_2).toEqual('R$ 124,51');
        expect(result_3).toEqual('R$ 0,99');
        expect(result_4).toEqual('R$ 4,56');
        expect(result_5).toEqual('R$ 456,89');
        expect(result_6).toEqual('R$ 0,00');
    });
});