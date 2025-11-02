import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

// Appearances
import theme from '@/views/appearances/themes/default';

//
import Table from './index';

describe('Testando componente: Table', () => {

    const Component = ({ ...props }) => (
        <ThemeProvider theme={theme}>
            <Table {...props}
                head={[
                    {
                        label 	: 'Logradouro',
                        name 	: 'address.street'
                    },
                    {
                        label 	: 'Bairro',
                        name 	: 'address.district'
                    },
                    {
                        label 	: 'Número',
                        name 	: 'address.number'
                    }
                ]}
                body={[
                    {
                        address : {
                            street 		: 'Rua teste',
                            district 	: 'Bairro teste',
                            number 		: '123'
                        }
                    },
                    {
                        address : {
                            street 		: 'Rua testador',
                            district 	: 'Bairro testador',
                            number 		: '456'
                        }
                    },
                    {
                        address : {
                            street 		: 'Rua testado',
                            district 	: 'Bairro testado',
                            number 		: '789'
                        }
                    }
                ]}
            />
        </ThemeProvider>
    );

    it('Deve renderizar um componente Table padrão', () => {

        const { getByText, getByTestId, queryAllByRole } = render(<Component />);

        expect(getByTestId('table')).toBeTruthy();
        expect(getByTestId('table-head')).toBeTruthy();
        expect(getByTestId('table-body')).toBeTruthy();
        expect(queryAllByRole('row')).toHaveLength(4);

        expect(getByText('Rua teste')).toBeTruthy();
        expect(getByText('Bairro testador')).toBeTruthy();
        expect(getByText('789')).toBeTruthy();
    });

    it('Deve renderizar um componente Table padrão com checkable ativo', () => {

        const { getByTestId, container } = render(<Component checkable={true} />);

        const tableCheckAll = getByTestId('table-check-all');

        expect(tableCheckAll).toBeTruthy();
        expect(container.querySelectorAll('input[type=checkbox]:not(:checked)')).toHaveLength(4);

        fireEvent.click(tableCheckAll.querySelector('input[type=checkbox]'));

        expect(container.querySelectorAll('input[type=checkbox]:checked')).toHaveLength(4);
    });

    it('Deve renderizar um componente Table padrão com checkable ativo e verificar seu callback', () => {

        const onCheck = (items) => {

            const [ row1, row2, row3 ] = items;

            expect(items).toHaveLength(3);

            expect(row1.address.street).toEqual('Rua teste');
            expect(row2.address.district).toEqual('Bairro testador');
            expect(row3.address.number).toEqual('789');
        };

        const { getByTestId, container } = render(<Component checkable={true} onCheck={onCheck} />);

        const tableCheckAll = getByTestId('table-check-all');

        expect(container.querySelectorAll('input[type=checkbox]:not(:checked)')).toHaveLength(4);

        fireEvent.click(tableCheckAll.querySelector('input[type=checkbox]'));

        expect(container.querySelectorAll('input[type=checkbox]:checked')).toHaveLength(4);
    });
});