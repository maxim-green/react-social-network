import Users from '../Users/Users'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootDispatch, RootState, ThunkType} from 'store/store'
import {getUsers, subscribe, unsubscribe, UsersActionType} from 'store/reducers/users.reducer'


const UsersPage: React.FC = () => {
    const dispatch = useDispatch()

    const props = {
        authorized: useSelector((state: RootState) => state.auth.authorized),
        authorizedUserId: useSelector((state: RootState) => state.auth.user?._id),
        authorizedUserSubscriptions: useSelector((state: RootState) => state.auth.user?.subscriptions || []),
        users: useSelector((state: RootState) => state.users.users),
        subscribePendingUserIds: useSelector((state: RootState) => state.users.subscribePendingUserIds),
        subscribe: (userId: string) => dispatch(subscribe(userId)),
        unsubscribe: (userId: string) => dispatch(unsubscribe(userId)),
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, props.authorized])


    return <Users {...props} />
}

export default UsersPage
