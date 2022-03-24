import React from 'react'
import {Area} from 'react-easy-crop/types'
import ProfileCoverImage from 'components/Profile/ProfileCoverImage/ProfileCoverImage'
import ProfileInfoHeader from 'components/Profile/ProfileHeader/ProfileHeader'
import ProfileInfoData from 'components/Profile/ProfileInfoData/ProfileInfoData'
import {Card} from 'components/_shared/Card/Card'
import {UserDataType} from 'types/types'

type PropsType = {
    authorized: boolean,
    authorizedUserId?: string
    profileData: UserDataType
    onAvatarSubmit: (image: File, cropArea: Area) => void
    onCoverImageSubmit: (image: File, cropArea: Area) => void
    onStatusUpdate: (status: string) => void
}

const Profile: React.FC<PropsType> = ({
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

export default Profile