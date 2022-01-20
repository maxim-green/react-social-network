import React from 'react'
import classes from './Input.module.scss'
import {InputPropsType} from '../Form/Form'

export const InputTextarea: React.FC<InputPropsType> = React.forwardRef<HTMLTextAreaElement, InputPropsType>(({
                                                                                                                  name,
                                                                                                                  required = false,
                                                                                                                  disabled = false,
                                                                                                                  onChange,
                                                                                                                  onBlur, style
                                                                                                              }, ref) => {
    return <textarea className={classes.textarea} name={name} disabled={disabled} onChange={onChange}
                     onBlur={onBlur} ref={ref} cols={30} rows={2} style={style}/>
})