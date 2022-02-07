import Card from '../../_shared/Card/Card'
import React from 'react'
import classes from './SidebarFriends.module.scss'
import Avatar from '../../_shared/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import {UserItemDataType} from '../../../types/types'

type PropsType = {
    subscriptions: Array<UserItemDataType>
}

const SidebarFriends: React.FC<PropsType> = ({subscriptions}) => {
    return (
        <Card>
            <div className={classes.sidebarFriends}>
                <div className={classes.Title}>Subscriptions</div>
                <div className={classes.Avatars}>
                    {subscriptions.length !== 0 && subscriptions.map(sub => <NavLink to={`/profile/${sub.username}`}
                                                                            key={sub._id}>
                            <Avatar img={sub.avatar.small} online size={'sm'} name={sub.firstName}/>
                        </NavLink>
                    )}
                </div>
                <div className={classes.Link}><NavLink to='/users/subscriptions'>View All ({subscriptions.length})</NavLink></div>
            </div>
        </Card>
    )
}

export default SidebarFriends