import Card from '../../common/Card/Card'
import React from 'react'
import classes from './Navigation.module.scss'
import {NavLink} from 'react-router-dom'
import feedIcon from '../../../assets/images/feed-icon.svg'
import dialogsIcon from '../../../assets/images/dialogs-icon.svg'
import photosIcon from '../../../assets/images/photos-icon.svg'
import musicIcon from '../../../assets/images/music-icon.svg'
import settingsIcon from '../../../assets/images/settings-icon.svg'
import friendsIcon from '../../../assets/images/friends-icon.svg'
import usersIcon from '../../../assets/images/members-icon.svg'

type PropsType = {}

const Navigation: React.FC<PropsType> & {
    Item: React.FC<{ to: string, icon: string, iconAlt?: string }>
    Title: React.FC
    List: React.FC
} = () => {
    return (
        <Card>
            <div className={classes.Navigation}>
                <Navigation.Title>My Profile</Navigation.Title>
                <Navigation.List>
                    <Navigation.Item to='/profile' icon={feedIcon}>Profile</Navigation.Item>
                    <Navigation.Item to='/dialogs' icon={dialogsIcon}>Dialogs</Navigation.Item>
                    <Navigation.Item to='/photos' icon={photosIcon}>Photos</Navigation.Item>
                    <Navigation.Item to='/music' icon={musicIcon}>Music</Navigation.Item>
                    <Navigation.Item to='/settings' icon={settingsIcon}>Settings</Navigation.Item>
                </Navigation.List>
                <Navigation.Title>Community</Navigation.Title>
                <Navigation.List>
                    <Navigation.Item to='/friends' icon={friendsIcon}>Friends</Navigation.Item>
                    <Navigation.Item to='/users' icon={usersIcon}>Users</Navigation.Item>
                </Navigation.List>
            </div>
        </Card>
    )
}

Navigation.Title = ({children}) => {
    return (
        <div className={classes.NavigationTitle}>{children}</div>
    )
}

Navigation.List = ({children}) => {
    return (
        <ul className={classes.NavigationList}>
            {children}
        </ul>
    )
}

Navigation.Item = ({to, icon, iconAlt = 'icon', children}) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={to}>
                <img src={icon} alt={iconAlt}/>
                <span>{children}</span>
            </NavLink>
        </li>
    )
}

export default Navigation