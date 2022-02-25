import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Logo.module.scss'
import logo from 'assets/images/logo.svg'

export const Logo: React.FC = () => <div className={classes.logo}>
    <NavLink to='/'>
        <img src={logo} alt="Bind"/>
    </NavLink>
</div>