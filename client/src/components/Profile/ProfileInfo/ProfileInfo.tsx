import React from 'react'
import Card from '../../common/Card/Card'
import 'reactjs-popup/dist/index.css'
import {ProfileDataType} from '../../../api/profile.api'
import ProfileCoverImage from './ProfileCoverImage/ProfileCoverImage'
import ProfileInfoHeader from './ProfileHeader/ProfileHeader'
import ProfileInfoData from './ProfileInfoData/ProfileInfoData'
import {Point} from 'react-easy-crop/types'

type PropsType = {
    authorized: boolean,
    authorizedUserId: string | null
    profileData: ProfileDataType
    onAvatarSubmit: (e: React.FormEvent, image: File, crop: Point) => void
    onStatusUpdate: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({
                                              authorized,
                                              authorizedUserId,
                                              profileData,
                                              onAvatarSubmit,
    onStatusUpdate
                                          }) => {
    const owner = authorized && (authorizedUserId === profileData.userId)

    return (
        <Card>
            <ProfileCoverImage
                owner={owner}
                img='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1140&q=80'
            />
            <ProfileInfoHeader
                owner={owner}
                firstName={profileData.firstName}
                lastName={profileData.lastName}
                status={profileData.status}
                avatar={profileData.avatar}
                onAvatarSubmit={onAvatarSubmit}
                onStatusUpdate={onStatusUpdate}
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