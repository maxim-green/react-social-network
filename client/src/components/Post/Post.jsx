import Card from "../common/Card/Card";
import React from "react";
import classes from "./Post.module.scss"
import Avatar from "../common/Avatar/Avatar";
import {NavLink} from "react-router-dom";
import Button from "../common/Button/Button";
import menuDotsIcon from "../../assets/images/menu-dots-icon.svg"
import likeLikedIcon from "../../assets/images/like-liked-icon.svg"
import likeUnlikedIcon from "../../assets/images/like-unliked-icon.svg"
import commentIcon from "../../assets/images/comment-icon.svg"
import shareIcon from "../../assets/images/share-icon.svg"

const Post = (props) => {
    return (
        <Card>

            <div className={classes.header}>
                <div className={classes.avatar}>
                    <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online size='md'/></NavLink>
                </div>
                <div className={classes.info}>
                    <NavLink to="/">
                        <div className={classes.userName}>{props.userName}</div>
                    </NavLink>
                    <div className={classes.date}>posted on {props.date}</div>
                </div>
                <div className={classes.menu}>
                    <Button icon={menuDotsIcon} variant="text" size="sm"/>
                </div>
            </div>

            <div className={classes.content}>
                <div className={classes.text}>
                    {props.text}
                </div>
            </div>

            <div className={classes.controls}>
                <div className={classes.controlsItem}>
                    {!props.liked && <Button icon={likeUnlikedIcon} variant="text" size="sm" caption="Like"/>}
                    {props.liked && <Button icon={likeLikedIcon} variant="text" size="sm" caption="Unlike"/>}
                </div>
                <div className={classes.controlsItem}>
                    <Button icon={commentIcon} variant="text" size="sm" caption="Comment"/>
                </div>
                <div className={classes.controlsItem}>
                    <Button icon={shareIcon} variant="text" size="sm" caption="Share"/>
                </div>
            </div>

        </Card>
    )
}

export default Post