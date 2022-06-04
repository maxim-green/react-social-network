import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import classes from "components/Layout/Header/UserControl/UserControl.module.scss";
import {Avatar} from "components/_shared/Avatar/Avatar";
import {Button} from 'components/_shared/Button/Button'
import {Row} from '../../../_shared/Flex/Flex'

type PropsType = {
    username?: string
    avatar?: string | null
    logout: () => void
}

export const UserControl: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.userControl}>
            <NavLink to={`/profile/${props.username}`} style={{color: 'white'}}>
                <Row verticalAlign={'center'} gap={10}>
                    <div>
                        <Avatar smallImg={props.avatar} online size={25}/>
                    </div>
                    <div >{props.username}</div>
                </Row>
            </NavLink>
        </div>
    )
}
