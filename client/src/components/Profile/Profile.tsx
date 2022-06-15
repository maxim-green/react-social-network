import React from 'react';
import { Area } from 'react-easy-crop/types';
import { ProfileCoverImage } from 'components/Profile/ProfileCoverImage/ProfileCoverImage';
import { ProfileHeader } from 'components/Profile/ProfileHeader/ProfileHeader';
import { ProfileInfoData } from 'components/Profile/ProfileInfoData/ProfileInfoData';
import { Card } from 'components/_shared/Card/Card';
import { UserDataType } from 'types/types';
import { checkOnline } from 'utils/functions';

type PropsType = {
    user: UserDataType
    isOwner: boolean,
    onAvatarSubmit: (image: File, cropArea: Area) => void
    onCoverImageSubmit: (image: File, cropArea: Area) => void
    onStatusUpdate: (status: string) => void
}

export const Profile: React.FC<PropsType> = ({
  user,
  isOwner,
  onAvatarSubmit,
  onCoverImageSubmit,
  onStatusUpdate,
}) => (
  <Card>
    <ProfileCoverImage
      owner={isOwner}
      img={user.coverImage}
      onCoverImageSubmit={onCoverImageSubmit}
    />
    <ProfileHeader
      online={checkOnline(user.updatedAt)}
      owner={isOwner}
      firstName={user.firstName}
      lastName={user.lastName}
      status={user.status}
      avatar={user.avatar}
      onAvatarSubmit={onAvatarSubmit}
      onStatusUpdate={onStatusUpdate}
    />
    <ProfileInfoData
      birthDate={user.birthDate}
      location={user.location}
      contacts={user.contacts}
      bio={user.bio}
    />
  </Card>
);
