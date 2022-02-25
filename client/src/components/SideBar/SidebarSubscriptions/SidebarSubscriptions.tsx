import React from 'react'
import classes from './SidebarSubscriptions.module.scss'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import {UserItemDataType} from 'types/types'

type PropsType = {
    subscriptions: Array<UserItemDataType>
}

const SidebarSubscriptions: React.FC<PropsType> = ({subscriptions}) => {
    return (
        <Card>
            <div className={classes.sidebarFriends}>
                <div className={classes.Title}>Subscriptions</div>
                <div className={classes.Avatars}>
                    {subscriptions.length !== 0 && subscriptions.map(sub => <NavLink to={`/profile/${sub.username}`}
                                                                            key={sub._id}>
                            <Avatar smallImg={sub.avatar.small} online size={50} name={sub.firstName}/>
                        </NavLink>
                    )}
                </div>
                <div className={classes.Link}><NavLink to='/users/subscriptions'>View All ({subscriptions.length})</NavLink></div>
            </div>
        </Card>
    )
}

export default SidebarSubscriptions