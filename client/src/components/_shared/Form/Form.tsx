import React, {CSSProperties} from 'react'
import classes from './Form.module.scss'
import 'rc-slider/assets/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../Input/DatePicker.scss'

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


export default Form