import {NavLink} from "react-router-dom";
import React from "react";
import classes from "./NavTab.module.scss"

const NavTab = (props) => {
    return (
        <div className={classes.tab}>
            <NavLink exact to={`${props.to}`} activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </div>
    )
}

export default NavTab
