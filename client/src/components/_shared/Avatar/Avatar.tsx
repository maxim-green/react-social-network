import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import defaultAvatarImage from 'assets/images/avatar-default.jpg';
import { Area } from 'react-easy-crop/types';
import { ImageUploadForm } from 'components/_forms/ImageUploadForm/ImageUploadForm';
import { Button } from 'components/_shared/Button/Button';
import { ArrowLeft, XLg, ZoomIn } from 'react-bootstrap-icons';
import { ModalWindow } from 'components/_shared/ModalWindow/ModalWindow';
import { Row, Space } from 'components/_shared/Flex/Flex';
import classes from './Avatar.module.scss';

type AvatarModalWindowPropsType = {
  img?: string | null,
  open: boolean,
  openInEditMode?: boolean,
  onClose: () => void
  onSubmit?: (image: File, cropArea: Area) => void
}
const AvatarModalWindow: React.FC<AvatarModalWindowPropsType> = ({
  img,
  open,
  onClose,
  onSubmit,
  openInEditMode = false,
}) => {
  const [editMode, setEditMode] = useState(openInEditMode);
  useEffect(() => {
    setEditMode(openInEditMode);
  }, [openInEditMode]);

  const editHandler = () => {
    setEditMode(true);
  };
  const closeHandler = () => {
    setEditMode(openInEditMode);
    onClose();
  };
  const backHandler = () => {
    setEditMode(false);
  };
  const submitHandler = (image: File, cropArea: Area) => {
    if (onSubmit) onSubmit(image, cropArea);
    closeHandler();
  };
  return (
    <ModalWindow open={open}>
      <Row horizontalAlign="center">
        {!editMode && !!onSubmit && <Button onClick={editHandler}>Change avatar</Button>}
        {editMode && !!onSubmit && !!img
          && <Button onClick={backHandler}><Button.Icon><ArrowLeft /></Button.Icon></Button>}
        <Space />
        <Button type="cancel" size="md" onClick={closeHandler}>
          <Button.Icon><XLg /></Button.Icon>
        </Button>
      </Row>
      {!editMode && (
        <div style={{ marginTop: 10 }}>
          {img && <img src={img} alt="" />}
        </div>
      )}
      {editMode && !!onSubmit && <ImageUploadForm aspect={1} onSubmit={submitHandler} />}
    </ModalWindow>
  );
};

type AvatarButtonsPropsType = {
  onZoomClick?: () => void
}
const AvatarButton: React.FC<AvatarButtonsPropsType> = ({
  onZoomClick,
}) => (
  <button type="button" className={classes.buttons} onClick={onZoomClick}>
    <div className={classes.icon}>
      <ZoomIn color="white" size={20} />
    </div>
  </button>
);

type PropsType = {
  smallImg?: string | null
  largeImg?: string | null
  size?: number
  name?: string
  border?: boolean
  shadow?: boolean
  online?: boolean
  onEdit?: (image: File, cropArea: Area) => void
}

export const Avatar: React.FC<PropsType> = ({
  smallImg,
  largeImg,
  size = 90,
  name,
  online,
  border = false,
  shadow = false,
  onEdit,
}) => {
  const zoomable = !!(smallImg && largeImg);
  const editable = !!onEdit;

  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    setModalActive(false);
  }, []);
  const openModal = () => setModalActive(true);
  const closeModal = () => setModalActive(false);

  return (
    <div
      className={classnames(
        classes.wrapper,
        { [classes.border]: border },
        { [classes.shadow]: shadow },
      )}
      style={{ width: size }}
    >

      <div className={classes.image} style={{ width: size, height: size }}>
        {(editable || zoomable) && (
          <AvatarButton
            onZoomClick={openModal}
          />
        )}

        <div className={classes.photo}>
          <img src={smallImg || defaultAvatarImage} alt="avatar" />
        </div>

        {online && <div className={classes.onLineIndicator} />}
      </div>

      {name && <div className={classes.name}>{name}</div>}

      <AvatarModalWindow
        img={largeImg}
        open={modalActive}
        openInEditMode={!smallImg}
        onClose={closeModal}
        onSubmit={onEdit}
      />
    </div>
  );
};
