import Users from "../../Users/Users";
import React, {useEffect} from 'react'
import {addFriend, deleteFriend, follow, getUsers, unfollow} from "../../../redux/reducers/users.reducer";
import {connect} from "react-redux";

const UsersPage = (props) => {
    return (
        <Users
            authorized={props.authorized}
            authorizedUserId={props.authorizedUserId}
            users={props.users}
            addFriend={props.addFriend}
            deleteFriend={props.deleteFriend}
            follow={props.follow}
            unfollow={props.unfollow}
        />
    )
}

const UsersPageContainer = (props) => {
    const {getUsers} = props
    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <UsersPage {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        users: state.users.users
    }
}

export default connect(mapStateToProps, {getUsers, addFriend, deleteFriend, follow, unfollow})(UsersPageContainer)