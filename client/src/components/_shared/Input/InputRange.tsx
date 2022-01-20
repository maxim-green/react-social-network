import React from 'react'
import classes from './Input.module.scss'
import Slider from 'rc-slider'
import {InputPropsType} from '../Form/Form'

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