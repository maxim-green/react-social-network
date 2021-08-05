import React from "react";
import classes from './IconWithCounter.module.scss'

const IconWithCounter = (props) => {
    return (
        <div className={classes.IconWithCounter}>
            <img src={props.src} alt={props.alt}/>
            {(props.count > 0) && <div className={classes.counter}>{props.count}</div>}
        </div>
    )
}

export default IconWithCounter