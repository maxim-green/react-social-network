import React from 'react'
import classes from './Input.module.scss'
import {InputPropsType} from '../Form/Form'

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