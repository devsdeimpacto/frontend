import React, { useState, forwardRef, memo, useCallback, useRef, useEffect, Fragment } from 'react';

import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';

import Skeleton from '@mui/material/Skeleton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Search from '@mui/icons-material/Search';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import brLocale from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { useFormContext, useController } from 'react-hook-form';

// Style
import useStyle from './style';

// Hooks
import useFetch from '@/hooks/useFetch';

const propTypes = {
    /**
	 * Recebe um valor em string que permite definir o conteúdo do elemento `label`, caso vázio o elemento não será renderizado
	 */
    label : PropTypes.string,
    /**
      * Recebe um `name` para um campo
      */
    name : PropTypes.string.isRequired,
    /**
      * Recebe um objeto de regras de validação seguindo a documentação da biblioteca `react-hook-form`
      */
    rules : PropTypes.object,
    /**
      * Recebe um booleano para habilitar o skeleton
      */
    skeleton : PropTypes.bool,
    /**
      * Recebe uma string com um texto de erro
      */
    error : PropTypes.string,
    /**
      * Recebe uma classe personalizada
      */
    className : PropTypes.string,
};

const defaultProps = {
    skeleton : false
};

/** 
 * Componente padrão de amostragem de erros
 * 
 * @component
 */
const ErrorComponent = ({ value }) => value ? (
    <FormHelperText data-testid="input-error" sx={{ ml: '0px' }}>
        { value }
    </FormHelperText>
) : null;

ErrorComponent.propTypes = {
    /**
	 * Recebe uma string com um texto de erro
	 */
    value : PropTypes.string
};

/** 
 * Renderiza um componente de Input 
 * 
 * @component
 */
const InputBase = forwardRef(({ className, type, name, skeleton, error, mask, rules, ...rest }, ref) => {

    const classes = useStyle();
    const { control } = useFormContext();
    const { field, fieldState : { error : fieldError } } = useController({ control, name, defaultValue : '', rules });

    const innerRef = useRef();
    
    const isPassword = type === 'password';
    const isSearch = type === 'search';
    const isDate = type === 'date';
    const isDateTime = type === 'datetime';
    const isTime = type === 'time';

    const DateComponent = isDate ? DatePicker : isDateTime ? DateTimePicker : isTime ? TimePicker : Fragment;

    const [ visiblePassword, setVisiblePassword ] = useState(false);

    //
    const showHidePassword = useCallback(() => {

        if (isPassword) {

            const input = innerRef.current;

            setVisiblePassword((old) => {

                input.type = old ? 'password' : 'text';

                return !old;
            });
        }
    }, []);

    //
    const onChange = (e) => {

        if (rest.onChange) {

            rest.onChange(e);
        }
        
        field.onChange(e);
    };

    //
    const onBlur = (e) => {

        if (rest.onBlur) {

            rest.onBlur(e);
        }

        field.onBlur(e);
    };

    return (
        <FormControl innerRef={ref} className={className} error={!!(error || fieldError)} fullWidth>
            {
                skeleton ? <Skeleton variant="text" width="100%" height='30px'/> :
                    (!isDate && !isTime && !isDateTime) ? (
                        <TextField
                            {...rest}
                            variant={!rest.variant ? 'outlined' : rest.variant}
                            name={field.name}
                            value={field.value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={(e) => { field.ref(e); innerRef.current = e; }}
                            type={isDate || isTime ? 'tel' : type}
                            error={!!(error || fieldError)}
                            inputProps={{
                                mask : mask || null,
                                className : [
                                    classes.input,
                                    rest?.className,
                                    rest.inputProps?.className
                                ].join(' ').trim(),
                                'data-testid' : 'input',
                                ...rest.inputProps
                            }}
                            InputProps={{
                                endAdornment : (
                                    (isSearch || isPassword) ? (
                                        <>
                                            {
                                                rest.InputProps?.endAdornment ? rest.InputProps.endAdornment : (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={showHidePassword} disabled={!isPassword} data-testid="input-icon-button">
                                                            {
                                                                isPassword ? 
                                                                    visiblePassword ? <Visibility /> : <VisibilityOff /> : 
                                                                    isSearch ? <Search /> : null
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }
                                        </>
                                    ) : rest.InputProps?.endAdornment
                                ),
                                inputComponent : mask ? InputMask : rest.InputProps?.inputComponent,
                                ...rest.InputProps
                            }}
                        />
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
                            <DateComponent 
                                autoOk
                                invalidDateMessage={'Data inválida'}
                                error={!!(error || fieldError)}
                                slotProps={{
                                    textField: (rest) => ({
                                        variant: !rest.variant ? 'outlined' : rest.variant
                                    })
                                }}
                                format="dd/MM/yyyy"
                                {...rest}
                                name={field.name}
                                value={field.value || null}
                                onChange={onChange}
                                onBlur={onBlur}
                                inputProps={{
                                    'data-testid' : 'input-date-picker',
                                    ...rest.inputProps
                                }}
                            />
                        </LocalizationProvider>
                    )
            }
            <ErrorComponent value={(error || fieldError?.message)} />
        </FormControl>
    );
});

InputBase.propTypes = {
    /**
	 * Recebe o valor padrão de um campo do tipo `input`
	 */
    type : PropTypes.string.isRequired,
    /**
     * Disabilitar icone
     */
    disabledIcon : PropTypes.bool,
    /**
     * A mascara trabalha em conjunto com a biblioteca `react-text-mask`
     */
    mask : PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array
    ]),
    ...propTypes
};

InputBase.defaultProps = {
    ...defaultProps
};

/** 
 * Renderiza um componente de Input com mascara
 * 
 * @component
 */
const InputMask = ({ inputRef, ...rest }) => (
    <>
        <MaskedInput
            guide={false}
            {...rest}
            ref={inputRef ? (e) => inputRef(e ? e.inputElement : null) : null}
        />
    </>
);

InputMask.propTypes = {
    /**
	 * Recebe uma função de referencia
	 */
    inputRef : PropTypes.func,
};

/**
 * Renderiza um componente de Radio
 * 
 * @component
 */
const RadioBase = memo(forwardRef(({ className, error, skeleton, ...rest }, ref) => {

    return skeleton ? <Skeleton variant="text" width="100%" height='30px'/> : (
        <FormControl innerRef={ref} className={className} error={!!error}>
            <FormControlLabel
                labelPlacement="end"
                {...rest}
                control={<Radio inputProps={{
                    'data-testid' : 'input-radio',
                    ...rest.inputProps
                }} />}
            />
            <ErrorComponent value={error} />
        </FormControl>
    );
}));

RadioBase.propTypes = { ...propTypes };

RadioBase.defaultProps = { ...defaultProps };

/**
 * Renderiza um componente de Radio 
 * 
 * @component
 */
const CheckboxBase = memo(forwardRef(({ className, name, skeleton, error, rules, ...rest }, ref) => {
    
    const { control } = useFormContext();
    const { fieldState : { error : fieldError } } = useController({ control, name, defaultValue : '', rules });

    return skeleton ? <Skeleton variant="text" width="100%" height='30px' /> : (
        <FormControl innerRef={ref} className={className} error={!!(error || fieldError)}>
            <FormControlLabel
                labelPlacement="end"
                {...rest}
                control={<Checkbox inputProps={{
                    'data-testid' : 'input-checkbox',
                    ...rest.inputProps
                }}/>}
            />
            <ErrorComponent value={(error || fieldError?.message)} />
        </FormControl>
    );
}));

CheckboxBase.propTypes = { ...propTypes };

CheckboxBase.defaultProps = { ...defaultProps };

/**
 * Renderiza um componente de Select 
 * 
 * @component
 */
const SelectBase = forwardRef(({ children, name, className, label, skeleton, error, rules, ...rest }, ref) => {
    
    const { control } = useFormContext();
    const { field, fieldState : { error : fieldError } } = useController({ control, name, defaultValue : '', rules });

    //
    const onChange = (e) => {

        if (rest.onChange) {

            rest.onChange(e);
        }

        field.onChange(e);
    };

    //
    const onBlur = (e) => {

        if (rest.onBlur) {

            rest.onBlur(e);
        }

        field.onBlur(e);
    };
    
    return skeleton ? <Skeleton variant="text" width="100%" height='30px' /> : (
        <>
            <FormControl innerRef={ref} className={className} error={!!(error || fieldError)} fullWidth>
                {
                    label && (
                        <InputLabel>
                            { label }
                        </InputLabel>
                    )
                }
                <Select
                    label={label}
                    IconComponent={ExpandMoreRounded}
                    {...rest}
                    {...field}
                    //displayEmpty={!!label}
                    native
                    onChange={onChange}
                    onBlur={onBlur}
                    data-testid="input-select"
                    variant={!rest.variant ? 'outlined' : rest.variant}
                >
                    { children }
                </Select>
                <ErrorComponent value={(error || fieldError?.message)} />
            </FormControl>
        </>
    );
});

SelectBase.propTypes = { ...propTypes };

SelectBase.defaultProps = { ...defaultProps };

/**
 * Renderiza um componente de Select capaz de acessar uma api informada
 * 
 * @component
 */
SelectBase.Api = forwardRef(({ children, api, skeleton, ...rest }, ref) => {

    const classes = useStyle();

    const [ send, { abort } ] = useFetch(api);
    const [ data, setData ] = useState({});

    //
    const getData = async () => {

        if (api && !skeleton) {

            if (Object.keys(data).length) {

                setData({});
            }

            const response = await send();

            setData(await response.json());
        }
    };

    useEffect(() => {

        getData();

        return () => abort();
    }, [ api, skeleton ]);

    return (
        <SelectBase skeleton={skeleton} disabled={!Object.keys(data).length} {...rest} ref={ref} inputComponent={({ ...props }) => (
            <>
                <Select {...props} className="" native fullWidth />
                { (!Object.keys(data).length && api) && <LinearProgress className={classes.progress} /> }
            </>
        )}>
            { children(data) }
        </SelectBase>
    );
});

SelectBase.Api.propTypes = {
    /**
	 * Recebe um valor em string que permite utilizar uma api para popular o campo de seleção
	 */
    api : PropTypes.string,
    ...propTypes
};

SelectBase.Api.defaultProps = { ...defaultProps };

export {
    InputBase as Input,
    RadioBase as Radio,
    CheckboxBase as Checkbox,
    SelectBase as Select
};