import React from "react";
import Button from "../Button/Button";
import Form from "../Form/Form";
import FilePicker from "../FilePicker/FilePicker";
import {Field} from "redux-form";

const UploadImageForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Row>
                <Field name={props.name} label="Pick file" component={FilePicker}/>
            </Form.Row>
            <Form.Row>
                <Button caption="Save" size="lg"/>
            </Form.Row>
        </Form>
    )
}

export default UploadImageForm