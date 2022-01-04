import {Image} from 'react-bootstrap-icons'
import React from "react";
import classes from "./NewPostInput.module.scss"
import Form, {Button} from '../forms/Form/Form'
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
                <div className={classes.input}>
                    <textarea {...register('newPostText')} cols={30} rows={2} placeholder={'Write your post here'}/>
                </div>
                <div className={classes.controls}>
                    <Button onClick={onAttachFileButtonClick} type="text" size="small"><Image color={'#909BA4'} size={18}/></Button>
                    {!isAddPostPending && <Button type="text" size="small" disabled={isAddPostPending}>
                        Post
                    </Button>}
                    {isAddPostPending && <Spinner/>}
                </div>
            </Form>
        </Card>
    )
}

export default NewPostInput