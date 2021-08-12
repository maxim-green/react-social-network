import classes from "./UserControl.module.scss";
import Avatar from "../../common/Avatar/Avatar";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "../../common/Button/Button";

type PropsType = {
    username: string | null
    logout: () => void
}

const UserControl: React.FC<PropsType> = (props) => {
    const [isOpened, setIsOpened] = useState(false)

    const clickHandler = () => {
        setIsOpened(!isOpened)
    }

    return (
        <div className={classes.userControl}>
            <NavLink to="/profile/1"><Avatar img="https://randomuser.me/api/portraits/men/32.jpg" contextBgColor="#373C42" online size='sm'/></NavLink>
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