import React from 'react'
import classes from './Card.module.scss'

type PropsType = {
    maxWidth?: number
    ref?: React.Ref<HTMLDivElement>
}

export const Card: React.FC<PropsType> = ({children, maxWidth, ref}) => <div
    className={classes.Card}
    style={{maxWidth}}
    ref={ref}
>
    {children}
</div>