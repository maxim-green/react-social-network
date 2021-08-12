import React from 'react'
import Card from '../../../common/Card/Card'
import classes from './ProfileInfo.module.scss'
import Avatar from '../../../common/Avatar/Avatar'
import Button from '../../../common/Button/Button'
import editIcon from '../../../../assets/images/edit-icon.svg'
import editCoverImageIcon from '../../../../assets/images/edit-cover-image-icon.svg'
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem'
import 'reactjs-popup/dist/index.css'
import {NavLink} from 'react-router-dom'
import Moment from 'react-moment'
import {capitalize} from '../../../../utils/functions'
import {ProfileStateType} from '../../../../redux/reducers/profile.reducer'

type PropsType = {
    authorized: boolean,
    authorizedUserId: string | null
    profileData: ProfileStateType
    onAvatarSubmit: ({avatar}: { avatar: File }) => void
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
            <div className={classes.coverImage}
                 style={{backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1140&q=80)'}}>
                <div className={classes.editCoverImageButton}>
                    {owner && <Button icon={editCoverImageIcon} caption="Edit Cover Image" variant="neutral"/>}
                </div>
            </div>
            <div className={classes.profileHeader}>
                <div className={classes.avatar}>
                    <Avatar img={profileData.avatar.small} online size='lg' owner={owner} onSubmit={onAvatarSubmit}/>
                </div>
                <div className={classes.profileHeaderInfo}>
                    <div className={classes.name}>{profileData.firstName} {profileData.lastName}</div>
                    {owner && <div className={classes.status}>{profileData.status || 'What is your status?'}</div>}
                    {!owner && <div className={classes.status}>{profileData.status}</div>}
                </div>
                <div className={classes.editProfile}>
                    {owner && <NavLink to="/profile/edit">
                        <Button icon={editIcon} caption="Edit profile" variant="secondary"/>
                    </NavLink>}
                </div>
            </div>
            <div className={classes.profileInfo}>
                <div className={classes.profileInfoColumn}>
                    {profileData.birthDate && <ProfileInfoItem title="Birth date:">
                        <Moment format="DD.MM.YYYY" date={profileData.birthDate}/>
                    </ProfileInfoItem>}

                    {profileData.location.country && profileData.location.city && <ProfileInfoItem title="Location:">
                        {profileData.location.country}, {profileData.location.city}
                    </ProfileInfoItem>}

                    {Object.keys(profileData.contacts).map(key => {
                        if (profileData.contacts[key]) return <ProfileInfoItem
                            title={capitalize(key) + ':'}>{profileData.contacts[key]}</ProfileInfoItem>
                        return null
                    })}
                </div>
                {profileData.bio && <div className={classes.profileInfoColumn}>
                    <ProfileInfoItem title="Bio:" orientation="vertical">
                        {profileData.bio}
                    </ProfileInfoItem>
                </div>}
                {profileData.interests && <div className={classes.profileInfoColumn}>
                    <ProfileInfoItem title="Interests:" orientation="vertical">
                        {profileData.interests}
                    </ProfileInfoItem>
                </div>}
            </div>
        </Card>
    )
}

export default ProfileInfo