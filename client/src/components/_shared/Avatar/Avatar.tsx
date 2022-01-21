import classes from './Avatar.module.scss'
import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import editIconWhite from '../../../assets/images/edit-icon-white.svg'
import Popup from 'reactjs-popup'
import defaultAvatarImage from '../../../assets/images/avatar-default.jpg'
import {Area} from 'react-easy-crop/types'
import ImageUploadForm from '../../_forms/ImageUploadForm/ImageUploadForm'

type PropsType = {
    img?: string | null
    size?: 'sm' | 'md' | 'lg' | 'xs'
    name?: string
    contextBgColor?: string
    owner?: boolean
    online?: boolean
    onSubmit?: (image: File, cropArea: Area) => void
}

const Avatar: React.FC<PropsType> = ({
                                         img,
                                         size = 'md',
                                         name,
                                         contextBgColor = 'white',
                                         owner,
                                         online,
                                         onSubmit
                                     }) => {

    // close modal with file-selection if avatar changed
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(false)
    }, [img])
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (

        <div className={
            classnames(
                classes.avatar,
                {[classes.sm]: size === 'sm'},
                {[classes.md]: size === 'md'},
                {[classes.lg]: size === 'lg'},
                {[classes.xs]: size === 'xs'},
                {[classes.editable]: onSubmit}
            )
        }>

            {onSubmit && owner && <div>
                <button className={classes.editButton} onClick={openModal}><img src={editIconWhite} alt=""/></button>
                <Popup open={open} modal nested onClose={closeModal} contentStyle={{borderRadius: 5, padding: '20px'}}
                       closeOnDocumentClick={false}>
                    <ImageUploadForm aspect={1 / 1} onSubmit={onSubmit} closeModal={closeModal}/>
                </Popup>
            </div>}

            <div className={classes.image}>
                <img  src={img || defaultAvatarImage} alt="avatar"
                     style={{borderColor: contextBgColor || 'white'}}/>
                {online &&
                <div className={classes.onLineIndicator} style={{borderColor: contextBgColor || 'white'}}/>}
            </div>

            {name && <div className={classes.name}>{name}</div>}
        </div>


    )
}


export default Avatar