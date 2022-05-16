import React from 'react'
import classes from './DialogButton.module.scss'
import {AvatarType} from 'types/types'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {trimString} from 'utils/functions'

type Props = { username: string, firstName: string, lastName: string, avatar: AvatarType }
export const DialogButton: React.FC<Props> = ({username, firstName, lastName, avatar}) => {
    return (
        <NavLink to={`/dialogs/${username}`} className={classes.dialogButton} activeClassName={classes.active} title={`${firstName} ${lastName}`}>
            <Avatar size={30} name={trimString(firstName, 8)} smallImg={avatar.small}/>
        </NavLink>
    )
}