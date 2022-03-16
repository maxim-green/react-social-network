import React, {CSSProperties} from 'react'
import classnames from 'classnames'
import classes from './Button.module.scss'
import colors from 'assets/styles/colors.module.scss'
import sizes from 'assets/styles/sizes.module.scss'
import Spinner from 'components/_shared/Spinner/Spinner'

type ButtonTypes = 'primary' | 'secondary' | 'neutral' | 'text' | 'link' | 'cancel'
type ButtonSizes = 'sm' | 'md' | 'lg' | 'xl'

type ButtonType = {
    onClick?: (e: React.MouseEvent) => void
    type?: ButtonTypes
    size?: ButtonSizes
    disabled?: boolean
    spinner?: boolean
    style?: CSSProperties
}

export const Button: React.FC<ButtonType> & {
    Icon: React.FC,
    Text: React.FC,
    Spinner: React.FC<{type: ButtonTypes, size: ButtonSizes}>,
    Badge: React.FC
} = ({
         children,
         onClick,
         type = 'primary',
         size = 'md',
         disabled = false,
         spinner = false,
         style
     }) => {

    return (
        <button onClick={onClick} disabled={disabled || spinner} style={style}
                className={classnames(
                    classes.button,
                    {[classes.primary]: !type || type === 'primary'},
                    {[classes.secondary]: type === 'secondary'},
                    {[classes.neutral]: type === 'neutral'},
                    {[classes.text]: type === 'text'},
                    {[classes.cancel]: type === 'cancel'},
                    {[classes.link]: type === 'link'},

                    {[classes.spinner]: spinner},

                    {[classes[size]]: size },
                )}>

            <div className={classnames(
                classes.content,
                {[classes.spinner]: spinner}
            )}>
                {children}
                {spinner && <div className={classes.buttonSpinner}>
                    <Button.Spinner size={size} type={type}/>
                </div>}
            </div>

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

Button.Spinner = ({type, size}) => {
    const spinnerColor = (type === 'primary' || type === 'cancel') ? colors.fontLight : colors.fontDark
    const spinnerSizes: {[key: string]: string} = {
        sm: sizes.btnSmall,
        md: sizes.btnMedium,
        lg: sizes.btnLarge
    }
    const spinnerSize = Number.parseInt(spinnerSizes[size])
    return <Spinner color={spinnerColor} size={spinnerSize}/>
}

Button.Badge = ({children}) => {
    return <div className={classes.badge}>{children}</div>
}