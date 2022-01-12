import classes from './NewMessageForm.module.scss'
import React from "react";
import {Button, InputTextarea} from "../forms/Form/Form";
import {useForm} from 'react-hook-form'
import Form from '../forms/Form/Form'

type PropsType = {
    onSubmit: (message: string) => void
}

const NewMessageForm: React.FC<PropsType> = ({onSubmit}) => {
    const defaultValues = {newMessageInput: ''}
    const {register, handleSubmit, reset} = useForm({ defaultValues })

    const submit = (data: { newMessageInput: string }) => {
        onSubmit(data.newMessageInput)
        reset()
    }

    return (
        <Form onSubmit={handleSubmit(submit)} >
            <Form.Row>
                <Form.Item component={InputTextarea} {...register('newMessageInput')}/>
                <div className={classes.button}>
                    <Button>Send</Button>
                </div>
            </Form.Row>
        </Form>
    )
}

export default NewMessageForm