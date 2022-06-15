import React from 'react';
import { Row } from 'components/_shared/Flex/Flex';
import classes from './PostText.module.scss';

export const PostText: React.FC = ({ children }) => (
  <Row padding="10px 40px 30px" verticalAlign="start" bordered>
    <div className={classes.text}>
      {children}
    </div>
  </Row>
);
