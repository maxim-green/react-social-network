import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import classes from './Logo.module.scss';

export const Logo: React.FC = () => (
  <div className={classes.logo} data-testid="logo">
    <NavLink to="/">
      <img src={logo} alt="Bind" />
    </NavLink>
  </div>
);
