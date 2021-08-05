import classes from "./Checkbox.module.scss"
import React from 'react'

const Checkbox = (props) => {
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