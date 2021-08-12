import Users from '../../Users/Users'
import React, {useEffect} from 'react'
import {addFriend, deleteFriend, follow, getUsers, unfollow} from '../../../redux/reducers/users.reducer'
import {connect} from 'react-redux'
import {StateType} from '../../../redux/store'
import {UserType} from '../../../types/types'

type MapStatePropsType = {
    authorized: boolean
    authorizedUserId: string | null
    users: Array<UserType>
}

type MapDispatchPropsType = {
    getUsers: () => void
    addFriend: (userId: string) => void
    deleteFriend: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

type NativePropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const UsersPage: React.FC<PropsType> = (props) => <Users {...props}/>

const UsersPageContainer: React.FC<PropsType> = (props) => {
    const {getUsers} = props
    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <UsersPage {...props} />
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        users: state.users.users
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {getUsers, addFriend, deleteFriend, follow, unfollow}
    )(UsersPageContainer)