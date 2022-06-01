import React, {useEffect, useState} from 'react'
import {Area} from 'react-easy-crop/types'
import Popup from 'reactjs-popup'
import sizes from 'assets/styles/sizes.module.scss'
import classes from 'components/Profile/ProfileHeader/ProfileHeader.module.scss'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {AvatarType} from 'types/types'
import EditStatusForm from 'components/_forms/EditStatusForm'
import EditProfileForm from 'components/_forms/EditProfileForm'
import {PencilFill} from 'react-bootstrap-icons'
import {Button} from 'components/_shared/Button/Button'
import {OnlineIndicator} from 'components/_shared/OnlineIndicator/OnlineIndicator'
import {useBreakpoint} from '../../../hooks/useBreakpoint'

type PropsType = {
    online?: boolean
    owner?: boolean
    firstName: string,
    lastName: string,
    status: string | null,
    avatar: AvatarType
    onAvatarSubmit?: (image: File, cropArea: Area) => void
    onStatusUpdate: (status: string) => void
}

const ProfileHeader: React.FC<PropsType> = ({
    online= false,
                                                owner = false,
                                                firstName,
                                                lastName,
                                                status,
                                                avatar,
                                                onAvatarSubmit,
                                                onStatusUpdate
                                            }) => {
    const [statusEditMode, setStatusEditMode] = useState<boolean>(false)
    const [statusValue, setStatusValue] = useState<string>(status || 'What is your status?')
    useEffect(() => {
        setStatusValue(status || 'What is your status?')
    }, [status])


    const statusSubmitHandler = (data: {status: string}) => {
        onStatusUpdate(data.status)
        setStatusEditMode(false)
    }
    const statusClickHandler = () => {
        setStatusEditMode(true)
    }

    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const {tablet, phoneTablet} = useBreakpoint()

    return (
        <div className={classes.profileHeader}>
            <div className={classes.avatar}>
                <button>
                    <Avatar
                        smallImg={avatar?.small}
                        largeImg={avatar?.large}
                        border shadow size={!phoneTablet ? Number.parseInt(sizes.avatarProfile) : Number.parseInt(sizes.avatarProfilePhoneTablet)}
                        onEdit={owner ? onAvatarSubmit : undefined }
                    />
                </button>
                {online && <div className={classes.onlineIndicator}>
                    <OnlineIndicator>Online</OnlineIndicator>
                </div>}
            </div>
            <div className={classes.profileHeaderInfo}>
                <div className={classes.name}>
                    {firstName} {lastName}
                </div>
                {owner && <div className={classes.status}>
                    <div className={classes.statusEditable} onClick={statusClickHandler}>{statusValue}</div>
                    {statusEditMode && <div className={classes.editStatus}>
                        <EditStatusForm onSubmit={statusSubmitHandler} initialStatus={statusValue}/>
                    </div>}
                </div>}
                {!owner && <div className={classes.status}>{status}</div>}
            </div>
            <div className={classes.editProfile}>
                {owner && <div>
                    {!tablet && <Button type="secondary" onClick={openModal} size={'sm'}>
                        <Button.Icon><PencilFill width={!tablet ? 15 : 20} height={!tablet ? 15 : 20}/></Button.Icon>
                        <Button.Text>Edit profile</Button.Text>
                    </Button>}
                    {tablet && <Button type="secondary" onClick={openModal} size={'lg'}>
                        <Button.Icon><PencilFill width={!tablet ? 15 : 20} height={!tablet ? 15 : 20}/></Button.Icon>
                    </Button>}
                    <Popup open={open} modal nested  contentStyle={{borderRadius: 5, }} closeOnDocumentClick={false} lockScroll={true}>
                            <EditProfileForm closeModal={closeModal}/>
                    </Popup>
                </div>
                }
            </div>

        </div>
    )
}

export default ProfileHeader
