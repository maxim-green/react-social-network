import React from 'react'
import classes from 'components/Layout/Header/Header.module.scss'
import {UserControl} from 'components/Layout/Header/UserControl/UserControl'
import {Logo} from 'components/_shared/Logo/Logo'

type PropsType = {
    authorized: boolean
    username?: string
    avatar?: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.header}>
            <Logo/>
            {props.authorized && <div className={classes.userControl}>
                <UserControl username={props.username} avatar={props.avatar} logout={props.logout}/>
            </div>}
        </div>
    )
}

export default Header