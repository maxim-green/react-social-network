import React, {useEffect, useState} from 'react'
import classes from './ProfileCoverImage.module.scss'
import Popup from 'reactjs-popup'
import {Area} from 'react-easy-crop/types'
import {CameraFill} from 'react-bootstrap-icons'
import defaultCoverImage from 'assets/images/cover-default.jpg'
import ImageUploadForm from 'components/_forms/ImageUploadForm/ImageUploadForm'
import {Button} from 'components/_shared/Button/Button'

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
                {owner && <Button type="neutral" onClick={openModal} size={"small"}>
                    <Button.Icon><CameraFill width={15} height={15}/></Button.Icon>
                    <Button.Text>Edit Cover Image</Button.Text>
                </Button>}
            </div>
            <Popup open={open} modal nested onClose={closeModal} contentStyle={{borderRadius: 5, padding: '20px'}} closeOnDocumentClick={false}>
                <ImageUploadForm aspect={7 / 2} onSubmit={onCoverImageSubmit} closeModal={closeModal} />
            </Popup>
            <img className={classes.image} src={img ? img : defaultCoverImage} alt={''}/>
        </div>
    )
}

export default ProfileCoverImage