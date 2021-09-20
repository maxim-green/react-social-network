import classes from './ProfileHeader.module.scss'
import Avatar from '../../../../common/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import Button from '../../../../common/Button/Button'
import editIcon from '../../../../../assets/images/edit-icon.svg'
import React from 'react'
import {AvatarType} from '../../../../../types/types'
import {FormSubmitHandler} from 'redux-form'

type PropsType = {
    owner?: boolean
    firstName: string,
    lastName: string,
    status?: string,
    avatar?: AvatarType
    onAvatarSubmit?: FormSubmitHandler<{ avatar: File }>
}

const ProfileHeader: React.FC<PropsType> = ({
                                                owner = false,
                                                firstName,
                                                lastName,
                                                status,
                                                avatar,
                                                onAvatarSubmit
                                            }) => {
    return (
        <div className={classes.profileHeader}>
            <div className={classes.avatar}>
                <Avatar img={avatar?.small} online size='lg' owner={owner} onSubmit={onAvatarSubmit}/>
            </div>
            <div className={classes.profileHeaderInfo}>
                <div className={classes.name}>{firstName} {lastName}</div>
                {owner && <div className={classes.status}>{status || 'What is your status?'}</div>}
                {!owner && <div className={classes.status}>{status}</div>}
            </div>
            <div className={classes.editProfile}>
                {owner && <NavLink to="/profile/edit">
                    <Button icon={editIcon} caption="Edit profile" variant="secondary"/>
                </NavLink>}
            </div>
        </div>
    )
}

export default ProfileHeader