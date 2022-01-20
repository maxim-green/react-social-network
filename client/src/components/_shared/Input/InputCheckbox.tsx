import React from 'react'
import classes from './Input.module.scss'
import {InputPropsType} from '../Form/Form'

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