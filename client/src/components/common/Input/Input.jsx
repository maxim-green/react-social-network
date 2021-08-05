import classes from "./Input.module.scss"
import React from 'react'
import classNames from 'classnames'

const Input = (props) => {
    const {input, meta} = props
    const hasError = meta.touched && meta.error

    return (
        <div className={classNames(
            classes.input,
            {[classes.block]: props.block},
            {[classes.error]: hasError}
        )}>
            <div className={classes.info}>
                <div className={classes.label}>{props.label}</div>
                {hasError && <div className={classes.errorMessage}>{meta.error}</div>}
            </div>
            <input {...input} {...props} />
        </div>
    )
}

export default Input