import {Image} from 'react-bootstrap-icons'
import React from "react";
import classes from "./NewPostInputForm.module.scss"
import Form, {Button} from '../../_shared/Form/Form'
import Card from '../../_shared/Card/Card'
import {NewPostType} from '../../../types/types'
import {useForm} from "react-hook-form";
import {InputTextarea} from '../../_shared/Input/InputTextArea'

type PropsType = {
    isAddPostPending: boolean
    onSubmit: (newPostData: NewPostType) => void
}

// todo implement react-hook-form in this component
const NewPostInputForm: React.FC<PropsType> = ({isAddPostPending, onSubmit}) => {
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
                <div className={classes.input}>
                    <InputTextarea {...register('newPostText')} style={{border: 'none', borderRadius: '5px 5px 0 0'}}/>
                </div>
                <div className={classes.controls}>
                    <Button onClick={onAttachFileButtonClick} type="text" size="small" style={{padding: 5}}><Image color={'#909BA4'} size={18}/></Button>
                    <Button type="primary" size="small" spinner={isAddPostPending}>
                        Post
                    </Button>
                </div>
            </Form>
        </Card>
    )
}

export default NewPostInputForm