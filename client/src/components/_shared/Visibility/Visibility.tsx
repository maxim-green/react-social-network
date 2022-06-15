import React from 'react';
import classes from './Visibility.module.scss';

type Props = {
    visible: boolean
}

export const Visibility: React.FC<Props> = ({ children, visible }) => (
  <div className={visible ? classes.visible : classes.hidden}>
    {children}
  </div>
);
