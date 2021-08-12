import React from 'react'
import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import Form from "../../../common/Form/Form";
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {email, minLength6, required} from "../../../../utils/validators";
import {RegistrationDataType} from '../../../../types/types'

type NativePropsType = {
    registrationSuccessful: boolean
}
type PropsType = InjectedFormProps<RegistrationDataType, NativePropsType> & NativePropsType

const RegistrationForm: React.FC<PropsType> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            {props.error && <Form.Error>{props.error}</Form.Error>}
            {props.registrationSuccessful && <Form.Success>Registration successful.</Form.Success>}
            <Form.Row>
                <Field name="firstName" type="text" component={Input} label="First name" placeholder="First name" validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="lastName" type="text" component={Input} label="Last name" placeholder="Last name" validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="username" type="text" component={Input} label="User name" placeholder="User name" validate={[required, minLength6]} block/>
            </Form.Row>
            <Form.Row>
                <Field name="email" type="text" component={Input} label="E-mail" placeholder="E-mail" validate={[required, email]} block/>
            </Form.Row>
            <Form.Row>
                <Field name="password" type="password" component={Input} label="Password" placeholder="Password" validate={[required, minLength6]} block/>
            </Form.Row>
            <Form.Row>
                <Button caption="Register" size="lg"/>
            </Form.Row>
        </Form>
    )
}

export default reduxForm<RegistrationDataType, NativePropsType>({
    form: 'registration'
})(RegistrationForm)