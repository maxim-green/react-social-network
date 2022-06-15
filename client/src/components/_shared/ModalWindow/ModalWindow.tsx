import 'reactjs-popup/dist/index.css';
import React from 'react';
import './popupjs.css';
import Popup from 'reactjs-popup';
import { XLg } from 'react-bootstrap-icons';
import { Button } from 'components/_shared/Button/Button';
import classes from './ModalWindow.module.scss';

type Props = {
    title?: string
    open: boolean
    close?: () => void
}

export const ModalWindow: React.FC<Props> = ({
  title, close, open, children,
}) => (
  <Popup
    open={open}
    modal
    nested
    onClose={close}
    contentStyle={{ borderRadius: 5, padding: '10px' }}
    closeOnDocumentClick={false}
  >
    {(title || close) && (
    <div className={classes.header}>
      <div className={classes.title}>{title}</div>
      <div className={classes.button} style={{ marginBottom: 10 }}>
        <Button type="cancel" size="sm" onClick={close}>
          <Button.Icon><XLg /></Button.Icon>
        </Button>
      </div>
    </div>
    )}
    <div className={classes.content}>
      {children}
    </div>
  </Popup>
);
