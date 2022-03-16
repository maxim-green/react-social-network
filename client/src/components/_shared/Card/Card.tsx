import React from 'react'
import classes from './Card.module.scss'

type PropsType = {maxWidth?: number}

export const Card: React.FC<PropsType> = ({children, maxWidth}) => <div
    className={classes.Card}
    style={{maxWidth}}
>
    {children}
</div>