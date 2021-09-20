import React from 'react'
import classes from './Card.module.scss'
import Button from '../Button/Button'
import editCoverImageIcon from '../../../assets/images/edit-cover-image-icon.svg'

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