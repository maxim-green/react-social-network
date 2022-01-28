import classes from './Header.module.scss'
import colors from '../../assets/styles/exports.module.scss'
import logoImg from '../../assets/images/logo.svg'
import Logo from '../_shared/Logo/Logo'
import UserControl from './UserControl/UserControl'
import React from 'react'
import IconWithCounter from '../_shared/IconWithCounter/IconWithCounter'
import {NavLink} from 'react-router-dom'
import {BellFill, ChatLeftTextFill, PersonPlusFill} from 'react-bootstrap-icons'

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
                <Logo src={logoImg}/>
                <div className={classes.searchInput}>
                    {/*<SearchInput icon={searchIcon}/>*/}
                </div>
                {props.authorized && <div className={classes.userControl}>
                    <UserControl username={props.username} avatar={props.avatar} logout={props.logout}/>
                </div>}
                {props.authorized && <div className={classes.notificationArea}>
                    <NavLink to='/users/friends'><IconWithCounter count={5}><PersonPlusFill color={colors.white} size={18}/></IconWithCounter></NavLink>
                    <NavLink to='/dialogs'><IconWithCounter count={3}><ChatLeftTextFill color={colors.white} size={18}/></IconWithCounter></NavLink>
                    <NavLink to='/notifications'><IconWithCounter count={15}><BellFill color={colors.white} size={18}/></IconWithCounter></NavLink>
                </div>}
            </div>
        </div>
    )
}

export default Header