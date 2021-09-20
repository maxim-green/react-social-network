import React from 'react'
import Card from '../../../common/Card/Card'
import classes from './ProfileInfo.module.scss'
import Avatar from '../../../common/Avatar/Avatar'
import Button from '../../../common/Button/Button'
import editIcon from '../../../../assets/images/edit-icon.svg'
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem'
import 'reactjs-popup/dist/index.css'
import {NavLink} from 'react-router-dom'
import Moment from 'react-moment'
import {capitalize} from '../../../../utils/functions'
import {ProfileDataType} from '../../../../api/profile.api'
import ProfileCoverImage from './ProfileCoverImage/ProfileCoverImage'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import {FormSubmitHandler} from 'redux-form'
import ProfileInfoData from './ProfileInfoData/ProfileInfoData'

type PropsType = {
    authorized: boolean,
    authorizedUserId: string | null
    profileData: ProfileDataType
    onAvatarSubmit: FormSubmitHandler<{ avatar: File }>
}

const ProfileInfo: React.FC<PropsType> = ({
                                              authorized,
                                              authorizedUserId,
                                              profileData,
                                              onAvatarSubmit
                                          }) => {
    const owner = authorized && (authorizedUserId === profileData.userId)

    return (
        <Card>
            <ProfileCoverImage
                owner={owner}
                img='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1140&q=80'
            />
            <ProfileHeader
                owner={owner}
                firstName={profileData.firstName}
                lastName={profileData.lastName}
                status={profileData.status}
                avatar={profileData.avatar}
                onAvatarSubmit={onAvatarSubmit}
            />
            <ProfileInfoData
                birthDate={profileData.birthDate}
                location={profileData.location}
                contacts={profileData.contacts}
                bio={profileData.bio}
                interests={profileData.interests}
            />
        </Card>
    )
}

export default ProfileInfo