import classes from './UserItem.module.scss'
import {NavLink} from 'react-router-dom'
import Avatar from '../../common/Avatar/Avatar'
import React from 'react'
import gearIcon from '../../../assets/images/gear-icon.svg'
import sendMessageIcon from '../../../assets/images/send-message-icon.svg'
import Button from '../../common/Button/Button'
import {UserType} from '../../../types/types'

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
                <NavLink to={`/profile/${user.username}`}><Avatar img={user.avatar && user.avatar.large} online
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
                        <NavLink to={`/dialogs/${user.username}`}><Button icon={sendMessageIcon} variant="neutral"/></NavLink>
                    </div>
                    <div className={classes.button}>
                        <Button icon={gearIcon} variant="neutral"/>
                    </div>
                </div>}
                {authorized && !isAuthorizedUserItem && <div className={classes.row}>
                    <div className={classes.button}>
                        {!isIncomingFriendshipRequest && !isOutgoingFriendshipRequest && <Button
                            caption={!user.isFriend ? 'Add to friends' : 'Remove from friends'}
                            variant="neutral"
                            onClick={addFriendButtonClickHandler}
                        />}
                        {isIncomingFriendshipRequest && <Button
                            caption={'Accept'}
                            variant="neutral"
                            onClick={acceptFriendshipRequestButtonClickHandler}
                        />}
                        {isIncomingFriendshipRequest && <Button
                            caption={'Decline'}
                            variant="neutral"
                            onClick={declineFriendshipRequestButtonClickHandler}
                        />}
                        {isOutgoingFriendshipRequest && <Button
                            caption={'Cancel'}
                            variant="neutral"
                            onClick={cancelFriendshipRequestButtonClickHandler}
                        />}
                    </div>
                    <div className={classes.button}>
                        <Button
                            caption={!user.isSubscription ? 'Follow' : 'Unfollow'}
                            variant="neutral"
                            onClick={followButtonClickHandler}
                        />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default UserItem