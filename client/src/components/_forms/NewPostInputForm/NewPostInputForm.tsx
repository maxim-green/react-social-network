import React from 'react'
import {Image} from 'react-bootstrap-icons'
import {NewPostType} from 'types/types'
import classes from './NewPostInputForm.module.scss'
import {Card} from 'components/_shared/Card/Card'
import {Button} from 'components/_shared/Button/Button'
import {Form} from 'components/_shared/Form/Form'
import {InputTextarea} from 'components/_shared/Input/InputTextarea/InputTextarea'
import {addPost} from 'store/reducers/posts.reducer'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store/store'

type PropsType = {
}

const NewPostInputForm: React.FC<PropsType> = () => {
    const isAddPostPending = useSelector((state: RootState) => state.posts.isAddPostPending)

    const dispatch = useDispatch()
    const onAttachFileButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('Attach file button clicked')
    }

    const onNewPostSubmit = (newPostData: NewPostType) => {
        const {newPostText} = newPostData
        dispatch(addPost(newPostText))
    }

    return (
        <Card>
            <Form onSubmit={onNewPostSubmit} initialValues={{newPostText: ''}} resetAfterSubmit={true}>
                <InputTextarea name={'newPostText'} placeholder={'Share your thoughts and feelings!'}/>
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
