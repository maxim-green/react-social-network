import classes from "./UserItem.module.scss";
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar/Avatar";
import React from "react";
import gearIcon from "../../../assets/images/gear-icon.svg"
import sendMessageIcon from "../../../assets/images/send-message-icon.svg"
import Button from "../../common/Button/Button";

const UserItem = (props) => {

    const isAuthorizedUserItem = props.authorized && (props.authorizedUserId === props.userId)

    const friendButtonClickHandler = (e) => {
        if (!props.isFriend) {
            props.addFriend(props.userId)
        } else {
            props.deleteFriend(props.userId)
        }
    }

    const followButtonClickHandler = (e) => {
        if (!props.isSubscription) {
            props.follow(props.userId)
        } else {
            props.unfollow(props.userId)
        }
    }

    return (
        <div className={classes.userItem}>
            <div className={classes.avatar}>
                <NavLink to={`/profile/${props.username}`}><Avatar img={props.avatar && props.avatar.large} online size='md'/></NavLink>
            </div>
            <div className={classes.info}>
                <NavLink to={`/profile/${props.username}`}>
                    <div className={classes.userName}>{`${props.firstName} ${props.lastName}`}</div>
                </NavLink>
                {props.mutualFriendsCount !== 0 && props.mutualFriendsCount && <NavLink to="/profile/1/mutualfriends">
                    <div className={classes.mutualFriends}>{props.mutualFriendsCount} mutual friends</div>
                </NavLink>}
            </div>
            <div className={classes.controls}>
                {props.authorized && !isAuthorizedUserItem && <div className={classes.row}>
                    <div className={classes.button}>
                        <Button icon={sendMessageIcon} variant="neutral"/>
                    </div>
                    <div className={classes.button}>
                        <Button icon={gearIcon} variant="neutral"/>
                    </div>
                </div>}
                {props.authorized && !isAuthorizedUserItem && <div className={classes.row}>
                    <div className={classes.button}>
                        <Button
                            caption={!props.isFriend ? "Add to friends" : "Remove from friends"}
                            variant="neutral"
                            onClick={friendButtonClickHandler}
                        />
                    </div>
                    <div className={classes.button}>
                        <Button
                            caption={!props.isSubscription ? "Follow" : "Unfollow"}
                            variant="neutral"
                            onClick={followButtonClickHandler}
                        />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default UserItem