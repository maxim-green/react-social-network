import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import classes from "components/Layout/Header/UserControl/UserControl.module.scss";
import {Avatar} from "components/_shared/Avatar/Avatar";
import {Button} from 'components/_shared/Button/Button'

type PropsType = {
    username?: string
    avatar?: string | null
    logout: () => void
}

export const UserControl: React.FC<PropsType> = (props) => {
    const [isOpened, setIsOpened] = useState(false)

    const clickHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpened(!isOpened)
    }

    window.addEventListener('click', () => {
        setIsOpened(false)
    })

    return (
        <div className={classes.userControl}>
            <NavLink to={`/profile/${props.username}`}><Avatar smallImg={props.avatar} online size={30}/></NavLink>
            <div className={classes.userControlDropdown}>
                <button className={classes.userControlUsername} onClick={clickHandler}>{props.username}</button>
                {isOpened && <div className={classes.userControlList}>
                    <ul>
                        <li><NavLink to='/settings'><Button type="text">Settings</Button></NavLink></li>
                        <li><Button type="text" onClick={() => props.logout()}>Logout</Button></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}