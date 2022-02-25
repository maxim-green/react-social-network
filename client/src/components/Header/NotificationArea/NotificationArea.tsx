import React from 'react'
import {NavLink} from 'react-router-dom'
import {BellFill, ChatLeftTextFill} from 'react-bootstrap-icons'
import classes from './NotificationArea.module.scss'
import {Button} from 'components/_shared/Button/Button'

type Props = {}

export const NotificationArea: React.FC<Props> = (props) => {
    return <div className={classes.notificationArea}>
        <NavLink to='/dialogs'>
            <Button>
                <Button.Icon><ChatLeftTextFill/></Button.Icon>
                <Button.Badge>3</Button.Badge>
            </Button>
        </NavLink>
        <NavLink to='/notifications'>
            <Button>
                <Button.Icon><BellFill/></Button.Icon>
                <Button.Badge>12</Button.Badge>
            </Button>
        </NavLink>
    </div>
}