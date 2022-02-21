import classes from './ProfileHeader.module.scss'
import Avatar from '../../../_shared/Avatar/Avatar'
import React, {useEffect, useState} from 'react'
import {AvatarType} from '../../../../types/types'
import {Area} from 'react-easy-crop/types'
import EditStatusForm from '../../../_forms/EditStatusForm'
import Popup from 'reactjs-popup'
import EditProfileForm from '../../../_forms/EditProfileForm'
import {PencilFill} from 'react-bootstrap-icons'
import Button from '../../../_shared/Button/Button'

type PropsType = {
    owner?: boolean
    firstName: string,
    lastName: string,
    status: string | null,
    avatar: AvatarType
    onAvatarSubmit?: (image: File, cropArea: Area) => void
    onStatusUpdate: (status: string) => void
}

const ProfileHeader: React.FC<PropsType> = ({
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

    const statusClickHandler = () => {
        setStatusEditMode(true)
    }
    const statusBlurHandler = () => {
        setStatusEditMode(false)
        onStatusUpdate(statusValue)
    }
    const statusEnterHandler = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            setStatusEditMode(false)
            onStatusUpdate(statusValue)
        }
    }
    const onStatusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusValue(e.target.value || '')
    }

    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <div className={classes.profileHeader}>
            <div className={classes.avatar}>
                <Avatar img={avatar?.small} border size={128} owner={owner} onSubmit={onAvatarSubmit}/>
            </div>
            <div className={classes.profileHeaderInfo}>
                <div className={classes.name}>
                    {firstName} {lastName}
                    <span style={{backgroundColor: 'limegreen', fontSize: 12, padding: '2px 6px', marginLeft: 8}}>online</span>
                </div>
                {owner && <div className={classes.status}>
                    {!statusEditMode && <div className={classes.statusText} onDoubleClick={statusClickHandler}>{statusValue}</div>}
                    {statusEditMode && <div className={classes.editStatus}>
                        <EditStatusForm value={statusValue} onChange={onStatusChangeHandler} onBlur={statusBlurHandler} onEnter={statusEnterHandler}/>
                    </div>}
                </div>}
                {!owner && <div className={classes.status}>{status}</div>}
            </div>
            <div className={classes.editProfile}>
                {owner && <div>
                    <Button type="secondary" onClick={openModal} size={"small"}>
                        <Button.Icon><PencilFill width={12} height={12}/></Button.Icon>
                        <Button.Text>Edit profile</Button.Text>
                    </Button>
                    <Popup open={open} modal nested onClose={closeModal} contentStyle={{borderRadius: 5, padding: '20px'}} closeOnDocumentClick={false}>
                        <EditProfileForm closeModal={closeModal}/>
                    </Popup>
                </div>
                }
            </div>

        </div>
    )
}

export default ProfileHeader