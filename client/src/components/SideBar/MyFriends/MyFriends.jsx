import Card from "../../common/Card/Card";
import React from "react";
import classes from './MyFriends.module.scss'
import Avatar from "../../common/Avatar/Avatar";
import {NavLink} from "react-router-dom";


const MyFriends = (props) => {
    return (
        <Card>
            <div className={classes.Title}>My Friends</div>
            <div className={classes.Avatars}>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
                <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" online/></NavLink>
            </div>
            <div className={classes.Link}><NavLink to='/friends'>View All ({props.friendsCount})</NavLink></div>
        </Card>
    )
}

export default MyFriends