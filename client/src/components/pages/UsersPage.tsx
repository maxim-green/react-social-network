import Users from '../Users/Users'
import React, {useEffect} from 'react'
import {
    acceptFriendshipRequest,
    addFriend,
    cancelFriendshipRequest, declineFriendshipRequest,
    deleteFriend,
    follow,
    getUsers,
    unfollow
} from '../../redux/reducers/users.reducer'
import {connect} from 'react-redux'
import {StateType} from '../../redux/store'
import {UserType} from '../../types/types'

type MapStatePropsType = {
    authorized: boolean
    authorizedUserId: string | null
    users: Array<UserType>
    incomingFriendshipRequests: Array<string>
    outgoingFriendshipRequests: Array<string>
}

type MapDispatchPropsType = {
    getUsers: () => void
    addFriend: (userId: string) => void
    deleteFriend: (userId: string) => void
    cancelFriendshipRequest: (userId: string) => void
    acceptFriendshipRequest: (userId: string) => void
    declineFriendshipRequest: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

type NativePropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const UsersPage: React.FC<PropsType> = (props) => <Users {...props}/>

const UsersPageContainer: React.FC<PropsType> = (props) => {
    const {getUsers, authorized} = props
    useEffect(() => {
        getUsers()
    }, [getUsers, authorized])

    return (
        <UsersPage {...props} />
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        users: state.users.users,
        incomingFriendshipRequests: state.users.incomingFriendshipRequests,
        outgoingFriendshipRequests: state.users.outgoingFriendshipRequests
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {getUsers, addFriend, cancelFriendshipRequest, acceptFriendshipRequest, declineFriendshipRequest, deleteFriend, follow, unfollow}
    )(UsersPageContainer)