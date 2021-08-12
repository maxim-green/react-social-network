import classes from './NavTabs.module.scss'
import React from 'react'

type PropsType = {}

const NavTabs: React.FC<PropsType> = ({children}) => {
    return (<div className={classes.tabs}>
        {children}
    </div>)
}

export default NavTabs