import React from 'react';
import { AvatarType } from 'types/types';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'components/_shared/Avatar/Avatar';
import { trimString } from 'utils/functions';
import classes from './DialogButton.module.scss';

type Props = { username: string, firstName: string, lastName: string, avatar: AvatarType }
export const DialogButton: React.FC<Props> = ({
  username, firstName, lastName, avatar,
}) => (
  <NavLink to={`/dialogs/${username}`} className={classes.dialogButton} activeClassName={classes.active} title={`${firstName} ${lastName}`}>
    <Avatar size={30} name={trimString(firstName, 8)} smallImg={avatar.small} />
  </NavLink>
);
