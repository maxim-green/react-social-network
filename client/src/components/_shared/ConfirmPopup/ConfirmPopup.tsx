import Button from '../Button/Button'
import React from 'react'

type ConfirmPopupPropsType = {
    confirmButtonText?: string
    declineButtonText?: string
    onConfirm: () => void
    onDecline: () => void
    important?: boolean
}
const ConfirmPopup: React.FC<ConfirmPopupPropsType> = ({children,
                                                           confirmButtonText = 'Ok',
                                                           declineButtonText = 'Cancel',
                                                           onConfirm,
                                                           onDecline,
    important= false
                                                       }) => {
    return <div>
        <div style={{textAlign: 'center', marginBottom: '20px', fontSize: 18}}>{children}</div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button type={important ? 'cancel' : 'primary'} onClick={onConfirm}>{confirmButtonText}</Button>
            <Button type={important ? 'primary' : 'secondary'} onClick={onDecline}>{declineButtonText}</Button>
        </div>
    </div>
}

export default ConfirmPopup