import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';

// Appearances
import theme from '@/views/appearances/themes/default';

//
import Button from './index';

describe('Testando componente: Button', () => {

    const Component = ({ ...props }) => (
        <ThemeProvider theme={theme}>
            <Button {...props}>
                Click Me
            </Button>
        </ThemeProvider>
    );

    it('Deve renderizar um componente Button padrão', () => {

        const { getByTestId } = render(<Component />);

        expect(getByTestId('button')).toBeTruthy();
    });

    it('Deve renderizar um componente Button padrão desabilitado', () => {

        const { getByTestId } = render(<Component disabled />);

        expect(getByTestId('button').classList.contains('Mui-disabled')).toBeTruthy();
    });

    it('Deve renderizar um componente Button padrão com um icone no inicio', () => {

        const { getByTestId } = render(<Component startIcon={<Check />} />);

        expect(getByTestId('button-start-icon')).toBeTruthy();
    });

    it('Deve renderizar um componente Button padrão com um icone no final', () => {

        const { getByTestId } = render(<Component endIcon={<Check />} />);

        expect(getByTestId('button-end-icon')).toBeTruthy();
    });
});