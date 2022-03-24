import React, {useEffect, useState} from 'react'
import classes from 'components/Profile/ProfileCoverImage/ProfileCoverImage.module.scss'
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

// todo need to figure out how scale cover image preserving aspect-ratio.

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
                {owner && !tablet && <Button type="neutral" onClick={openModal} size={'sm'}>
                    <Button.Icon><CameraFill width={15} height={15}/></Button.Icon>
                    <Button.Text>Edit Cover Image</Button.Text>
                </Button>}
                {owner && tablet && <Button type="neutral" onClick={openModal} size={'lg'}>
                    <Button.Icon><CameraFill width={20} height={20}/></Button.Icon>
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