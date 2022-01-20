import classes from './ProfileCoverImage.module.scss'
import Button from '../../../common/Button/Button'
import editCoverImageIcon from '../../../../assets/images/edit-cover-image-icon.svg'
import defaultCoverImage from '../../../../assets/images/cover-default.jpg'
import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup'
import ImageUploadForm from '../../../ImageUploadForm/ImageUploadForm'
import {Area} from 'react-easy-crop/types'

type PropsTypes = {
    img: string | null
    owner?: boolean
    onCoverImageSubmit: (image: File, cropArea: Area) => void
}

const ProfileCoverImage: React.FC<PropsTypes> = ({
                                                     img = defaultCoverImage,
                                                     owner = false,
                                                     onCoverImageSubmit
                                                 }) => {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setOpen(false)
    }, [img])
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <div className={classes.coverImage}>
            <div className={classes.editCoverImageButton}>
                {owner && <Button icon={editCoverImageIcon} caption="Edit Cover Image" variant="neutral" onClick={openModal}/>}
            </div>
            <Popup open={open} modal nested onClose={closeModal} contentStyle={{borderRadius: 5, padding: '20px'}} closeOnDocumentClick={false}>
                <ImageUploadForm aspect={7 / 2} onSubmit={onCoverImageSubmit} closeModal={closeModal} />
            </Popup>
            <img className={classes.image} src={img ? img : defaultCoverImage} alt={''}/>
        </div>
    )
}

export default ProfileCoverImage