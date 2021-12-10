import React from 'react'
import classes from './Card.module.scss'

type PropsType = {}

const Card: React.FC<PropsType> & {Image: React.FC} = ({children}) => <div className={classes.Card}>
    {children}
</div>

Card.Image = () => {
    return (
        <div></div>
    )
}

export default Card