import Card from '../../_shared/Card/Card'
import React from 'react'
import classes from './SidebarFriends.module.scss'
import Avatar from '../../_shared/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../../types/types'

type PropsType = {
    friends: Array<UserType>
}

const SidebarFriends: React.FC<PropsType> = ({friends}) => {
    return (
        <Card>
            <div className={classes.sidebarFriends}>
                <div className={classes.Title}>Friends</div>
                <div className={classes.Avatars}>
                    {friends.length !== 0 && friends.map(friend => <NavLink to={`/profile/${friend.username}`}
                                                                            key={friend._id}>
                            <Avatar img={friend.avatar.small} online size={'sm'} name={friend.firstName}/>
                        </NavLink>
                    )}
                </div>
                <div className={classes.Link}><NavLink to='/users/friends'>View All ({friends.length})</NavLink></div>
            </div>
        </Card>
    )
}

export default SidebarFriends