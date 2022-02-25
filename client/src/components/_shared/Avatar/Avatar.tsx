import React, {useEffect, useState} from 'react'
import classes from './Avatar.module.scss'
import classnames from 'classnames'
import defaultAvatarImage from 'assets/images/avatar-default.jpg'
import {Area} from 'react-easy-crop/types'
import ImageUploadForm from 'components/_forms/ImageUploadForm/ImageUploadForm'
import {Button} from 'components/_shared/Button/Button'
import {PencilFill, ZoomIn} from 'react-bootstrap-icons'
import {ModalWindow} from 'components/_shared/ModalWindow/ModalWindow'

type PropsType = {
    smallImg?: string | null
    largeImg?: string | null
    size?: number
    name?: string
    border?: boolean
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
                                         onEdit
                                     }) => {
    const zoomable = !!(smallImg && largeImg)
    const editable = !!onEdit

    const [editModalOpened, setEditModalOpened] = useState(false)
    const [zoomModalOpened, setZoomModalOpened] = useState(false)

    useEffect(() => {
        setEditModalOpened(false)
    }, [smallImg])
    const openEditModal = () => setEditModalOpened(true)
    const closeEditModal = () => setEditModalOpened(false)

    useEffect(() => {
        setZoomModalOpened(false)
    }, [])
    const openZoomModal = () => setZoomModalOpened(true)
    const closeZoomModal = () => setZoomModalOpened(false)

    return (
        <div
            className={classnames(
                classes.wrapper,
                {[classes.border]: border}
            )}
            style={{width: size}}
        >

            <div className={classes.image} style={{width: size, height: size}}>

                {(editable || zoomable) && <AvatarButtons
                    onEditClick={editable ? openEditModal : undefined}
                    onZoomClick={zoomable ? openZoomModal : undefined}
                />}

                <div className={classes.photo}>
                    <img src={smallImg || defaultAvatarImage} alt="avatar"/>
                </div>

                {online && <div className={classes.onLineIndicator}/>}
            </div>

            {name && <div className={classes.name}>{name}</div>}

            {editable && onEdit && <EditAvatarModalWindow
                open={editModalOpened}
                onSubmit={onEdit}
                onClose={closeEditModal}
            />}

            {zoomable && largeImg && <ZoomAvatarModalWindow
                img={largeImg}
                open={zoomModalOpened}
                onClose={closeZoomModal}
            />}
        </div>
    )
}



type EditAvatarModalWindowPropsType = {
    open: boolean,
    onSubmit: (image: File, cropArea: Area) => void
    onClose: () => void
}
const EditAvatarModalWindow: React.FC<EditAvatarModalWindowPropsType> = ({
    open,
    onSubmit,
    onClose
                                                                         }) => {
    return (
        <ModalWindow open={open}>
            <ImageUploadForm aspect={1} onSubmit={onSubmit} closeModal={onClose}/>
        </ModalWindow>
    )
}



type ZoomAvatarModalWindowPropsType = {
    img: string,
    open: boolean,
    onClose: () => void
}
const ZoomAvatarModalWindow: React.FC<ZoomAvatarModalWindowPropsType> = ({
    img,
    open,
    onClose
                                                                         }) => {
    return (
        <ModalWindow open={open} close={onClose}>
            {img && <img src={img} alt=""/>}
        </ModalWindow>
    )
}



type AvatarButtonsPropsType = {
    onEditClick?: () => void
    onZoomClick?: () => void
}
const AvatarButtons: React.FC<AvatarButtonsPropsType> = ({
                                                             onEditClick,
                                                             onZoomClick
                                                         }) => {
    return (
        <div className={classes.buttons}>
            {onZoomClick && <Button onClick={onZoomClick} type={'text'} size={'large'} style={{color: 'white'}}>
                <Button.Icon>
                    <ZoomIn color={'white'}/>
                </Button.Icon>
            </Button>}
            {onEditClick && <Button onClick={onEditClick} type={'text'} size={'large'} style={{color: 'white'}}>
                <Button.Icon>
                    <PencilFill color={'white'}/>
                </Button.Icon>
            </Button>}
        </div>
    )
}