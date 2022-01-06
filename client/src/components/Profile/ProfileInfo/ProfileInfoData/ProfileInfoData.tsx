import classes from './ProfileInfoData.module.scss'
import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem'
import Moment from 'react-moment'
import {capitalize} from '../../../../utils/functions'
import React from 'react'
import {ContactsType, LocationType} from '../../../../types/types'
import {GeoAlt, Link45deg, CalendarEvent} from 'react-bootstrap-icons'
import moment from 'moment'

type PropsTypes = {
    birthDate: string | null
    location: LocationType
    contacts: ContactsType
    bio: string | null
}

const ProfileInfoData: React.FC<PropsTypes> = ({
                                                   birthDate,
                                                   location,
                                                   contacts,
                                                   bio,
                                               }) => {
    return (
        <div className={classes.profileInfo}>
            {bio && <Bio bio={bio}/>}
            <div className={classes.profileInfoItems}>
                {birthDate && <BirthDate birthDate={birthDate}/>}
                {location?.country && location?.city && <Location city={location.city} country={location.country}/>}
                {contacts?.website && <Website website={contacts.website}/>}


            </div>
        </div>
    )
}

type BioPropsType = { bio: string }
const Bio: React.FC<BioPropsType> = ({bio}) => <div className={classes.bio}>
    {bio}
</div>

type BirthDatePropsType = { birthDate: string }
const BirthDate: React.FC<BirthDatePropsType> = ({ birthDate }) => <div className={classes.birthDate + ' ' + classes.item}>
    <span>Birthday: {moment(birthDate).format("MMMM, D")}</span>
</div>

type LocationProps = { country: string, city: string}
const Location: React.FC<LocationProps> = ({country, city}) => <div className={classes.location + ' ' + classes.item}>
    <GeoAlt size={20}/><span>{country}, {city}</span>
</div>

type WebsitePropsType = {website: string}
const Website: React.FC<WebsitePropsType> = ({website}) => <a href={'http://' + website} className={classes.website + ' ' + classes.item}>
    <Link45deg size={24}/><span>{website}</span>
</a>

// @ts-ignore
// const ProfileInfoSocialItem: React.FC<ProfileInfoSocialItemType> = ({Icon, href}) => <div className={classes.contactItem}>
//     <a href={href}><Icon size={18}/></a>
// </div>

export default ProfileInfoData