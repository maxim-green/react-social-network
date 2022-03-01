import React from 'react'
import classes from './CForm.module.scss'
import classnames from 'classnames'
import {Controller, RegisterOptions, useForm} from 'react-hook-form'
import {LoginDataType} from 'api/auth.api'
import {Control} from 'react-hook-form/dist/types/form'
import {FieldError} from 'react-hook-form/dist/types'



type FormPropsType = {
    onSubmit: (data: any) => void
}
export const CForm: React.FC<FormPropsType> = ({
                                                   onSubmit,
                                                   children
                                               }) => {
    const {control, handleSubmit} = useForm()

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {control})
        }
        return child
    })

    const submit = (formData: LoginDataType) => onSubmit(formData)

    return <form className={classes.wrapper} onSubmit={handleSubmit(submit)}>
        {childrenWithProps}
    </form>
}



type RowPropsType = {
    control?: Control,
    align?: 'fill' | 'left' | 'right' | 'center'
}
export const CFormRow: React.FC<RowPropsType> = ({
                                                     children,
                                                     control,
                                                     align = 'fill'
                                                 }) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {control, align})
        }
        return child
    })

    return <div className={classnames(
        classes.row,
        {[classes[align]]: align}
    )}>
        {childrenWithProps}
    </div>
}



type ItemPropsType = {
    text?: string,
    required?: boolean,
    error?: FieldError,
    align?: 'fill' | 'left' | 'right' | 'center'
}
export const Item: React.FC<ItemPropsType> = ({
                                                  children,
                                                  text,
                                                  required = false,
                                                  error, align = 'fill'
                                              }) => {
    return <label className={classes.item}>
        <div className={classes.label}>
            {required && <span className={classes.labelRequired}>*</span>}
            <span className={classes.labelText}>{text}</span>
            {error?.type === 'required' && <span className={classes.formItemError}>This field is required</span>}
        </div>
        {children}
    </label>
}



type InputPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control
}
export const Input: React.FC<InputPropsType> = ({
                                                    name,
                                                    label,
                                                    rules,
                                                    control
}) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item text={label} required={!!rules?.required} error={fieldState.error}>
            <input
                className={`${classes.input} ${fieldState.error ? classes.error : ''}`}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
            />
        </Item>}
    />
}