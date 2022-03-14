import React, {useEffect, useState} from 'react'
import classes from './ProfileCoverImage.module.scss'
import Popup from 'reactjs-popup'
import {Area} from 'react-easy-crop/types'
import {CameraFill} from 'react-bootstrap-icons'
import defaultCoverImage from 'assets/images/cover-default.jpg'
import {Button} from 'components/_shared/Button/Button'
import ImageUploadForm from 'components/_forms/ImageUploadForm/ImageUploadForm'
import {ModalWindow} from 'components/_shared/ModalWindow/ModalWindow'
import {useBreakpoint} from 'utils/hooks'

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
    const {tablet} = useBreakpoint()

    useEffect(() => {
        setOpen(false)
    }, [img])
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <div className={classes.coverImage}>
            <div className={classes.editCoverImageButton}>
                {owner && <Button type="neutral" onClick={openModal} size={!tablet ? 'small' : 'large'}>
                    <Button.Icon><CameraFill width={!tablet ? 15 : 20} height={!tablet ? 15 : 20}/></Button.Icon>
                    {!tablet && <Button.Text>Edit Cover Image</Button.Text>}
                </Button>}
            </div>
            <ModalWindow open={open}>
                <ImageUploadForm aspect={7 / 2} onSubmit={onCoverImageSubmit} closeModal={closeModal}/>
            </ModalWindow>
            <img className={classes.image} src={img ? img : defaultCoverImage} alt={''}/>
        </div>
    )
}

export default ProfileCoverImage