import React, {CSSProperties} from 'react'
import classes from './Form.module.scss'
import classnames from 'classnames'
import 'rc-slider/assets/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../Input/DatePicker.scss'
import Spinner from '../../_shared/Spinner/Spinner'
import {sizes} from '../../../config'

export type InputPropsType<V = any> = {
    name: string,
    required?: boolean,
    disabled?: boolean,
    value?: V,
    onChange?: ((e: React.ChangeEvent | V) => void),
    onBlur?: (e: React.ChangeEvent) => void,
    ref?: React.ForwardedRef<any>
    style?: CSSProperties
}

type FormPropsType = { onSubmit: (e: React.FormEvent) => void }

type FormItemPropsType = {
    component: React.FC<InputPropsType>,
    label?: string,
    error?: { message: string, type: string } | string,
} & InputPropsType

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
                                  value,
                                  style
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
                    ref,
                    style
                }, children)}
            </label>
        </div>
    )
})

Form.Row = ({children}) => <div className={classes.formRow}>{children}</div>


export const Button: React.FC<{
    onClick?: (e: React.MouseEvent) => void
    type?: 'primary' | 'secondary' | 'neutral' | 'text' | 'cancel'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    spinner?: boolean
    style?: CSSProperties
}> = ({
          children,
          onClick,
          type = 'primary',
          size = 'medium',
          disabled = false,
          spinner = false,
          style
      }) => {
    const spinnerColor = (type === 'primary' || type === 'cancel') ? '#FFFFFF' : undefined
    return (
        <button onClick={onClick} disabled={disabled || spinner} style={style}
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
                    {[classes.large]: size === 'large'}
                )}>
            {/*<div className={classes.buttonChildren}>*/}
            {spinner && <div className={classes.buttonSpinner}>
                <Spinner color={spinnerColor} width={sizes[size] - 12} height={sizes[size] - 12}/>
            </div>}
            <div className={classes.buttonContent} style={{opacity: spinner ? 0 : 1}}>
                {children}
            </div>


            {/*</div>*/}
        </button>
    )
}

export default Form