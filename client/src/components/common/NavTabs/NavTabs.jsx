import classes from "./NavTabs.module.scss";
import React from "react";

const NavTabs = (props) => {
    return (<div className={classes.tabs}>
        {props.children}
    </div>)
}

export default NavTabs