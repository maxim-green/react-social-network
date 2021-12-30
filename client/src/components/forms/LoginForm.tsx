import React from 'react'
import {Form, Input, Checkbox, Button, } from 'antd'
import {login} from '../../redux/reducers/auth.reducer'
import {LoginDataType} from '../../api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from '../../redux/store'
import {AuthActionType} from '../../redux/reducers/auth.reducer'

type PropsType = {
    compact?: boolean
    onSubmit: (loginFormData: LoginDataType) => void
}

type LoginFormFieldsType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<PropsType> = ({onSubmit, compact= false}) => {
    const submitHandler = (formData: LoginFormFieldsType) => {
        onSubmit(formData)
    }

    return (
        <Form onFinish={submitHandler} layout={'vertical'} style={{padding: '28px'}}>
            <Form.Item label='E-mail' name='email' rules={[
                {required: true, message: 'Please input email!'},
                {pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/iu, message: 'Please input correct e-mail!'}
            ]}>
                <Input name={'email'} size={compact ? 'middle' : 'large'}/>
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[
                {required: true, message: 'Please input password!'},
            ]}>
                <Input.Password size={compact ? 'middle' : 'large'}/>
            </Form.Item>
            <Form.Item name='rememberMe' valuePropName="checked">
                <Checkbox name={'rememberMe'}>Remember me</Checkbox>
            </Form.Item>
                <Button type="primary" htmlType='submit' size={compact ? 'middle' : 'large'} style={{borderRadius: '5px'}}>Log in</Button>
        </Form>
    )
}


const LoginFormContainer: React.FC<{compact?: boolean}> = ({compact}) => {
    const dispatch: ThunkDispatch<StateType, LoginDataType, AuthActionType> = useDispatch()

    const onSubmit = (loginFormData: LoginDataType) => {
        dispatch(login(loginFormData))
    }

    return <LoginForm onSubmit={onSubmit} compact={compact}/>
}

export default LoginFormContainer
