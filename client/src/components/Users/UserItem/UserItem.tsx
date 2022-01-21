import classes from './UserItem.module.scss'
import {NavLink} from 'react-router-dom'
import Avatar from '../../_shared/Avatar/Avatar'
import React from 'react'
import {UserType} from '../../../types/types'
import Button from '../../_shared/Button/Button'
import {ChatLeftTextFill, GearFill} from 'react-bootstrap-icons'
import colors from '../../../assets/styles/exports.module.scss'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    user: UserType
    isIncomingFriendshipRequest: boolean
    isOutgoingFriendshipRequest: boolean
    addFriend: (userId: string) => void
    deleteFriend: (userId: string) => void
    cancelFriendshipRequest: (userId: string) => void
    acceptFriendshipRequest: (userId: string) => void
    declineFriendshipRequest: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    mutualFriendsCount: number
}

const UserItem: React.FC<PropsType> = ({
                                           authorized,
                                           authorizedUserId,
                                           user,
                                           addFriend,
                                           deleteFriend,
                                           cancelFriendshipRequest,
                                           acceptFriendshipRequest,
                                           declineFriendshipRequest,
                                           follow,
                                           unfollow,
                                           mutualFriendsCount,
                                           isIncomingFriendshipRequest,
                                           isOutgoingFriendshipRequest
                                       }) => {

    const isAuthorizedUserItem = authorized && (authorizedUserId === user.userId)

    const addFriendButtonClickHandler = () => {
        if (!user.isFriend) {
            addFriend(user.userId)
        } else {
            deleteFriend(user.userId)
        }
    }
    const acceptFriendshipRequestButtonClickHandler = () => {
        acceptFriendshipRequest(user.userId)
    }
    const declineFriendshipRequestButtonClickHandler = () => {
        declineFriendshipRequest(user.userId)
    }
    const cancelFriendshipRequestButtonClickHandler = () => {
        cancelFriendshipRequest(user.userId)
    }

    const followButtonClickHandler = () => {
        if (!user.isSubscription) {
            follow(user.userId)
        } else {
            unfollow(user.userId)
        }
    }

    return (
        <div className={classes.userItem}>
            <div className={classes.avatar}>
                <NavLink to={`/profile/${user.username}`}><Avatar img={user.avatar && user.avatar.small} online
                                                                   size='md'/></NavLink>
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
                        {!isIncomingFriendshipRequest && !isOutgoingFriendshipRequest && <Button
                            type="neutral"
                            size="small"
                            onClick={addFriendButtonClickHandler}
                        ><Button.Text>{!user.isFriend ? 'Add to friends' : 'Remove from friends'}</Button.Text></Button>}
                        {isIncomingFriendshipRequest && <Button
                            type="neutral"
                            size="small"
                            onClick={acceptFriendshipRequestButtonClickHandler}
                        ><Button.Text>Accept</Button.Text></Button>}
                        {isIncomingFriendshipRequest && <Button
                            type="neutral"
                            size="small"
                            onClick={declineFriendshipRequestButtonClickHandler}
                        ><Button.Text>Decline</Button.Text></Button>}
                        {isOutgoingFriendshipRequest && <Button
                            type="neutral"
                            size="small"
                            onClick={cancelFriendshipRequestButtonClickHandler}
                        ><Button.Text>Cancel</Button.Text></Button>}
                    </div>
                    <div className={classes.button}>
                        <Button
                            type="neutral"
                            size="small"
                            onClick={followButtonClickHandler}
                        ><Button.Text>{!user.isSubscription ? 'Follow' : 'Unfollow'}</Button.Text></Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default UserItem