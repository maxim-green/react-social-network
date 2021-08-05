import React from 'react'
import {NavLink} from "react-router-dom";
import Input from "../../../common/Input/Input";
import Checkbox from "../../../common/Checkbox/Checkbox";
import Button from "../../../common/Button/Button";
import Form from "../../../common/Form/Form";
import {Field, reduxForm} from "redux-form";
import {email, minLength6, required} from "../../../../utils/validators";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            {props.error && <Form.Error>{props.error}</Form.Error>}
            <Form.Row>
                <Field name="email" type="text" label="E-mail" placeholder="example@email.ru" validate={[required, email]} component={Input} block/>
            </Form.Row>
            <Form.Row>
                <Field name="password" type="password" label="Password" placeholder="4h*J7NQTr1" validate={[required, minLength6]} component={Input} block/>
            </Form.Row>
            <Form.Row>
                <Form.Item>
                    <Field name="rememberMe" label="Remember me" component={Checkbox}/>
                </Form.Item>
            </Form.Row>
            <Form.Row>
                <Form.Item>
                    <Button caption="Login" size="lg"/>
                </Form.Item>
                <Form.Item>
                    <NavLink to=""><Button variant="text" caption="Forgot password?" size="lg"/></NavLink>
                </Form.Item>
            </Form.Row>
        </Form>
    )
}

export default reduxForm({
    form: 'login'
})(LoginForm)