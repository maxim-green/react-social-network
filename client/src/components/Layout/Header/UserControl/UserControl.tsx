import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from 'components/Layout/Header/UserControl/UserControl.module.scss';
import { Avatar } from 'components/_shared/Avatar/Avatar';
import { Row } from 'components/_shared/Flex/Flex';

type PropsType = {
  username?: string
  avatar?: string | null
}

export const UserControl: React.FC<PropsType> = ({
  username,
  avatar,
}) => (
  <div className={classes.userControl}>
    <NavLink to={`/profile/${username}`} style={{ color: 'white' }}>
      <Row verticalAlign="center" gap={10}>
        <div>
          <Avatar smallImg={avatar} online size={25} />
        </div>
        <div>{username}</div>
      </Row>
    </NavLink>
  </div>
);
