import React from 'react'
import classes from './Header.module.scss'
import {UserControl} from './UserControl/UserControl'
import {NotificationArea} from './NotificationArea/NotificationArea'
import {Logo} from 'components/_shared/Logo/Logo'
import {Input} from 'components/_shared/Input/Input'

type PropsType = {
    authorized: boolean
    username?: string
    avatar?: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.header}>
            <div className={classes.row}>
                <Logo/>
                <div className={classes.searchInput}>
                    {/*<Input name='search'/>*/}
                </div>
                {props.authorized && <div className={classes.userControl}>
                    <UserControl username={props.username} avatar={props.avatar} logout={props.logout}/>
                </div>}
                {/*todo move to separate component*/}
                {props.authorized && <NotificationArea/>}
            </div>
        </div>
    )
}

export default Header