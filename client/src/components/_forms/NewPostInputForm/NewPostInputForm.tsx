import React from 'react'
import {Image} from 'react-bootstrap-icons'
import {NewPostType} from 'types/types'
import classes from './NewPostInputForm.module.scss'
import {Card} from 'components/_shared/Card/Card'
import {Button} from 'components/_shared/Button/Button'
import {Form} from 'components/_shared/Form/Form'
import {InputTextarea} from 'components/_shared/Input/InputTextarea/InputTextarea'

type PropsType = {
    isAddPostPending: boolean
    onSubmit: (newPostData: NewPostType) => void
}

const NewPostInputForm: React.FC<PropsType> = ({isAddPostPending, onSubmit}) => {
    const submit = (data: NewPostType) => {
        onSubmit(data)
        // reset()
    }

    const onAttachFileButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('Attach file button clicked')
    }

    return (
        <Card>
            <Form onSubmit={onSubmit} initialValues={{newPostText: ''}}>
                <InputTextarea name={'newPostText'}/>
                <div className={classes.controls}>
                    <Button onClick={onAttachFileButtonClick} type="text" size="sm">
                        <Button.Icon><Image color={'#909BA4'} size={18}/></Button.Icon>
                    </Button>
                    <Button type="primary" size="sm" spinner={isAddPostPending}>
                        <Button.Text>Send</Button.Text>
                    </Button>
                </div>
            </Form>
        </Card>
    )
}

export default NewPostInputForm