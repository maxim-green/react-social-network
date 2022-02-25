import React, {useEffect} from 'react'
import {Card} from 'components/_shared/Card/Card'
import classes from './Users.module.scss'
import UserItem from './UserItem/UserItem'
import NavTab from 'components/_shared/NavTabs/NavTab/NavTab'
import NavTabs from 'components/_shared/NavTabs/NavTabs'
import {UserItemDataType} from 'types/types'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {subscribe, getUsers, unsubscribe} from 'redux/reducers/users.reducer'
import {useParams} from 'react-router'

type PropsType = {
    authorized: boolean
    authorizedUserId?: string
    authorizedUserSubscriptions: Array<UserItemDataType>
    users: Array<UserItemDataType>
    subscribe: (userId: string) => void
    unsubscribe: (userId: string) => void
}

const Users: React.FC<PropsType> = ({
                                        authorized,
                                        authorizedUserId,
                                        authorizedUserSubscriptions,
                                        users,
                                        subscribe,
                                        unsubscribe
                                    }) => {

    const {filter} = useParams<{ filter?: 'subscriptions' | 'blocked' }>()
    let shownUsers: Array<UserItemDataType> | null = null
    if (!filter) {
        shownUsers = users
    }
    if (filter === 'subscriptions') {
        shownUsers = authorizedUserSubscriptions
    }
    if (filter === 'blocked') {
        shownUsers = users
    }

    return (
        <Card>

            {authorized && <NavTabs>
                <NavTab to="/users">All</NavTab>
                <NavTab to="/users/subscriptions">Subscriptions</NavTab>
            </NavTabs>}

            {/*<div className={classes.searchForm}>*/}
            {/*    Search form will be here.*/}
            {/*</div>*/}

            <div className={classes.usersItems}>
                {shownUsers && shownUsers.map(user => <UserItem
                    key={user._id}
                    authorized={authorized}
                    authorizedUserId={authorizedUserId}
                    user={user}
                    isSubscribed={authorizedUserSubscriptions.map(user => user._id).includes(user._id)}
                    subscribe={subscribe}
                    unsubscribe={unsubscribe}
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
        authorizedUserId: useSelector((state: StateType) => state.auth.user?._id),
        authorizedUserSubscriptions: useSelector((state: StateType) => state.auth.user?.subscriptions || []),
        users: useSelector((state: StateType) => state.users.users),
        subscribe: (userId: string) => dispatch(subscribe(userId)),
        unsubscribe: (userId: string) => dispatch(unsubscribe(userId))
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, props.authorized])


    return (<Users {...props} />)
}

export default UsersContainer