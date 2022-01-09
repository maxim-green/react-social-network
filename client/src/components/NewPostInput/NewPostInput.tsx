import {Image} from 'react-bootstrap-icons'
import React from "react";
import classes from "./NewPostInput.module.scss"
import Form, {Button, InputTextarea} from '../forms/Form/Form'
import Card from '../common/Card/Card'
import {NewPostType} from '../../types/types'
import Spinner from '../common/Spinner/Spinner'
import {useForm} from "react-hook-form";

type PropsType = {
    isAddPostPending: boolean
    onSubmit: (newPostData: NewPostType) => void
}

// todo implement react-hook-form in this component
const NewPostInput: React.FC<PropsType> = ({isAddPostPending, onSubmit}) => {
    const {register, handleSubmit} = useForm()

    const submit = (data: NewPostType) => {
        onSubmit(data)
    }

    const onAttachFileButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
    }
    return (
        <Card>
            <Form onSubmit={handleSubmit(submit)}>
                <div style={{padding: '2px'}}>
                    <InputTextarea {...register('newPostText')} />
                </div>
                <div className={classes.controls}>
                    <Button onClick={onAttachFileButtonClick} type="text" size="small"><Image color={'#909BA4'} size={18}/></Button>
                    <Button type="primary" size="small" spinner={isAddPostPending}>
                        Post
                    </Button>
                </div>
            </Form>
        </Card>
    )
}

export default NewPostInput