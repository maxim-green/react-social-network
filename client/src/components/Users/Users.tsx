import React from 'react'
import {Card} from 'components/_shared/Card/Card'
import classes from './Users.module.scss'
import UserItem from './UserItem/UserItem'
import NavTab from 'components/_shared/NavTabs/NavTab/NavTab'
import NavTabs from 'components/_shared/NavTabs/NavTabs'
import {UserItemDataType} from 'types/types'
import {useParams} from 'react-router'

type PropsType = {
    authorized: boolean
    authorizedUserId?: string
    authorizedUserSubscriptions: Array<UserItemDataType>
    users: Array<UserItemDataType>
    subscribePendingUserIds: Array<string>
    subscribe: (userId: string) => void
    unsubscribe: (userId: string) => void
}

const Users: React.FC<PropsType> = ({
                                        authorized,
                                        authorizedUserId,
                                        authorizedUserSubscriptions,
                                        users,
                                        subscribePendingUserIds,
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

            <div className={classes.usersItems}>
                {shownUsers && shownUsers.map(user => <UserItem
                    key={user._id}
                    authorized={authorized}
                    authorizedUserId={authorizedUserId}
                    user={user}
                    subscribePending={subscribePendingUserIds.includes(user._id)}
                    isSubscribed={authorizedUserSubscriptions.map(user => user._id).includes(user._id)}
                    subscribe={subscribe}
                    unsubscribe={unsubscribe}
                    mutualFriendsCount={4}
                />)}
            </div>
        </Card>
    )
}

export default Users