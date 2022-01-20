import React, {useEffect} from 'react'
import Card from '../_shared/Card/Card'
import classes from './Users.module.scss'
import UserItem from './UserItem/UserItem'
import NavTab from '../_shared/NavTabs/NavTab/NavTab'
import NavTabs from '../_shared/NavTabs/NavTabs'
import {UserType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {
    acceptFriendshipRequest,
    addFriend,
    cancelFriendshipRequest,
    declineFriendshipRequest, deleteFriend, follow,
    getUsers, unfollow
} from '../../redux/reducers/users.reducer'
import {useParams} from 'react-router'

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

    const { filter } = useParams<{ filter?: 'friends' | 'blocked' }>()
    let shownUsers: Array<UserType> | null = null
    if (!filter) {shownUsers = users}
    if (filter === 'friends') {shownUsers = users.filter(user => user.isFriend)}
    if (filter === 'blocked') {shownUsers = users}

    return (
        <Card>

            {authorized && <NavTabs>
                <NavTab to="/users">All</NavTab>
                <NavTab to="/users/friends">Friends</NavTab>
                {/*<NavTab to="/users/blocked">Blocked</NavTab>*/}
            </NavTabs>}

            {/*<div className={classes.searchForm}>*/}
            {/*    Search form will be here.*/}
            {/*</div>*/}

            <div className={classes.usersItems}>
                {shownUsers && shownUsers.map(user => <UserItem
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

const UsersContainer: React.FC = () => {
    const dispatch = useDispatch()

    const props: PropsType = {
        authorized: useSelector((state: StateType) => state.auth.authorized),
        authorizedUserId: useSelector((state: StateType) => state.auth.userId),
        users: useSelector((state: StateType) => state.users.users),
        incomingFriendshipRequests: useSelector((state: StateType) => state.users.incomingFriendshipRequests),
        outgoingFriendshipRequests: useSelector((state: StateType) => state.users.outgoingFriendshipRequests),
        addFriend: (userId: string) => dispatch(addFriend(userId)),
        cancelFriendshipRequest: (userId: string) => dispatch(cancelFriendshipRequest(userId)),
        acceptFriendshipRequest: (userId: string) => dispatch(acceptFriendshipRequest(userId)),
        declineFriendshipRequest: (userId:string) => dispatch(declineFriendshipRequest(userId)),
        deleteFriend: (userId: string) => dispatch(deleteFriend(userId)),
        follow: (userId: string) => dispatch(follow(userId)),
        unfollow: (userId: string) => dispatch(unfollow(userId))
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, props.authorized])


    return (<Users {...props} />)
}

export default UsersContainer