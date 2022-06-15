import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from 'components/Layout/SideBar/SidebarNavigation/SidebarNavigation.module.scss';
import { Card } from 'components/_shared/Card/Card';
import {
  PersonLinesFill, ChatLeftTextFill, PeopleFill, HouseDoorFill,
} from 'react-bootstrap-icons';
import { Button } from 'components/_shared/Button/Button';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const List: React.FC = ({ children }) => (
  <ul>
    {children}
  </ul>
);

const Item: React.FC<{ to: string }> = ({ to, children }) => (
  <li>
    <NavLink to={to}>
      {children}
    </NavLink>
  </li>
);

export const SidebarNavigation: React.FC = () => {
  const unreadMessagesCount = useSelector((state: RootState) => state.dialogs.unreadMessagesCount);

  return (
    <Card>
      <div className={classes.Navigation}>
        <List>
          <Item to="/feed">
            <Button type="link" size="lg">
              <Button.Icon><HouseDoorFill /></Button.Icon>
              <Button.Text>Feed</Button.Text>
            </Button>
          </Item>
          <Item to="/profile">
            <Button type="link" size="lg">
              <Button.Icon><PersonLinesFill /></Button.Icon>
              <Button.Text>Profile</Button.Text>
            </Button>
          </Item>
          <Item to="/dialogs">
            <Button type="link" size="lg">
              <Button.Icon><ChatLeftTextFill /></Button.Icon>
              <Button.Text>Dialogs</Button.Text>
              {!!unreadMessagesCount && <Button.Badge>{unreadMessagesCount}</Button.Badge>}
            </Button>
          </Item>
          <Item to="/users">
            <Button type="link" size="lg">
              <Button.Icon><PeopleFill /></Button.Icon>
              <Button.Text>Users</Button.Text>
            </Button>
          </Item>
        </List>
      </div>
    </Card>
  );
};
