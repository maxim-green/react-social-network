import Users from '../Users/Users'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {getUsers, subscribe, unsubscribe} from 'redux/reducers/users.reducer'


const UsersPage: React.FC = () => {
    const dispatch = useDispatch()

    const props = {
        authorized: useSelector((state: StateType) => state.auth.authorized),
        authorizedUserId: useSelector((state: StateType) => state.auth.user?._id),
        authorizedUserSubscriptions: useSelector((state: StateType) => state.auth.user?.subscriptions || []),
        users: useSelector((state: StateType) => state.users.users),
        subscribePendingUserIds: useSelector((state: StateType) => state.users.subscribePendingUserIds),
        subscribe: (userId: string) => dispatch(subscribe(userId)),
        unsubscribe: (userId: string) => dispatch(unsubscribe(userId)),
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, props.authorized])


    return <Users {...props} />
}

export default UsersPage