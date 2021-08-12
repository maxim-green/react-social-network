import classes from './Checkbox.module.scss'
import React from 'react'
import {WrappedFieldProps} from 'redux-form'

type NativePropsType = {
    label: string
}

type PropsType = NativePropsType & WrappedFieldProps

const Checkbox: React.FC<PropsType> = (props) => {
    const {input} = props
    return (
        <label className={classes.checkbox}>
            {props.label}
            <input type="checkbox" {...input} {...props}/>
            <span className={classes.box}></span>
        </label>
    )
}

export default Checkbox