import React from 'react'
import {login} from '../../redux/reducers/auth.reducer'
import {LoginDataType} from '../../api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from '../../redux/store'
import {AuthActionType} from '../../redux/reducers/auth.reducer'
import Form, {Checkbox, InputPassword} from "./Form/Form";
import {Input, Button} from "./Form/Form";
import {useForm} from "react-hook-form";

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
            <Form.Item component={Input} label='E-mail:' {...register('email', {required: true})}
                       error={errors.email && {type: errors.email.type, message: 'This field is required'}} required/>
            <Form.Item component={InputPassword} label='Password:' {...register('password', {required: true})}
                       error={errors.password && {type: errors.password.type, message: 'This field is required'}} required/>
            <Form.Item component={Checkbox} {...register('rememberMe')} label='Remember me'/>
            <Button type='primary' size='large'>Log in</Button>
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
