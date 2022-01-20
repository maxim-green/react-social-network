import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from './Input.module.scss'
import {InputPropsType} from '../Form/Form'

export const InputFile: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                           name,
                                                                                                           required = false,
                                                                                                           disabled = false,
                                                                                                           onChange,
                                                                                                           onBlur
                                                                                                       }, ref) => {
    const onDrop = useCallback(acceptedFiles => {
        onChange && onChange(acceptedFiles[0])
    }, [onChange])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <div className={classes.inputFile + (isDragActive ? ' ' + classes.dragActive : '')} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
                isDragActive ?
                    <span className={classes.inputFileBox}>Drop your files here...</span> :
                    <span className={classes.inputFileBox}>Drop your files here or click to select files</span>
            }
        </div>
    )
})