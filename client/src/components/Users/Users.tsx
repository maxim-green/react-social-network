import React from 'react'
import Card from '../common/Card/Card'
import classes from './Users.module.scss'
import UserItem from './UserItem/UserItem'
import NavTab from '../common/NavTabs/NavTab/NavTab'
import NavTabs from '../common/NavTabs/NavTabs'
import {UserType} from '../../types/types'
import {declineFriendshipRequest} from '../../redux/reducers/users.reducer'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    users: Array<UserType>
    addFriend: (userId: string) => void
    deleteFriend: (userId: string) => void
    cancelFriendshipRequest: (userId: string) => void
    acceptFriendshipRequest: (userId: string) => void
    declineFriendshipRequest: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    incomingFriendshipRequests: Array<string>
    outgoingFriendshipRequests: Array<string>
}

const Users: React.FC<PropsType> = ({
                                        authorized,
                                        authorizedUserId,
                                        users,
                                        incomingFriendshipRequests,
                                        outgoingFriendshipRequests,
                                        addFriend,
                                        deleteFriend,
                                        cancelFriendshipRequest,
                                        acceptFriendshipRequest,
                                        declineFriendshipRequest,
                                        follow,
                                        unfollow
                                    }) => {

    return (
        <Card>
            <NavTabs>
                <NavTab to="/users">All</NavTab>
                <NavTab to="/users/blocked">Blocked</NavTab>
            </NavTabs>

            <div className={classes.searchForm}>
                Search form will be here.
            </div>

            <div className={classes.usersItems}>
                {users.map(user => <UserItem
                    key={user.userId}
                    authorized={authorized}
                    authorizedUserId={authorizedUserId}
                    user={user}
                    isIncomingFriendshipRequest={incomingFriendshipRequests.includes(user.userId)}
                    isOutgoingFriendshipRequest={outgoingFriendshipRequests.includes(user.userId)}
                    addFriend={addFriend}
                    deleteFriend={deleteFriend}
                    cancelFriendshipRequest={cancelFriendshipRequest}
                    acceptFriendshipRequest={acceptFriendshipRequest}
                    declineFriendshipRequest={declineFriendshipRequest}
                    follow={follow}
                    unfollow={unfollow}
                    mutualFriendsCount={4}
                />)}
            </div>
        </Card>
    )
}

export default Users