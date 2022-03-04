import classes from './NewMessageForm.module.scss'
import React from "react";
import {Button} from 'components/_shared/Button/Button'
import {CForm, CFormRow, InputTextarea} from 'components/_shared/CForm/CForm'

type PropsType = {
    onSubmit: (message: string) => void
}

const NewMessageForm: React.FC<PropsType> = ({onSubmit}) => {

    const submit = (data: { newMessageInput: string }) => {
        onSubmit(data.newMessageInput)
    }

    return (
        <CForm onSubmit={submit} initialValues={{newMessageInput: ''}} resetAfterSubmit={true}>
            <CFormRow>
                <InputTextarea name={'newMessageInput'} />
                <div className={classes.button}>
                    <Button>Send</Button>
                </div>
            </CFormRow>
        </CForm>
    )
}

export default NewMessageForm