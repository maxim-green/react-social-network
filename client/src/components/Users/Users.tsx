import React from 'react'
import Card from '../common/Card/Card'
import classes from './Users.module.scss'
import UserItem from './UserItem/UserItem'
import NavTab from '../common/NavTabs/NavTab/NavTab'
import NavTabs from '../common/NavTabs/NavTabs'
import {UserType} from '../../types/types'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    users: Array<UserType>
    addFriend: (userId: string) => void
    deleteFriend: (userId: string) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const Users: React.FC<PropsType> = ({
                                        authorized,
                                        authorizedUserId,
                                        users,
                                        addFriend,
                                        deleteFriend,
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
                        addFriend={addFriend}
                        deleteFriend={deleteFriend}
                        follow={follow}
                        unfollow={unfollow}
                        mutualFriendsCount={4}
                    />)}
            </div>
        </Card>
    )
}

export default Users