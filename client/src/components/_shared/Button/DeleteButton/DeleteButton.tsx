import React, {useState} from 'react'
import {Button} from 'components/_shared/Button/Button'
import {TrashFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import {ConfirmPopup} from 'components/_shared/ConfirmPopup/ConfirmPopup'

type DeleteButtonType = {
    disabled?: boolean
    warningMessage?: string
    onDelete: () => void
}
export const DeleteButton: React.FC<DeleteButtonType> = ({onDelete, warningMessage, disabled= false}) => {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return <Button onClick={warningMessage ? openModal : onDelete} type="text" size="sm" disabled={disabled}>
            <Button.Icon>
                <TrashFill color={colors.textMid} size={16}/>
            </Button.Icon>
            <ConfirmPopup
                open={open}
                onConfirm={onDelete}
                onDecline={closeModal}
                important
            >
                {warningMessage}
            </ConfirmPopup>
        </Button>

}
