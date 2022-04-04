import classes from 'components/Profile/ProfileInfoData/ProfileInfoData.module.scss'
import React from 'react'
import {ContactsType, LocationType} from 'types/types'
import {GeoAlt, Link45deg, CalendarEvent, Icon} from 'react-bootstrap-icons'
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
                                                   bio
                                               }) => {
    return (
        <div className={classes.profileInfoData}>
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

type InfoItemType = { icon?: Icon, label?: string, iconSize?: number, link?: string }
const InfoItem: React.FC<InfoItemType> = ({icon, label, link, iconSize = 16, children}) => <div
    className={classes.item}>
    <div className={classes.itemTitle}>
        {!!icon && <div className={classes.itemIcon}>{React.createElement(icon, {size: iconSize})}</div>}
        {!!label && <div className={classes.itemLabel}>{label}</div>}
    </div>
    {!link && <span className={classes.itemText}>{children}</span>}
    {!!link && <a href={link} className={classes.itemLink}>{children}</a>}
</div>

type BirthDatePropsType = { birthDate: string }
const BirthDate: React.FC<BirthDatePropsType> = ({birthDate}) => <InfoItem icon={CalendarEvent} iconSize={14}
                                                                           label={'Birthday'}>{moment(birthDate).format('MMMM, D')}</InfoItem>

type LocationProps = { country: string, city: string }
const Location: React.FC<LocationProps> = ({country, city}) => <InfoItem icon={GeoAlt} iconSize={15}
                                                                         label={'Location'}>{country}, {city}</InfoItem>

type WebsitePropsType = { website: string }
const Website: React.FC<WebsitePropsType> = ({website}) => <InfoItem icon={Link45deg} label={'Website'}
                                                                     link={'http://' + website}>{website}</InfoItem>

// @ts-ignore
// const ProfileInfoSocialItem: React.FC<ProfileInfoSocialItemType> = ({Icon, href}) => <div className={classes.contactItem}>
//     <a href={href}><Icon size={18}/></a>
// </div>

export default ProfileInfoData