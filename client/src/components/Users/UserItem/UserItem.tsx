import classes from './UserItem.module.scss'
import {NavLink} from 'react-router-dom'
import Avatar from '../../_shared/Avatar/Avatar'
import React from 'react'
import {UserItemDataType} from '../../../types/types'
import Button from '../../_shared/Button/Button'
import {ChatLeftTextFill, GearFill} from 'react-bootstrap-icons'
import colors from '../../../assets/styles/colors.module.scss'

type PropsType = {
    authorized: boolean
    authorizedUserId?: string
    user: UserItemDataType
    isSubscribed: boolean
    subscribe: (userId: string) => void
    unsubscribe: (userId: string) => void
    mutualFriendsCount: number
}

const UserItem: React.FC<PropsType> = ({
                                           authorized,
                                           authorizedUserId,
                                           user,
                                           isSubscribed,
                                           subscribe,
                                           unsubscribe,
                                           mutualFriendsCount,
                                       }) => {

    const isAuthorizedUserItem = authorized && (authorizedUserId === user._id)



    const followButtonClickHandler = () => {
        if (!isSubscribed) {
            subscribe(user._id)
        } else {
            unsubscribe(user._id)
        }
    }

    return (
        <div className={classes.userItem}>
            <div className={classes.avatar}>
                <NavLink to={`/profile/${user.username}`}><Avatar smallImg={user.avatar && user.avatar.small} online
                                                                   size={70}/></NavLink>
            </div>
            <div className={classes.info}>
                <NavLink to={`/profile/${user.username}`}>
                    <div className={classes.userName}>{`${user.firstName} ${user.lastName}`}</div>
                </NavLink>
                {mutualFriendsCount !== 0 && mutualFriendsCount && <NavLink to="/profile/1/mutualfriends">
                    <div className={classes.mutualFriends}>{mutualFriendsCount} mutual friends</div>
                </NavLink>}
            </div>
            <div className={classes.controls}>
                {authorized && !isAuthorizedUserItem && <div className={classes.row}>
                    <div className={classes.button}>
                        <NavLink to={`/dialogs/${user.username}`}>
                            <Button type="text" size="small" style={{padding: '0 4px'}}>
                                <Button.Icon><ChatLeftTextFill size={16} color={colors.midGrey1}/></Button.Icon>
                            </Button>
                        </NavLink>
                    </div>
                    <div className={classes.button}>
                        <Button type="text" size="small" style={{padding: '0 4px'}}>
                            <Button.Icon><GearFill size={16} color={colors.midGrey1}/></Button.Icon>
                        </Button>
                    </div>
                </div>}
                {authorized && !isAuthorizedUserItem && <div className={classes.row}>
                    <div className={classes.button}>
                        <Button
                            type="neutral"
                            size="small"
                            onClick={followButtonClickHandler}
                        ><Button.Text>{!isSubscribed ? 'Follow' : 'Unfollow'}</Button.Text></Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default UserItem