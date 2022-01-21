import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Logo.module.scss'

type PropsType = {
    src: string
}


const Logo: React.FC<PropsType> = ({src}) => {
    return (
        <div className={classes.logo}>
            <NavLink to='/'>
                <img src={src} alt="Bind"/>
            </NavLink>
        </div>
    )
}

export default Logo