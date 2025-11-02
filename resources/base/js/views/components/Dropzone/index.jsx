import React, { forwardRef, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import Skeleton from '@mui/material/Skeleton';
import { useController, useFormContext } from 'react-hook-form';
import NoteAddRounded from '@mui/icons-material/NoteAddRounded';
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ImageSearchRounded from '@mui/icons-material/ImageSearchRounded';
import CancelRounded from '@mui/icons-material/CancelRounded';

// Components
import IconButton from '@/views/components/IconButton';

// Style
import useStyle from './style';

/**
 * Renderiza um componente com uma area para dropzone customizado
 * 
 * @component
 */
const DropZone = forwardRef(({ children, className, size, accept, name, skeleton, error, rules, ...rest }, ref) => {

    const { control, setValue, setError } = useFormContext();

    const { field, fieldState : { error : fieldError } } = useController({ control, name, rules });

    const innerRef = useRef();

    const dropRef = useRef();

    const classes = useStyle();

    className = [
        className,
        classes.dropzone
    ].join(' ').trim();

    //
    const dragOver = useCallback((e) => {

        e.preventDefault();
    }, []);

    //
    const dragEnter = useCallback((e) => {

        e.preventDefault();

        const { currentTarget } = e;

        currentTarget.classList.add('dropzone-dragenter');
    }, []);

    //
    const dragLeave = useCallback((e) => {

        e.preventDefault();

        removeOverlay(e);
    }, []);

    //
    const drop = useCallback((e) => {

        e.stopPropagation();
        e.preventDefault();

        removeOverlay(e);

        changeFile(e);
    }, [ innerRef ]);  

    //
    const openFile = useCallback(() => {

        if (!innerRef.current) {

            return false;
        }

        innerRef.current.click();
    }, [ innerRef ]);

    //
    const removeFile = useCallback((e) => {

        e.stopPropagation();

        if (!innerRef.current) {

            return false;
        }

        innerRef.current.value = null;

        setValue(field.name, null, {
            shouldDirty : false,
            shouldTouch : false,
            shouldValidate : true
        });

        dropRef.current.classList.remove('dropzone-success');
    }, [ field.value ]);

    //
    const changeFile = useCallback((e) => {

        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

        if (!validateFile(files[0])) {

            return false;
        }

        if (rest.onChange) {

            rest.onChange(e);
        }

        field.onChange(files);
    }, [ field.value ]);

    //
    const removeOverlay = (e) => {
        
        const { currentTarget, target } = e;   
        
        const classList = target.classList;

        if (classList.contains('dropzone-overlay')) {

            currentTarget.classList.remove('dropzone-dragenter');
        }
    };

    //
    const createRef = (e) => {

        innerRef.current = e;

        field.ref(e);

        if (ref) {

            ref(e);
        }
    };

    //
    const validateFile = (file) => {

        const fileSize = (1024 * size);

        let error = null;

        if (!file) {

            return false;
        }

        try {

            if (accept) {

                const accepts = accept.split(',');

                if (!accepts.includes(file.type)) {

                    error = 'Arquivo com formato inválido';
                }
            } else if ((file.size / fileSize) > fileSize) {

                error = `Arquivo superior a ${size}mb`;
            }

            if (error) {

                dropRef.current.classList.add('dropzone-error');
                dropRef.current.classList.remove('dropzone-success');

                throw error;
            }

            dropRef.current.classList.add('dropzone-success');
            dropRef.current.classList.remove('dropzone-error');

            return true;
        } catch (error) {

            setError(field.name, {
                type    : 'manual',
                message : error
            });
        }
    };

    //
    const fileData = useMemo(() => {

        let result = {
            success     : false,
            filename    : null,
            url         : null,
            type        : null,
            error       : error || fieldError?.message
        };
        
        if (!field.value || error || fieldError) {

            return result;
        }

        const file = field.value[0];

        result = {
            ...result,
            success     : true,
            filename    : file.name,
            url         : URL.createObjectURL(file),
            type        : file.type,
        };

        return result;
    }, [ field.value, error, fieldError ]);

    return (
        <FormControl className={className} error={!!fileData.error} ref={dropRef} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={drop} data-testid="dropzone">
            { !skeleton ? 
                <>
                    <div className="dropzone-overlay"></div>
                    <input onChange={changeFile} ref={createRef} type="file" accept={accept} multiple={false} />
                    { children ? children({ openFile, removeFile, ...fileData }) : null }
                </>
                :
                <Skeleton variant="rect" width="100%" height="100%"/>
            }
        </FormControl>
    );
});

DropZone.propTypes = {
    /**
     * Recebe um valor em MBs para limitar o tamanho do arquivo carregado
     */
    size : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    /**
     * Recebe uma classe personalizada
     */
    className : PropTypes.string,
    /**
	 * Recebe os tipos validos para esse upload
	 */
    accept : PropTypes.string,
    /**
     * Recebe um name para utilização de formularios
     */
    name : PropTypes.string.isRequired,
    /**
     * Recebe um booleano para habilitar o skeleton
     */
    skeleton : PropTypes.bool,
    /**
     * Recebe uma string com um texto de erro
     */
    error : PropTypes.string,
    /**
     * Recebe um objeto de regras de validação seguindo a documentação da biblioteca "react-hook-form"
     */
    rules : PropTypes.object,
};

DropZone.defaultProps = {
    size : 1,
    skeleton : false
};

/**
 * Renderiza um componente de dropzone especifico para arquivos
 * 
 * @component
 */
const DropFile = forwardRef(({ children, ...rest }, ref) => {

    rest.className = [
        rest.className,
        'dropzone-file',
    ].join(' ').trim();

    return (
        <DropZone {...rest} ref={ref} accept="application/pdf">
            { (props) => (
                <DropContent {...props} type="file">
                    { children }
                </DropContent>
            ) }
        </DropZone>
    );
});

DropFile.propTypes = DropZone.propTypes;

DropFile.defaultProps = DropZone.defaultProps;

/**
 * Renderiza uma componente de dropzone especifico para imagens
 * 
 * @component
 */
const DropImage = forwardRef(({ children, ...rest }, ref) => {

    rest.className = [
        rest.className,
        'dropzone-image',
    ].join(' ').trim();

    return (
        <DropZone {...rest} ref={ref} accept="image/jpeg,image/png">
            { (props) => (
                <DropContent {...props} type="image">
                    { children }
                </DropContent>
            ) }
        </DropZone>
    );
});

DropImage.propTypes = DropZone.propTypes;

DropImage.defaultProps = DropZone.defaultProps;

const DropContent = ({ children, type, openFile, removeFile, success, error, filename, url }) => (
    <>
        <div className="dropzone-icon">
            <div className="dropzone-button" onClick={openFile}>
                {
                    (success && !children) ? (
                        <IconButton size="small" className="dropzone-remove-button" onClick={removeFile}>
                            <CancelRounded fontSize="small" />
                        </IconButton>
                    ) : null
                }
                {
                    success ? (
                        type === 'file' ? <CheckCircleRounded className="icon" /> : (
                            <div className="dropzone-avatar" style={{ backgroundImage : `url(${url})` }}></div>
                        )
                    ) : !error ? (
                        type === 'file' ? <NoteAddRounded className="icon" /> : <ImageSearchRounded className="icon" />
                    ) : (
                        <ErrorRounded className="icon" />
                    )
                }
            </div>
        </div>
        { children ? (
            <div className="dropzone-content">
                { children({ openFile, removeFile, error, success, filename, url }) }
            </div>
        ) : null }
    </>
);

DropContent.propTypes = {
    type : PropTypes.string.isRequired,
    openFile : PropTypes.func.isRequired,
    removeFile : PropTypes.func.isRequired,
    success : PropTypes.bool.isRequired,
    error : PropTypes.string,
    filename : PropTypes.string,
    url : PropTypes.string,
};

export default DropZone;

export {
    DropFile,
    DropImage,
    DropContent
};