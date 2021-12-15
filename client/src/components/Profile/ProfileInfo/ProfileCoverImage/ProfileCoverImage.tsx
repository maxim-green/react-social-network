import classes from './ProfileCoverImage.module.scss'
import Button from '../../../common/Button/Button'
import editCoverImageIcon from '../../../../assets/images/edit-cover-image-icon.svg'
import defaultCoverImage from '../../../../assets/images/default-cover-image.jpg'
import React from 'react'

type PropsTypes = {
    img?: string
    owner?: boolean
}

const ProfileCoverImage: React.FC<PropsTypes> = ({
                                                     img = defaultCoverImage,
                                                     owner = false
                                                 }) => {
    return (
        <div className={classes.coverImage}
             style={{backgroundImage: `url(${img})`}}>
            <div className={classes.editCoverImageButton}>
                {owner && <Button icon={editCoverImageIcon} caption="Edit Cover Image" variant="neutral"/>}
            </div>
        </div>
    )
}

export default ProfileCoverImage