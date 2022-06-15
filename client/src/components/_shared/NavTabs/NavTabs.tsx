import React from 'react';
import classes from './NavTabs.module.scss';

type PropsType = {}

export const NavTabs: React.FC<PropsType> = ({ children }) => (
  <div className={classes.tabs}>
    {children}
  </div>
);
