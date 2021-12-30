import React from 'react'
import {Form, Input, Checkbox, Button, } from 'antd'
import {login} from '../../redux/reducers/auth.reducer'
import {LoginDataType} from '../../api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from '../../redux/store'
import {AuthActionType} from '../../redux/reducers/auth.reducer'


type PropsType = {
    onSubmit: (loginFormData: LoginDataType) => void
}

type LoginFormFieldsType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: LoginFormFieldsType) => {
        props.onSubmit(formData)
    }

    return (
        <Form onFinish={onSubmit} layout={'vertical'} style={{padding: '28px'}}>
            <Form.Item label='E-mail' name='email' rules={[
                {required: true, message: 'Please input email!'},
                {pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/iu, message: 'Please input correct e-mail!'}
            ]}>
                <Input name={'email'} size={'large'}/>
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[
                {required: true, message: 'Please input password!'},
            ]}>
                <Input.Password size={'large'}/>
            </Form.Item>
            <Form.Item name='rememberMe' valuePropName="checked">
                <Checkbox name={'rememberMe'}>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit' size={'large'} style={{borderRadius: '5px'}}>Log in</Button>
            </Form.Item>
        </Form>
    )
}

const LoginFormContainer: React.FC = () => {
    const dispatch: ThunkDispatch<StateType, LoginDataType, AuthActionType> = useDispatch()

    const onSubmit = (loginFormData: LoginDataType) => {
        dispatch(login(loginFormData))
    }

    return <LoginForm onSubmit={onSubmit}/>
}

export default LoginFormContainer
