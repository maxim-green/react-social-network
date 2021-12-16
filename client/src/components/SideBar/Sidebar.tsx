import classes from "./Sidebar.module.scss";
import Card from "../common/Card/Card";
import LoginForm from "../forms/LoginForm";
import SidebarNavigation from "./SidebarNavigation/SidebarNavigation";
import SidebarFriends from "./SidebarFriends/SidebarFriends";
import React from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames";

type PropsType = {
    authorized: boolean
}

const Sidebar: React.FC<PropsType> = ({
    authorized
                                      }) => {
    const location = useLocation()
    const pathname = location.pathname + '/'
    return (
        <div className={classNames(
            classes.sideBar,
            {[classes.hidden]: pathname.startsWith('/login/') || pathname.startsWith('/register/')}
        )
        }>
            {!authorized && <Card><LoginForm/></Card>}
            {authorized && <SidebarNavigation/>}
            {authorized && <SidebarFriends friendsCount={45}/>}
        </div>
    )
}

export default Sidebar