import React from "react";
import classes from "./Button.module.scss"
import classnames from "classnames";

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={classnames(
                classes.button,
                {[classes.iconOnly]: !props.caption},
                {[classes.primary]: !props.variant || props.variant === 'primary'},
                {[classes.secondary]: props.variant === 'secondary'},
                {[classes.neutral]: props.variant === 'neutral'},
                {[classes.text]: props.variant === 'text'},
                {[classes.sm]: props.size === 'sm'},
                {[classes.lg]: props.size === 'lg'},
            )}
        >
            {props.icon && <img className={classes.icon} src={props.icon} alt="icon"/>}
            {props.caption && <div className={classes.caption}>{props.caption}</div>}
        </button>
    )
}

export default Button