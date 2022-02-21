import React, {useEffect, useState} from 'react'
import classes from './Avatar.module.scss'
import classnames from 'classnames'
import editIconWhite from 'assets/images/edit-icon-white.svg'
import Popup from 'reactjs-popup'
import defaultAvatarImage from 'assets/images/avatar-default.jpg'
import {Area} from 'react-easy-crop/types'
import ImageUploadForm from 'components/_forms/ImageUploadForm/ImageUploadForm'
import Button from 'components/_shared/Button/Button'
import {PencilFill, ZoomIn} from 'react-bootstrap-icons'

type PropsType = {
    img?: string | null
    size?: number
    name?: string
    border?: boolean
    owner?: boolean
    online?: boolean
    onSubmit?: (image: File, cropArea: Area) => void
}

const Avatar: React.FC<PropsType> = ({
                                         img,
                                         size = 90,
                                         name,
                                         owner,
                                         online,
                                         onSubmit,
                                         border = false
                                     }) => {
    const [open, setOpen] = useState(false)

    // close modal with file-selection if avatar changed
    useEffect(() => {
        setOpen(false)
    }, [img])

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <div
            className={classnames(
                classes.wrapper,
                {[classes.editable]: onSubmit},
                {[classes.border]: border}
            )}
            style={{width: size}}
        >

            <div className={classes.image} style={{width: size, height: size}}>

                {onSubmit && owner && <div className={classes.buttons}>
                    <button>
                        <Button.Icon><ZoomIn width={22} height={22} color={'white'}/></Button.Icon>
                    </button>
                    <button onClick={openModal}>
                        <Button.Icon><PencilFill width={22} height={22} color={'white'}/></Button.Icon>
                    </button>
                </div>}

                <div className={classes.photo}>
                    <img src={img || defaultAvatarImage} alt="avatar"/>
                </div>

                {online && <div className={classes.onLineIndicator}/>}
            </div>

            {name && <div className={classes.name}>{name}</div>}

            {onSubmit && owner && <Popup open={open} modal nested onClose={closeModal}
                                         contentStyle={{borderRadius: 5, padding: '20px'}}
                                         closeOnDocumentClick={false}>
                <ImageUploadForm aspect={1 / 1} onSubmit={onSubmit} closeModal={closeModal}/>
            </Popup>}
        </div>
    )
}


export default Avatar