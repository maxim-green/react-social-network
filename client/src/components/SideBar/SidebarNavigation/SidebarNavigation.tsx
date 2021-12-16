import Card from '../../common/Card/Card'
import React from 'react'
import classes from './SidebarNavigation.module.scss'
import {NavLink} from 'react-router-dom'
import feedIcon from '../../../assets/images/feed-icon.svg'
import dialogsIcon from '../../../assets/images/dialogs-icon.svg'
import photosIcon from '../../../assets/images/photos-icon.svg'
import musicIcon from '../../../assets/images/music-icon.svg'
import settingsIcon from '../../../assets/images/settings-icon.svg'
import friendsIcon from '../../../assets/images/friends-icon.svg'
import usersIcon from '../../../assets/images/members-icon.svg'

type PropsType = {}

const SidebarNavigation: React.FC<PropsType> & {
    Item: React.FC<{ to: string, icon: string, iconAlt?: string }>
    Title: React.FC
    List: React.FC
} = () => {
    return (
        <Card>
            <div className={classes.Navigation}>
                <SidebarNavigation.Title>My Profile</SidebarNavigation.Title>
                <SidebarNavigation.List>
                    <SidebarNavigation.Item to='/profile' icon={feedIcon}>Profile</SidebarNavigation.Item>
                    <SidebarNavigation.Item to='/dialogs' icon={dialogsIcon}>Dialogs</SidebarNavigation.Item>
                    <SidebarNavigation.Item to='/photos' icon={photosIcon}>Photos</SidebarNavigation.Item>
                    <SidebarNavigation.Item to='/music' icon={musicIcon}>Music</SidebarNavigation.Item>
                    <SidebarNavigation.Item to='/settings' icon={settingsIcon}>Settings</SidebarNavigation.Item>
                </SidebarNavigation.List>
                <SidebarNavigation.Title>Community</SidebarNavigation.Title>
                <SidebarNavigation.List>
                    <SidebarNavigation.Item to='/friends' icon={friendsIcon}>Friends</SidebarNavigation.Item>
                    <SidebarNavigation.Item to='/users' icon={usersIcon}>Users</SidebarNavigation.Item>
                </SidebarNavigation.List>
            </div>
        </Card>
    )
}

SidebarNavigation.Title = ({children}) => {
    return (
        <div className={classes.NavigationTitle}>{children}</div>
    )
}

SidebarNavigation.List = ({children}) => {
    return (
        <ul className={classes.NavigationList}>
            {children}
        </ul>
    )
}

SidebarNavigation.Item = ({to, icon, iconAlt = 'icon', children}) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={to}>
                <img src={icon} alt={iconAlt}/>
                <span>{children}</span>
            </NavLink>
        </li>
    )
}

export default SidebarNavigation