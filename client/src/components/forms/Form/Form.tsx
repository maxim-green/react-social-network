import React, {useCallback, useState} from 'react'
import classes from './Form.module.scss'
import classnames from 'classnames'
import button from "../../common/Button/Button";
import {useDropzone} from "react-dropzone";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss'
import Spinner from "../../common/Spinner/Spinner";
import {sizes} from "../../../config";

type FormPropsType = { onSubmit: (e: React.FormEvent) => void }

type FormItemPropsType = {
    component: React.FC<InputPropsType>,
    label?: string,
    error?: { message: string, type: string } | string,
} & InputPropsType

type InputPropsType<V = any> = {
    name: string,
    required?: boolean,
    disabled?: boolean,
    value?: V,
    onChange?: ((e: React.ChangeEvent | V) => void),
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
                                  value
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
                    value,
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

export const InputTextarea: React.FC<InputPropsType> = React.forwardRef<HTMLTextAreaElement, InputPropsType>(({
                                                                                                       name,
                                                                                                       required = false,
                                                                                                       disabled = false,
                                                                                                       onChange,
                                                                                                       onBlur
                                                                                                   }, ref) => {
    return <textarea className={classes.textarea} name={name} disabled={disabled} onChange={onChange}
                  onBlur={onBlur} ref={ref} cols={30} rows={2}/>
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

export const InputDate: React.FC<InputPropsType<Date>> = React.forwardRef<HTMLInputElement, InputPropsType<Date>>(({
                                                                                                                       name,
                                                                                                                       value,
                                                                                                                       required = false,
                                                                                                                       disabled = false,
                                                                                                                       onChange,
                                                                                                                       onBlur,
                                                                                                                       ref
                                                                                                                   }) => {
    const [date, setDate] = useState<Date>(value ? new Date(value) : new Date())
    const changeHandler = (date: Date) => {
        onChange && onChange(date)
        setDate(date)
    }
    return (
        <div className={classes.input}>
            <DatePicker calendarStartDay={1} selected={date} onChange={changeHandler}/>
        </div>
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
                    <span className={classes.inputFileBox}>Drop your files here...</span> :
                    <span className={classes.inputFileBox}>Drop your files here or click to select files</span>
            }
        </div>
    )
})

export const Button: React.FC<{
    onClick?: (e: React.MouseEvent) => void
    type?: 'primary' | 'secondary' | 'neutral' | 'text' | 'cancel'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    spinner?: boolean
}> = ({
          children,
          onClick,
          type = 'primary',
          size = 'medium',
          disabled = false,
          spinner = false
      }) => {
    const spinnerColor = (type === 'primary' || type === 'cancel') ? '#FFFFFF' : undefined
    return (
        <button onClick={onClick} disabled={disabled || spinner}
                className={classnames(
                    classes.button,
                    {[classes.primary]: !type || type === 'primary'},
                    {[classes.secondary]: type === 'secondary'},
                    {[classes.neutral]: type === 'neutral'},
                    {[classes.text]: type === 'text'},
                    {[classes.cancel]: type === 'cancel'},
                    {[classes.spinner]: spinner},
                    {[classes.small]: size === 'small'},
                    {[classes.medium]: size === 'medium'},
                    {[classes.large]: size === 'large'},
                )}>
            {/*<div className={classes.buttonChildren}>*/}
            {spinner && <div className={classes.buttonSpinner}>
                <Spinner color={spinnerColor} width={sizes[size] - 12} height={sizes[size] - 12}/>
            </div>}
            <div className={classes.buttonContent} style={{opacity: spinner ? 0 : 1}}>
                <div>{children}</div>
            </div>


            {/*</div>*/}
        </button>
    )
}

export default Form