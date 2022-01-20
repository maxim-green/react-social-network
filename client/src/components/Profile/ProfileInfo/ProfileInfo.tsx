import React from 'react'
import Card from '../../common/Card/Card'
import 'reactjs-popup/dist/index.css'
import {ProfileDataType} from '../../../api/profile.api'
import ProfileCoverImage from './ProfileCoverImage/ProfileCoverImage'
import ProfileInfoHeader from './ProfileHeader/ProfileHeader'
import ProfileInfoData from './ProfileInfoData/ProfileInfoData'
import {Area} from 'react-easy-crop/types'

type PropsType = {
    authorized: boolean,
    authorizedUserId: string | null
    profileData: ProfileDataType
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
    const owner = authorized && (authorizedUserId === profileData.userId)

    return (
        <Card>
            <ProfileCoverImage
                owner={owner}
                img={profileData.coverImage}
                onCoverImageSubmit={onCoverImageSubmit}
            />
            <div style={{padding: '20px'}}>
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
                />
            </div>
        </Card>
    )
}

export default ProfileInfo