import React from 'react'
import classes from './Card.module.scss'

type PropsType = {width?: number}

export const Card: React.FC<PropsType> = ({children, width}) => <div
    className={classes.Card}
    style={{width: width, alignSelf: 'center'}}
>
    {children}
</div>