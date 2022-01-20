import React from 'react'
import classes from './Button.module.scss'
import classnames from 'classnames'

type PropsType = {
    onClick?: (e: React.MouseEvent) => void
    caption?: string
    icon?: string
    variant?: 'primary' | 'secondary' | 'neutral' | 'text'
    size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<PropsType> = ({
                                         onClick,
                                         caption,
                                         icon,
                                         variant = 'primary',
                                         size = 'md'
                                     }) => {
    return (
        <button
            onClick={onClick}
            className={classnames(
                classes.button,
                {[classes.iconOnly]: !caption},
                {[classes.primary]: !variant || variant === 'primary'},
                {[classes.secondary]: variant === 'secondary'},
                {[classes.neutral]: variant === 'neutral'},
                {[classes.text]: variant === 'text'},
                {[classes.sm]: size === 'sm'},
                {[classes.lg]: size === 'lg'}
            )}
        >
            {icon && <img className={classes.icon} src={icon} alt="icon"/>}
            {caption && <div className={classes.caption}>{caption}</div>}
        </button>
    )
}

export default Button