import React, {useState} from 'react'
import {Button} from 'components/_shared/Button/Button'
import {TrashFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import {ConfirmPopup} from 'components/_shared/ConfirmPopup/ConfirmPopup'

type DeleteButtonType = {
    warningMessage?: string
    onDelete: () => void
}
export const DeleteButton: React.FC<DeleteButtonType> = ({onDelete, warningMessage}) => {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return <div>
        <Button onClick={warningMessage ? openModal : onDelete} type="text" size="sm">
            <Button.Icon>
                <TrashFill color={colors.textMid} size={16}/>
            </Button.Icon>
        </Button>
        <ConfirmPopup
            open={open}
            onConfirm={onDelete}
            onDecline={closeModal}
            important
        >
            {warningMessage}
        </ConfirmPopup>
    </div>
}