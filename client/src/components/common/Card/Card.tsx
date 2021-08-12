import React from 'react'
import classes from './Card.module.scss'

type PropsType = {}

const Card: React.FC<PropsType> = ({children}) => <div className={classes.Card}>
    {children}
</div>

export default Card