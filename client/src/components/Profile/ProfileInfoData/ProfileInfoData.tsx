import classes from 'components/Profile/ProfileInfoData/ProfileInfoData.module.scss';
import React from 'react';
import { ContactsType, LocationType } from 'types/types';
import {
  CalendarEvent, GeoAlt, Icon, Link45deg,
} from 'react-bootstrap-icons';
import { formatDate } from 'utils/functions/functions';
import { Row } from 'components/_shared/Flex/Flex';
import { normalizeUrl } from 'utils/functions/normalizeUrl';

type BioPropsType = { bio: string }
const Bio: React.FC<BioPropsType> = ({ bio }) => (
  <Row padding="0 0 20px">
    <div className={classes.bio}>{bio}</div>
  </Row>
);

type InfoItemType = { icon?: Icon, label?: string, iconSize?: number, link?: string }
const InfoItem: React.FC<InfoItemType> = ({
  icon,
  label,
  link,
  iconSize = 16,
  children,
}) => (
  <div className={classes.item}>
    <div className={classes.itemTitle}>
      {!!icon
        && <div className={classes.itemIcon}>{React.createElement(icon, { size: iconSize })}</div>}
      {!!label && <div className={classes.itemLabel}>{label}</div>}
    </div>
    {!link && <span className={classes.itemText}>{children}</span>}
    {!!link && (
    <a href={link} className={classes.itemLink} target="_blank" rel="noreferrer">
      {children}
    </a>
    )}
  </div>
);

type PropsTypes = {
  birthDate: string | null
  location: LocationType
  contacts: ContactsType
  bio: string | null
}

export const ProfileInfoData: React.FC<PropsTypes> = ({
  birthDate,
  location,
  contacts,
  bio,
}) => (
  <div className={classes.profileInfoData}>
    {bio && <Bio bio={bio} />}
    <div className={classes.profileInfoItems}>

      {!!birthDate && (
      <InfoItem
        icon={CalendarEvent}
        iconSize={14}
        label="Birthday"
      >
        {formatDate(birthDate, 'MMMM, D')}
      </InfoItem>
      )}

      {!!location?.country && !!location?.city && (
      <InfoItem
        icon={GeoAlt}
        iconSize={15}
        label="Location"
      >
        {location.country}
        ,
          {' '}
        {location.city}
      </InfoItem>
      )}
    </div>

    <div className={classes.profileInfoItems}>
      {!!contacts?.website && (
      <InfoItem
        icon={Link45deg}
        label="Website"
        link={`https://${normalizeUrl(contacts.website)}`}
      >
        {normalizeUrl(contacts.website)}
      </InfoItem>
      )}

      {!!contacts?.github && (
      <InfoItem
        icon={Link45deg}
        label="GitHub"
        link={`https://${normalizeUrl(contacts.github)}`}
      >
        {normalizeUrl(contacts.github)}
      </InfoItem>
      )}

      {!!contacts?.vkontakte && (
      <InfoItem
        icon={Link45deg}
        label="VK"
        link={`https://${normalizeUrl(contacts.vkontakte)}`}
      >
        {normalizeUrl(contacts.vkontakte)}
      </InfoItem>
      )}
    </div>

  </div>
);
