import classes from './Container.module.scss'
import React from "react";

const Container = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default Container