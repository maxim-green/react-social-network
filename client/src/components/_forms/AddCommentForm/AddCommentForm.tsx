import React from 'react'
import classes from './AddCommentForm.module.scss'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'

const AddCommentForm = () => {
    return <Form onSubmit={() => {}}>
        <FormRow>
            <div className={classes.avatar}><Avatar smallImg={'https://i.pravatar.cc/300'} size={30}/></div>
            <InputText name={'comment'} placeholder={'Write a comment'}/>
            <Button><Button.Text>Add</Button.Text></Button>
        </FormRow>
    </Form>
}

export default AddCommentForm