import classes from "./ProfileInfoItem.module.scss";
import React from "react";
import classnames from "classnames";

type PropsType = {
    title: string
    orientation?: 'vertical' | 'horizontal'
}

const ProfileInfoItem: React.FC<PropsType> = ({
                                                  title,
                                                  orientation,
                                                  children
                                              }) => {
    return (
        <div className={
                 classnames(
                     classes.profileInfoItem,
                     {[classes.vertical]: orientation === 'vertical'},
                 )
             }>
            <div className={classes.itemTitle}>{title}</div><div className={classes.itemValue}>{children}</div>
        </div>
    )
}

export default ProfileInfoItem