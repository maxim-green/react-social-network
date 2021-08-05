import React from "react";
import Card from "../common/Card/Card";
import classes from "./Users.module.scss"
import UserItem from "./UserItem/UserItem";
import NavTab from "../common/NavTabs/NavTab/NavTab";
import NavTabs from "../common/NavTabs/NavTabs";

const Users = (props) => {

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
                {props.users.map(user => {
                    return <UserItem
                        key={user.userId}
                        authorized={props.authorized}
                        authorizedUserId={props.authorizedUserId}
                        {...user}
                        addFriend={props.addFriend}
                        deleteFriend={props.deleteFriend}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        mutualFriendsCount={4}
                    />
                })}
            </div>
        </Card>
    )
}

export default Users