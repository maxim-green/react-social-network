import {NavLink} from 'react-router-dom'
import React from 'react'
import classes from './NavTab.module.scss'

type PropsType = {
    to: string
}

const NavTab: React.FC<PropsType> = ({to, children}) => {
    return (
        <div className={classes.tab}>
            <NavLink exact to={`${to}`} activeClassName={classes.active}>
                {children}
            </NavLink>
        </div>
    )
}

export default NavTab
