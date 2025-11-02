import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import RadioGroup from '@mui/material/RadioGroup';

// Appearances
import theme from '@/views/appearances/themes/default';

// Conifg
import rules from '@/config/rules';

//
import { Input, Checkbox, Radio, Select } from './index';

describe('Testando componente: Form', () => {

    // eslint-disable-next-line react/prop-types
    const FormWizard = ({ children, onSubmit }) => {

        const methods = useForm();

        return (
            <ThemeProvider theme={theme}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        { children }
                        <button type="submit" data-testid="button-submit">
                            Send Me
                        </button>
                    </form>
                </FormProvider>
            </ThemeProvider>
        );
    };

    it('Deve renderizar um componente Input padrão, testar sua validação e submeter o formulário', async () => {

        const value = 'John Doe';

        const { getByTestId } = render(
            <FormWizard onSubmit={(data) => expect(data.field).toEqual(value)}>
                <Input label="Custom Field" type="text" name="field" rules={{
                    required : rules.required
                }} />
            </FormWizard>
        );

        const input = getByTestId('input');
        const submit = getByTestId('button-submit');

        expect(input).toBeTruthy();
        
        fireEvent.submit(submit);
        
        await waitFor(() => submit);

        expect(getByTestId('input-error')).toBeTruthy();

        fireEvent.input(input, {
            target : { value }
        });

        fireEvent.submit(submit);

        await waitFor(() => submit);
    });

    it('Deve renderizar um componente Checkbox padrão, testar sua validação e submeter o formulário', async () => {

        const CheckList = () => {

            const { register, formState : { errors } } = useFormContext();

            return (
                <>
                    <Checkbox label="Option 1" value="option_1" {...register('checkbox')} />
                    <Checkbox label="Option 2" value="option_2" {...register('checkbox', {
                        required : rules.required
                    })} error={errors?.checkbox?.message} />
                    <Checkbox label="Option 3" value="option_3" {...register('checkbox')} />
                </>
            );
        };

        const { getByTestId, getAllByTestId } = render(
            <FormWizard onSubmit={(data) => { expect(data.checkbox).toContain('option_2'); expect(data.checkbox).toContain('option_3'); }}>
                <CheckList />
            </FormWizard>
        );

        const input = getAllByTestId('input-checkbox');
        const submit = getByTestId('button-submit');

        expect(input).toBeTruthy();
        
        fireEvent.submit(submit);
        
        await waitFor(() => submit);

        expect(getByTestId('input-error')).toBeTruthy();

        fireEvent.click(input[1]);

        await waitFor(() => input[1]);

        fireEvent.click(input[2]);

        await waitFor(() => input[2]);

        fireEvent.submit(submit);

        await waitFor(() => submit);
    });

    it('Deve renderizar um componente Radio padrão, testar sua validação e submeter o formulário', async () => {

        const value = 'option_2';

        const RadioList = () => {

            const { register, formState : { errors } } = useFormContext();

            return (
                <RadioGroup name="radio_1" defaultValue="1">
                    <Radio label="Option 1" value="option_1" {...register('radio', {
                        required : rules.required
                    })} error={errors?.radio?.message} />
                    <Radio label="Option 2" value="option_2" {...register('radio')} />
                    <Radio label="Option 3" value="option_3" {...register('radio')} />
                </RadioGroup>
            );
        };

        const { getByTestId, getAllByTestId } = render(
            <FormWizard onSubmit={(data) => expect(data.radio).toEqual(value)}>
                <RadioList />
            </FormWizard>
        );

        const input = getAllByTestId('input-radio');
        const submit = getByTestId('button-submit');

        expect(input).toBeTruthy();
        
        fireEvent.submit(submit);
        
        await waitFor(() => submit);

        expect(getByTestId('input-error')).toBeTruthy();

        fireEvent.click(input[0]);

        await waitFor(() => input[0]);

        expect(input[0].checked).toBeTruthy();

        fireEvent.click(input[1]);

        await waitFor(() => input[1]);

        fireEvent.submit(submit);

        await waitFor(() => submit);
    });

    it('Deve renderizar um componente Select padrão, testar sua validação e submeter o formulário', async () => {

        const value = 'option_3';

        const SelectList = () => (
            <Select name="select" rules={{
                required : rules.required
            }}>
                <option value="">...</option>
                <option value="option_1">Option 1</option>
                <option value="option_2">Option 2</option>
                <option value="option_3">Option 3</option>
            </Select>
        );

        const { getByTestId } = render(
            <FormWizard onSubmit={(data) => expect(data.select).toEqual(value)}>
                <SelectList />
            </FormWizard>
        );

        const select = getByTestId('input-select');
        const submit = getByTestId('button-submit');

        expect(select).toBeTruthy();
        
        fireEvent.submit(submit);
        
        await waitFor(() => submit);

        expect(getByTestId('input-error')).toBeTruthy();

        fireEvent.change(select.querySelector('select'), {
            target : {
                value
            }
        });

        await waitFor(() => select);

        fireEvent.submit(submit);

        await waitFor(() => submit);
    });
});