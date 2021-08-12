import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Form from "../../Form/Form";
import FilePicker from "../../FilePicker/FilePicker";
import Button from "../../Button/Button";

type NativePropsType = {

}

type PropsType = InjectedFormProps<{avatar: File}, NativePropsType> & NativePropsType

const EditAvatarForm: React.FC<PropsType> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Row>
                <Field name="avatar" label="Pick file" component={FilePicker}/>
            </Form.Row>
            <Form.Row>
                <Button caption="Save" size="lg"/>
            </Form.Row>
        </Form>
    )
}

export default reduxForm<{avatar: File}, NativePropsType>({
    form: 'uploadAvatar'
})(EditAvatarForm)