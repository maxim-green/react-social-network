import classes from 'components/Profile/ProfileInfoData/ProfileInfoData.module.scss'
import React from 'react'
import {ContactsType, LocationType} from 'types/types'
import {GeoAlt, Link45deg, CalendarEvent, Icon} from 'react-bootstrap-icons'
import moment from 'moment'
import {formatDate} from 'utils/functions'
import {Row} from '../../_shared/Flex/Flex'

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

                {!!birthDate && <InfoItem icon={CalendarEvent} iconSize={14}
                                        label={'Birthday'}>{formatDate(birthDate, 'MMMM, D')}</InfoItem>}

                {!!location?.country && !!location?.city && <InfoItem icon={GeoAlt} iconSize={15}
                                                                  label={'Location'}>{location.country}, {location.city}</InfoItem>}

                {!!contacts?.website && <InfoItem icon={Link45deg} label={'Website'}
                                                link={'http://' + contacts.website}>{contacts.website}</InfoItem>}

            </div>
        </div>
    )
}

type BioPropsType = { bio: string }
const Bio: React.FC<BioPropsType> = ({bio}) => <Row padding={'0 0 20px'}>
    <div className={classes.bio}>{bio}</div>
</Row>

type InfoItemType = { icon?: Icon, label?: string, iconSize?: number, link?: string }
const InfoItem: React.FC<InfoItemType> = ({
                                              icon,
                                              label,
                                              link,
                                              iconSize = 16,
                                              children
                                          }) => <div className={classes.item}>
    <div className={classes.itemTitle}>
        {!!icon && <div className={classes.itemIcon}>{React.createElement(icon, {size: iconSize})}</div>}
        {!!label && <div className={classes.itemLabel}>{label}</div>}
    </div>
    {!link && <span className={classes.itemText}>{children}</span>}
    {!!link && <a href={link} className={classes.itemLink}>{children}</a>}
</div>


export default ProfileInfoData
