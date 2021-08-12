import classes from './Avatar.module.scss'
import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import editIconWhite from '../../../assets/images/edit-icon-white.svg'
import Popup from 'reactjs-popup'
import defaultAvatarImage from '../../../assets/images/avatar-default.jpg'
import EditAvatarForm from './EditAvatarForm/EditAvatarForm'

type PropsType = {
    img: string | null
    size?: 'sm' | 'md' | 'lg'
    contextBgColor?: string
    owner?: boolean
    online?: boolean
    onSubmit?: any // todo it seems like redux-form types needs to be used
}

const Avatar: React.FC<PropsType> = ({
                                         img,
                                         size = 'md',
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
                {[classes.editable]: onSubmit}
            )
        }>

            {onSubmit && owner && <div>
                <button className={classes.editButton} onClick={openModal}><img src={editIconWhite} alt=""/></button>
                <Popup open={open} modal nested onClose={closeModal}>
                    <EditAvatarForm onSubmit={onSubmit}/>
                </Popup>
            </div>}

            <img className={classes.image} src={img || defaultAvatarImage} alt="avatar"
                 style={{borderColor: contextBgColor || 'white'}}/>

            {online &&
            <div className={classes.onLineIndicator} style={{borderColor: contextBgColor || 'white'}}/>}

        </div>
    )
}


export default Avatar