import classes from './ProfileInfoData.module.scss'
import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem'
import Moment from 'react-moment'
import {capitalize} from '../../../../../utils/functions'
import React from 'react'
import {ContactsType, LocationType} from '../../../../../types/types'

type PropsTypes = {
    birthDate: string | null
    location: LocationType
    contacts: ContactsType
    bio: string | null
    interests: string | null
}

const ProfileInfoData: React.FC<PropsTypes> = ({
                                                   birthDate,
                                                   location,
                                                   contacts,
                                                   bio,
                                                   interests
                                               }) => {
    return (
        <div className={classes.profileInfo}>
            <div className={classes.profileInfoColumn}>
                {birthDate && <ProfileInfoItem title="Birth date:">
                    <Moment format="DD.MM.YYYY" date={birthDate}/>
                </ProfileInfoItem>}

                {location?.country && location?.city && <ProfileInfoItem title="Location:">
                    {location?.country}, {location?.city}
                </ProfileInfoItem>}

                {contacts && Object.keys(contacts).map((key) => {
                    const href: string | undefined = contacts[key as keyof ContactsType] || undefined
                    if (contacts && contacts[key as keyof ContactsType]) return <ProfileInfoItem
                        title={capitalize(key) + ':'}>
                        <a href={href}>{contacts[key as keyof ContactsType]}</a>
                    </ProfileInfoItem>
                    return null
                })}
            </div>
            {interests && <div className={classes.profileInfoColumn}>
                <ProfileInfoItem title="Interests:" orientation="vertical">
                    {interests}
                </ProfileInfoItem>
            </div>}
        </div>
    )
}

export default ProfileInfoData