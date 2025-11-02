import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';

// Appearances
import theme from '@/views/appearances/themes/default';

//
import Accordion from './index';

describe('Testando componente: Accordion', () => {

    const Component = ({ ...props }) => (
        <ThemeProvider theme={theme}>
            <Accordion title="Item 1" {...props}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam nisi a libero venenatis, vel gravida tellus feugiat. Nam commodo justo sed arcu eleifend semper. Cras euismod consequat ipsum, ac laoreet felis. Suspendisse potenti. Nullam elit arcu, porta vitae ultrices in, rutrum at quam. Maecenas quam risus, aliquam ac tellus vel, fermentum sagittis ex. Duis iaculis ut diam ut consectetur. Aliquam vitae interdum ante. Duis eget mi id libero ornare iaculis. Curabitur arcu odio, finibus nec commodo sit amet, imperdiet a enim. Fusce non blandit lectus. Quisque justo neque, ultricies dictum tempus sit amet, consequat sed enim. Aenean pretium facilisis nisl, ac elementum tellus luctus non. Donec sit amet massa faucibus, viverra purus non, eleifend risus. Curabitur mattis malesuada diam at ultricies.
                </p>
            </Accordion>
        </ThemeProvider>
    );

    it('Deve renderizar um componente Accordion padrão', () => {

        const { getByTestId } = render(<Component />);

        expect(getByTestId('accordion')).toBeTruthy();
        expect(getByTestId('accordion-summary')).toBeTruthy();
        expect(getByTestId('accordion-details')).toBeTruthy();
    });

    it('Deve renderizar um componente Accordion padrão com skeleton ativo', () => {

        const { getByTestId } = render(<Component skeleton={true} />);

        expect(getByTestId('accordion-summary').classList.contains('Mui-disabled')).toBeTruthy();
    });

    it('Deve renderizar um componente Accordion padrão com skeleton desativado', () => {

        const { getByTestId } = render(<Component skeleton={false} />);

        const accordionSummary = getByTestId('accordion-summary');

        expect(accordionSummary.classList.contains('Mui-disabled')).toBeFalsy();
    });

    it('Deve renderizar um componente Accordion padrão e testar suas funcionalidades', () => {

        const { container } = render(<Component />);

        const button = container.querySelector('.MuiAccordionSummary-root:not(.Mui-disabled)');

        expect(button).toBeTruthy();

        fireEvent.click(button);

        expect(button.classList.contains('Mui-expanded')).toBeTruthy();
        expect(container.querySelector('p').innerHTML.includes('Lorem ipsum')).toBeTruthy();
    });
});