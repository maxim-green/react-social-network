import React from 'react';
import classes from 'components/AuthCard/AuthCard.module.scss';
import { NavTabs } from 'components/_shared/NavTabs/NavTabs';
import { NavTab } from 'components/_shared/NavTabs/NavTab/NavTab';
import { Card } from 'components/_shared/Card/Card';

export const AuthCard: React.FC = ({ children }) => (
  <div className={classes.wrapper}>
    <div className={classes.container}>
      <Card>
        <NavTabs>
          <NavTab to="/login">Log In</NavTab>
          <NavTab to="/register">Sign Up</NavTab>
        </NavTabs>
        <div style={{ padding: '28px' }}>
          {children}
        </div>
      </Card>
    </div>
  </div>
);
