import React from 'react'
import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import Form from "../../../common/Form/Form";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators";
import {useHistory} from 'react-router-dom'
import ProfileInfoItem from "../../ProfilePage/ProfileInfo/ProfileInfoItem/ProfileInfoItem";

const EditProfileForm = (props) => {
    const {contacts} = props.initialValues

    const history = useHistory()

    const submitHandler = (e) => {
        props.handleSubmit(e)
        history.goBack()
    }

    const backButtonClickHandler = (e) => {
        e.preventDefault()
        history.goBack()
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Title>
                General
            </Form.Title>
            <Form.Row>
                <Field name="firstName" type="text" component={Input} label="First name" placeholder="First name" validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="lastName" type="text" component={Input} label="Last name" placeholder="Last name" validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="birthDate" type="text" component={Input} label="Birth date" placeholder="Birth date" block/>
            </Form.Row>
            <Form.Row>
                <Form.Item><Field name="location.country" type="text" component={Input} label="Country" placeholder="Country" block/></Form.Item>
                <Form.Item><Field name="location.city" type="text" component={Input} label="City" placeholder="City" block/></Form.Item>
            </Form.Row>
            <Form.Row>
                <Field name="bio" type="text" component={Input} label="Bio" placeholder="Bio" block/>
            </Form.Row>
            <Form.Row>
                <Field name="interests" type="text" component={Input} label="Interests" placeholder="Interests" block/>
            </Form.Row>
            <Form.Title>
                Contacts
            </Form.Title>
            {
                Object.keys(contacts).map(key => {
                    const title = key.charAt(0).toUpperCase() + key.slice(1) + ":"
                    return <Form.Row>
                        <Field name={"contacts." + key} type="text" component={Input} label={title} placeholder={title} block/>
                    </Form.Row>
                })
            }
            <Form.Row>
                <Field name="contacts.website" type="text" component={Input} label="Website" placeholder="Website" block/>
            </Form.Row>
            <Form.Row>
                <Field name="contacts.phone" type="text" component={Input} label="Phone" placeholder="Phone" block/>
            </Form.Row>
            <Form.Row>
                <Form.Item>
                    <Button caption="Save" size="lg"/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={backButtonClickHandler} caption="Back" size="lg"/>
                </Form.Item>
            </Form.Row>
        </Form>
    )
}

export default reduxForm({
    form: 'editProfile'
})(EditProfileForm)