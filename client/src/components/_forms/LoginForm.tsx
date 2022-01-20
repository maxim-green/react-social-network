import React from 'react'
import {login} from '../../redux/reducers/auth.reducer'
import {LoginDataType} from '../../api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from '../../redux/store'
import {AuthActionType} from '../../redux/reducers/auth.reducer'
import Form from "../_shared/Form/Form";
import {Button} from "../_shared/Form/Form";
import {useForm} from "react-hook-form";
import {Input} from '../_shared/Input/Input'
import {InputPassword} from '../_shared/Input/InputPassword'
import {InputCheckbox} from '../_shared/Input/InputCheckbox'

type PropsType = {
    compact?: boolean
    onSubmit: (loginFormData: LoginDataType) => void
}

const LoginForm: React.FC<PropsType> = ({onSubmit, compact = false}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const submit = (formData: LoginDataType) => {
        onSubmit(formData)
    }
    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Row><Form.Item component={Input} label='E-mail:' {...register('email', {required: true})}
                                 error={errors.email && {type: errors.email.type, message: 'This field is required'}} required/></Form.Row>
            <Form.Row><Form.Item component={InputPassword} label='Password:' {...register('password', {required: true})}
                                 error={errors.password && {type: errors.password.type, message: 'This field is required'}} required/></Form.Row>
            <Form.Row><Form.Item component={InputCheckbox} {...register('rememberMe')} label='Remember me'/></Form.Row>
            <Form.Row><Button type='primary' size='large'>Log in</Button></Form.Row>
        </Form>
    )
}


const LoginFormContainer: React.FC<{ compact?: boolean }> = ({compact}) => {
    const dispatch: ThunkDispatch<StateType, LoginDataType, AuthActionType> = useDispatch()

    const onSubmit = (loginFormData: LoginDataType) => {
        dispatch(login(loginFormData))
    }

    return <LoginForm onSubmit={onSubmit} compact={compact}/>
}

export default LoginFormContainer
