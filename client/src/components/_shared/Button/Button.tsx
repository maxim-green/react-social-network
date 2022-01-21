import React, {CSSProperties} from 'react'
import classnames from 'classnames'
import classes from './Button.module.scss'
import Spinner from '../Spinner/Spinner'
import {sizes} from '../../../config'

type ButtonType = {
    onClick?: (e: React.MouseEvent) => void
    type?: 'primary' | 'secondary' | 'neutral' | 'text' | 'cancel'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    spinner?: boolean
    style?: CSSProperties
}

const Button: React.FC<ButtonType> & { Icon: React.FC, Text: React.FC } = ({
          children,
          onClick,
          type = 'primary',
          size = 'medium',
          disabled = false,
          spinner = false,
          style
      }) => {
    const spinnerColor = (type === 'primary' || type === 'cancel') ? '#FFFFFF' : undefined
    return (
        <button onClick={onClick} disabled={disabled || spinner} style={style}
                className={classnames(
                    classes.button,
                    {[classes.primary]: !type || type === 'primary'},
                    {[classes.secondary]: type === 'secondary'},
                    {[classes.neutral]: type === 'neutral'},
                    {[classes.text]: type === 'text'},
                    {[classes.cancel]: type === 'cancel'},
                    {[classes.spinner]: spinner},
                    {[classes.small]: size === 'small'},
                    {[classes.medium]: size === 'medium'},
                    {[classes.large]: size === 'large'}
                )}>
            {/*<div className={classes.buttonChildren}>*/}
            {spinner && <div className={classes.buttonSpinner}>
                <Spinner color={spinnerColor} width={sizes[size] - 14} height={sizes[size] - 14}/>
            </div>}
            <div className={classes.content} style={{opacity: spinner ? 0 : 1}}>
                {children}
            </div>


            {/*</div>*/}
        </button>
    )
}

Button.Icon = ({children}) => {
    return <div className={classes.contentIcon}>
        {children}
    </div>
}

Button.Text = ({children}) => {
    return <div className={classes.contentText}>
        {children}
    </div>
}

export default Button