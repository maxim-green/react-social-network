import React from "react";
import classes from './Card.module.scss'

const Card = (props) => {
    return (
        <div className={classes.Card}>
                {props.children}
        </div>
    )
}

export default Card