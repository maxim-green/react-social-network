import React from 'react'
import Card from '../../_shared/Card/Card'
import 'reactjs-popup/dist/index.css'
import {EditProfileDataType} from '../../../api/profile.api'
import ProfileCoverImage from './ProfileCoverImage/ProfileCoverImage'
import ProfileInfoHeader from './ProfileHeader/ProfileHeader'
import ProfileInfoData from './ProfileInfoData/ProfileInfoData'
import {Area} from 'react-easy-crop/types'
import {UserDataType} from '../../../types/types'

type PropsType = {
    authorized: boolean,
    authorizedUserId?: string
    profileData: UserDataType
    onAvatarSubmit: (image: File, cropArea: Area) => void
    onCoverImageSubmit: (image: File, cropArea: Area) => void
    onStatusUpdate: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = ({
                                              authorized,
                                              authorizedUserId,
                                              profileData,
                                              onAvatarSubmit,
                                              onCoverImageSubmit,
    onStatusUpdate
                                          }) => {
    const owner = authorized && (authorizedUserId === profileData._id)

    return (
        <Card>
            <ProfileCoverImage
                owner={owner}
                img={profileData.profile.coverImage}
                onCoverImageSubmit={onCoverImageSubmit}
            />
            <div style={{padding: '20px'}}>
                <ProfileInfoHeader
                    owner={owner}
                    firstName={profileData.firstName}
                    lastName={profileData.lastName}
                    status={profileData.profile.status}
                    avatar={profileData.avatar}
                    onAvatarSubmit={onAvatarSubmit}
                    onStatusUpdate={onStatusUpdate}
                />
                <ProfileInfoData
                    birthDate={profileData.profile.birthDate}
                    location={profileData.profile.location}
                    contacts={profileData.profile.contacts}
                    bio={profileData.profile.bio}
                />
            </div>
        </Card>
    )
}

export default ProfileInfo