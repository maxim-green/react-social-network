import React from 'react';
import { Button } from 'components/_shared/Button/Button';
import { ModalWindow } from 'components/_shared/ModalWindow/ModalWindow';
import { Row } from 'components/_shared/Flex/Flex';
import classes from './ConfirmPopup.module.scss';

type ConfirmPopupPropsType = {
    open: boolean
    confirmButtonText?: string
    declineButtonText?: string
    onConfirm: () => void
    onDecline: () => void
    important?: boolean
}
export const ConfirmPopup: React.FC<ConfirmPopupPropsType> = ({
  open,
  children,
  confirmButtonText = 'Ok',
  declineButtonText = 'Cancel',
  onConfirm,
  onDecline,
  important = false,
}) => (
  <ModalWindow open={open}>
    <div>
      <div className={classes.question}>{children}</div>
      <Row horizontalAlign="center" gap={10}>
        <Button type={important ? 'cancel' : 'primary'} onClick={onConfirm}>
          <Button.Text>{confirmButtonText}</Button.Text>
        </Button>
        <Button type={important ? 'primary' : 'secondary'} onClick={onDecline}>
          <Button.Text>{declineButtonText}</Button.Text>
        </Button>
      </Row>
    </div>
  </ModalWindow>
);
