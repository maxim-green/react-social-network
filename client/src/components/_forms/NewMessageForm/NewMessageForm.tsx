import classes from './NewMessageForm.module.scss'
import React from "react";
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputTextarea} from 'components/_shared/Input/InputTextarea/InputTextarea'

type PropsType = {
    onSubmit: (message: string) => void
}

const NewMessageForm: React.FC<PropsType> = ({onSubmit}) => {

    const submit = (data: { newMessageInput: string }) => {
        onSubmit(data.newMessageInput)
    }

    return (
        <Form onSubmit={submit} initialValues={{newMessageInput: ``.trim()}} resetAfterSubmit={true} submitOnEnter={true}>
            <FormRow>
                <InputTextarea name={'newMessageInput'}/>
                <div className={classes.button}>
                    <Button>Send</Button>
                </div>
            </FormRow>
        </Form>
    )
}

export default NewMessageForm