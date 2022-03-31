import React from 'react'
import classes from 'components/_forms/AddPostCommentForm/AddPostCommentForm.module.scss'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'
import {NewCommentType} from 'types/types'

type PropsType = {
    avatar?: string | null
    onAddComment: (text: string) => void
}

const AddPostCommentForm: React.FC<PropsType> = ({avatar, onAddComment}) => {
    const submitHandler = (data: NewCommentType) => {
        onAddComment(data.text)
    }

    return <Form onSubmit={submitHandler} initialValues={{text: ''}} resetAfterSubmit={true}>
        <FormRow>
            <div className={classes.avatar}><Avatar smallImg={avatar} size={30}/></div>
            <InputText name={'text'} placeholder={'Write a comment'}/>
            <Button><Button.Text>Add</Button.Text></Button>
        </FormRow>
    </Form>
}

export default AddPostCommentForm