import classes from "./ProfileInfoItem.module.scss";
import React from "react";
import classnames from "classnames";

const ProfileInfoItem = (props) => {
    return (
        <div className={
                 classnames(
                     classes.profileInfoItem,
                     {[classes.vertical]: props.orientation === 'vertical'},
                 )
             }>
            <div className={classes.itemTitle}>{props.title}</div><div className={classes.itemValue}>{props.children}</div>
        </div>
    )
}

export default ProfileInfoItem