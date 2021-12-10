import React from 'react'
import {NavLink} from 'react-router-dom'
import Input from '../common/Input/Input'
import Checkbox from '../common/Checkbox/Checkbox'
import Button from '../common/Button/Button'
import Form from '../common/Form/Form'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {email, minLength6, required} from '../../utils/validators'
import {login} from '../../redux/reducers/auth.reducer'
import {LoginDataType} from '../../api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from '../../redux/store'
import {AuthActionType} from '../../redux/reducers/auth.reducer'

type NativePropsType = {}

type PropsType = InjectedFormProps<LoginDataType, NativePropsType> & NativePropsType

const LoginForm: React.FC<PropsType> = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            {props.error && <Form.Error>{props.error}</Form.Error>}
            <Form.Row>
                <Field name="email" type="text" label="E-mail" placeholder="example@email.ru"
                       validate={[required, email]} component={Input} block/>
            </Form.Row>
            <Form.Row>
                <Field name="password" type="password" label="Password" placeholder="4h*J7NQTr1"
                       validate={[required, minLength6]} component={Input} block/>
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

const LoginReduxForm = reduxForm<LoginDataType, NativePropsType>({
    form: 'login'
})(LoginForm)

const LoginFormContainer: React.FC = () => {
    const dispatch: ThunkDispatch<StateType, any, AuthActionType> = useDispatch()
    
    const onSubmit = (loginFormData: LoginDataType) => {
        dispatch(login(loginFormData))
    }

    return <LoginReduxForm onSubmit={onSubmit}/>
}

export default LoginFormContainer
