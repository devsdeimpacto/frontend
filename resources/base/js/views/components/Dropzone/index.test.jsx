import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useForm, FormProvider } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import CancelRounded from '@mui/icons-material/CancelRounded';

// Appearances
import theme from '@/views/appearances/themes/default';

// Conifg
import rules from '@/config/rules';

// Components
import IconButton from '@/views/components/IconButton';
import Button from '@/views/components/Button';

//
import DropZone from './index';

describe('Testando componente: Dropzone', () => {

    window.URL.createObjectURL = jest.fn();

    afterEach(() => {

        window.URL.createObjectURL.mockReset();
    });

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

    it('Deve renderizar um componente DropZone, testar sua validação e submeter o formulário', async () => {

        const { getByTestId } = render(
            <FormWizard onSubmit={(data) => expect(data.dropzone).toHaveLength(1)}>
                <DropZone name="dropzone" rules={{
                    required : rules.required
                }} accept="image/jpg">
                    { ({ openFile, removeFile, error, success, filename }) => (
                        <>
                            { success ? (
                                <FormHelperText className="dropzone-filename" data-testid="dropzone-filename">
                                    { filename }
                                    <IconButton size="small" onClick={removeFile} data-testid="dropzone-removefile">
                                        <CancelRounded fontSize="small" />
                                    </IconButton>
                                </FormHelperText>
                            ) : null }
                            <Button title="Anexar arquivo" variant={success ? 'outlined' : 'contained'} color={!error ? 'primary' : 'error'} onClick={openFile}>
                                Anexar arquivo
                            </Button>
                            {
                                error ? (
                                    <FormHelperText data-testid="dropzone-error">
                                        { error }
                                    </FormHelperText>
                                ) : null
                            }
                        </>
                    ) }
                </DropZone>
            </FormWizard>
        );

        const dropzone = getByTestId('dropzone');
        const submit = getByTestId('button-submit');

        expect(dropzone).toBeTruthy();
        
        fireEvent.submit(submit);
        
        await waitFor(() => submit);

        expect(getByTestId('dropzone-error')).toBeTruthy();

        let file = new File([ '' ], 'test-image-1.png', { type: 'image/png' });

        fireEvent.change(dropzone.querySelector('input[type=file]'), {
            target: { files: [ file ] }
        });

        fireEvent.submit(submit);

        await waitFor(() => submit);
        
        expect(getByTestId('dropzone-error')).toBeTruthy();

        file = new File([ '' ], 'test-image-2.jpg', { type: 'image/jpg' });

        fireEvent.change(dropzone.querySelector('input[type=file]'), {
            target: { files: [ file ] }
        });

        await waitFor(() => dropzone);

        expect(getByTestId('dropzone-filename')).toBeTruthy();

        const removeFile = getByTestId('dropzone-removefile');

        fireEvent.click(removeFile);

        await waitFor(() => removeFile);

        expect(getByTestId('dropzone-error')).toBeTruthy();

        file = new File([ '' ], 'test-image-3.jpg', { type: 'image/jpg' });

        fireEvent.change(dropzone.querySelector('input[type=file]'), {
            target: { files: [ file ] }
        });

        await waitFor(() => dropzone);

        expect(getByTestId('dropzone-filename')).toBeTruthy();

        fireEvent.submit(submit);

        await waitFor(() => submit);
    });
});