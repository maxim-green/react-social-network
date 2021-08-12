import classes from "./SideBar.module.scss";
import Card from "../common/Card/Card";
import LoginForm from "../pages/LoginPage/LoginForm/LoginForm";
import Navigation from "./Navigation/Navigation";
import MyFriends from "./MyFriends/MyFriends";
import React from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames";

type PropsType = {
    authorized: boolean
}

const SideBar: React.FC<PropsType> = ({
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
            {authorized && <Navigation/>}
            {authorized && <MyFriends friendsCount={45}/>}
        </div>
    )
}

export default SideBar