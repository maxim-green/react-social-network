import React from 'react';
import classes from 'components/Layout/Header/Header.module.scss';
import { UserControl } from 'components/Layout/Header/UserControl/UserControl';
import { Logo } from 'components/_shared/Logo/Logo';
import { NavLink } from 'react-router-dom';
import { Col, Row, Space } from 'components/_shared/Flex/Flex';
import { Button } from 'components/_shared/Button/Button';

type PropsType = {
    authorized: boolean
    username?: string
    avatar?: string | null
    logout: () => void
}

export const Header: React.FC<PropsType> = ({
  authorized,
  username,
  avatar,
  logout,

}) => (
  <Row horizontalAlign="space-between" verticalAlign="center" gap={10}>
    <Logo />
    <Space />
    {authorized && (
    <div className={classes.userControl}>
      <UserControl username={username} avatar={avatar} />
    </div>
    )}
    {authorized && (
    <Col>
      <Button type="secondary" size="md" onClick={() => logout()}>Log out</Button>
    </Col>
    )}
    {!authorized && (
    <Col>
      <NavLink to="/login" style={{ color: 'white' }}>
        <Button type="secondary" size="md">Log in</Button>
      </NavLink>
    </Col>
    )}
    {!authorized && (
    <Col>
      <NavLink to="/register" style={{ color: 'white' }}>
        <Button type="secondary" size="md">Sign up</Button>
      </NavLink>
    </Col>
    )}
  </Row>
);
