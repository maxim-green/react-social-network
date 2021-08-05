import classes from "./FilePicker.module.scss"
import React from 'react'
import classNames from 'classnames'

const FilePicker = (props) => {
    const {input, meta} = props
    const hasError = meta.touched && meta.error

    const onChange = e => {
        input.onChange(e.target.files[0])
    }

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
            <input type="file" accept='.jpg, .png, .jpeg' onChange={onChange} />
        </div>
    )
}

export default FilePicker