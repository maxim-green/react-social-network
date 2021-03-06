import {Controller, RegisterOptions} from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types/form'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from './InputFile.module.scss'
import {Item} from 'components/_shared/Form/Form'

export const CustomInputFile: React.FC<{ onChange: (file: File) => void }> = (({
                                                                                   onChange
                                                                               }) => {
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
type InputFilePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean,
    onChange?: (file: File) => void
}
export const InputFile: React.FC<InputFilePropsType> = ({
                                                            name,
                                                            label,
                                                            rules,
                                                            control,
                                                            disabled = false,
                                                            onChange
                                                        }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => {
            const handleChange = (file: File) => {
                onChange && onChange(file)
                field.onChange(file)
            }
            return <Item label={label} required={!!rules?.required} error={fieldState.error}
                         disabled={disabled}>
                <CustomInputFile onChange={handleChange}/>
            </Item>
        }}
    />
}