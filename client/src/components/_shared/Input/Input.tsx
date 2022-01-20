import React from 'react'
import classes from './Input.module.scss'
import {InputPropsType} from '../Form/Form'

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