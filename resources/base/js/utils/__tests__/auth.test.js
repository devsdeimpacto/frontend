import { setJwt, getJwt, isGuest, getUser, deleteJwt } from '../auth';

describe('Testando funções de auth.js', () => {

    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    it('Deve testar o jwt informado e criar seu cookie de acesso', () => {

        const result = setJwt(jwt);

        expect(result).toBeTruthy();
    });

    it('Deve recuperar o cookie de acesso jwt', () => {

        const result = getJwt();

        expect(result).toEqual(jwt);
    });

    it('Deve verificar se o usuário é um conviado', () => {

        const result = isGuest();

        expect(result).toBeTruthy();
    });

    it('Deve retornar os dados decodificados do jwt', () => {

        const result = getUser();

        expect(result).toEqual({ 
            sub     : '1234567890', 
            name    : 'John Doe', 
            iat     : 1516239022 
        });
    });

    it('Deve deletar o cookie com o jwt', () => {

        deleteJwt();

        const result = isGuest();

        expect(result).toBeFalsy();
    });
});