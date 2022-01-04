import React, {useCallback, useState} from 'react'
import classes from './Form.module.scss'
import classnames from 'classnames'
import button from "../../common/Button/Button";
import {useDropzone} from "react-dropzone";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

type FormPropsType = { onSubmit: (e: React.FormEvent) => void }

type FormItemPropsType = {
    component: React.FC<InputPropsType>,
    label?: string,
    error?: { message: string, type: string } | string,
} & InputPropsType

type InputPropsType = {
    name: string,
    required?: boolean,
    disabled?: boolean,
    onChange?: (e: React.ChangeEvent) => void,
    onBlur?: (e: React.ChangeEvent) => void,
    ref?: React.ForwardedRef<any>
}

const Form: React.FC<FormPropsType> & {
    Item: React.FC<FormItemPropsType>
    Row: React.FC
} = ({children, onSubmit}) => {
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

Form.Item = React.forwardRef(({
                                  children,
                                  component,
                                  name,
                                  label,
                                  error,
                                  required,
                                  disabled = false,
                                  onChange,
                                  onBlur,
                              }, ref) => {
    const checkbox = component?.displayName === 'InputCheckbox'
    const forwardRequired = !ref
    const forwardedRequiredProp = forwardRequired ? required : undefined
    return (
        <div
            className={classes.formItem + (disabled ? ' ' + classes.disabled : '') + (checkbox ? ' ' + classes.formItemCheckbox : '')}>
            <label>
                <div className={classes.formItemInfo}>
                    {required && <span className={classes.formItemRequiredMark}>*</span>}
                    <span className={classes.formItemLabel}>{label}</span>
                    {(typeof error === 'string') && <span className={classes.formItemError}>{error}</span>}
                    {(typeof error === 'object') && <span className={classes.formItemError}>{error.message}</span>}
                </div>
                {React.createElement(component, {
                    name,
                    required: forwardedRequiredProp,
                    disabled,
                    onChange,
                    onBlur,
                    ref
                }, children)}
            </label>
        </div>
    )
})

Form.Row = ({children}) => <div className={classes.formRow}>{children}</div>

// below components needed to be moved to separate files when redux-form is removed from project
export const Input: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                       name,
                                                                                                       required = false,
                                                                                                       disabled = false,
                                                                                                       onChange,
                                                                                                       onBlur
                                                                                                   }, ref) => {
    return <input className={classes.input} type="text" name={name} disabled={disabled} onChange={onChange}
                  onBlur={onBlur} ref={ref}/>
})
export const InputPassword: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                               name,
                                                                                                               required = false,
                                                                                                               disabled = false,
                                                                                                               onChange,
                                                                                                               onBlur
                                                                                                           }, ref) => {
    return <input className={classes.input} type="password" name={name} disabled={disabled} required={required}
                  onChange={onChange} onBlur={onBlur} ref={ref} autoComplete={'off'}/>
})

export const InputCheckbox: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                          children,
                                                                                                          name,
                                                                                                          required = false,
                                                                                                          disabled = false,
                                                                                                          onChange,
                                                                                                          onBlur
                                                                                                      }, ref) => {
    return <label className={classes.checkbox}>
        {children}
        <input type="checkbox" name={name} disabled={disabled} required={required} onChange={onChange} onBlur={onBlur}
               ref={ref}/>
        <span className={classes.box}></span>
    </label>
})
InputCheckbox.displayName = 'InputCheckbox'

export const InputRange: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                            name,
                                                                                                            required = false,
                                                                                                            disabled = false,
                                                                                                            onChange,
                                                                                                            onBlur
                                                                                                        }, ref) => {
    return (
        <div className={classes.inputRange}>
            <Slider/>
        </div>
    )
})

export const InputDate: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                           name,
                                                                                                           required = false,
                                                                                                           disabled = false,
                                                                                                           onChange,
                                                                                                           onBlur
                                                                                                       }) => {
    return (
        <input type="date"/>
    )
})

export const InputFile: React.FC<InputPropsType> = React.forwardRef<HTMLInputElement, InputPropsType>(({
                                                                                                           name,
                                                                                                           required = false,
                                                                                                           disabled = false,
                                                                                                           onChange,
                                                                                                           onBlur
                                                                                                       }) => {
    const onDrop = useCallback(acceptedFiles => {
        onChange && onChange(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
                <div className={classes.inputFile + (isDragActive ? ' ' + classes.dragActive : '')} {...getRootProps()}>
                    <input {...getInputProps()}/>
                    {
                        isDragActive ?
                        <span className={classes.inputFileBox}>Drop your files here...</span>:
                        <span className={classes.inputFileBox}>Drop your files here or click to select files</span>
                    }
                </div>
    )
})

export const Button: React.FC<{
    onClick?: (e: React.MouseEvent) => void
    type?: 'primary' | 'secondary' | 'neutral' | 'text' | 'cancel'
    size?: 'small' | 'medium' | 'large'
}> = ({
          children,
          onClick,
          type = 'primary',
          size = 'medium'
      }) => {
    return (
        <button onClick={onClick}
                className={classnames(
                    classes.button,
                    {[classes.primary]: !type || type === 'primary'},
                    {[classes.secondary]: type === 'secondary'},
                    {[classes.neutral]: type === 'neutral'},
                    {[classes.text]: type === 'text'},
                    {[classes.cancel]: type === 'cancel'},
                    {[classes.small]: size === 'small'},
                    {[classes.medium]: size === 'medium'},
                    {[classes.large]: size === 'large'}
                )}>{children}</button>
    )
}

export default Form