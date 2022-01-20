import classes from "./UserControl.module.scss";
import Avatar from "../../_shared/Avatar/Avatar";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "../../_shared/Button/Button";

type PropsType = {
    username: string | null
    avatar: string | null
    logout: () => void
}

const UserControl: React.FC<PropsType> = (props) => {
    const [isOpened, setIsOpened] = useState(false)

    const clickHandler = () => {
        setIsOpened(!isOpened)
    }

    return (
        <div className={classes.userControl}>
            <NavLink to="/profile/1"><Avatar img={props.avatar} contextBgColor="#373C42" online size='sm'/></NavLink>
            <div className={classes.userControlDropdown}>
                <button className={classes.userControlUsername} onClick={clickHandler}>{props.username}</button>
                {isOpened && <div className={classes.userControlList}>
                    <ul>
                        <li><NavLink to='/settings'><Button variant="text" caption="Settings"/></NavLink></li>
                        <li><Button variant="text" caption="Logout" onClick={() => props.logout()}/></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default UserControl