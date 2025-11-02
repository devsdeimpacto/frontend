import { reduceObject, setCookie, getCookie, deleteCookie, sanitizeObject } from '../helpers';

describe('Testando funções de helpers.js', () => {

    beforeEach(() => {
        
        Object.defineProperty(document, 'cookie', {
            writable    : true,
            value       : 'name=John Doe',
        });
    });

    it('Deve retornar o valor aninhado do objeto', () => {

        const result = reduceObject('vehicle.model', {
            name : 'Bruno',
            email : 'bruno@teste.com',
            vehicle : {
                brand : 'VW',
                model : 'gol'
            }
        });

        expect(result).toBe('gol');
    });

    it('Deve ler um cookie', () => {

        const result = getCookie('name');

        expect(result).toBe('John Doe');
    });

    it('Deve criar um cookie', () => {

        setCookie('email', 'johndoe@test.com');

        const result = getCookie('email');

        expect(result).toBe('johndoe@test.com');
    });

    it('Deve excluir um cookie', () => {

        deleteCookie('email');

        const result = getCookie('email');

        expect(result).toBe('');
    });

    it('Deve limpar os campos nulos, indefinidos e vazios de um objeto', () => {

        const result = sanitizeObject({
            name    : 'John Doe',
            email   : 'johndoe@test.com',
            phone   : null,
            vehicle : {
                brand   : 'VW',
                model   : undefined,
                km      : 12000,
                vin     : ''
            }
        });

        expect(result).toEqual({
            name    : 'John Doe',
            email   : 'johndoe@test.com',
            vehicle : {
                brand   : 'VW',
                km      : 12000
            }
        });
    });
});