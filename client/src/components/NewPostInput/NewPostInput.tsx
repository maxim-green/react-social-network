import Button from "../common/Button/Button";
import attachFileIcon from "../../assets/images/attach-file-icon.svg";
import React from "react";
import classes from "./NewPostInput.module.scss"
import Form from '../forms/Form/Form'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import Card from '../common/Card/Card'
import {NewPostType} from '../../types/types'
import Spinner from '../common/Spinner/Spinner'

type NativePropsType = {isAddPostPending: boolean}

type PropsType = InjectedFormProps<NewPostType, NativePropsType> & NativePropsType


const NewPostInput: React.FC<PropsType> = (props) => {
    const onAttachFileButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
    }
    return (
        <Card>
            <Form onSubmit={props.handleSubmit}>
                <div className={classes.input}>
                    <Field name={'newPostText'} cols={30} rows={2} placeholder="Say what is on your mind..." component='textarea'/>
                </div>
                <div className={classes.controls}>
                    <Button onClick={onAttachFileButtonClick} icon={attachFileIcon} variant="text" size="sm"/>
                    <button className={classes.button} disabled={props.isAddPostPending}>
                        {!props.isAddPostPending && 'Send'}
                        {props.isAddPostPending && <Spinner/>}
                    </button>
                </div>
            </Form>
        </Card>
    )
}

export default reduxForm<NewPostType, NativePropsType>({
    form: 'newPostForm'
})(NewPostInput)