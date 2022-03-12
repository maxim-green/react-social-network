import React from 'react'
import {login} from 'redux/reducers/auth.reducer'
import {LoginDataType} from 'api/auth.api'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from 'redux/store'
import {AuthActionType} from 'redux/reducers/auth.reducer'
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {InputPassword} from 'components/_shared/Input/InputPassword/InputPassword'
import {InputCheckbox} from 'components/_shared/Input/InputCheckbox/InputCheckbox'
import {ServerValidationErrorType} from 'types/types'

type PropsType = {
    onSubmit: (loginFormData: LoginDataType) => void
    errors?: Array<ServerValidationErrorType>
}

const LoginForm: React.FC<PropsType> = ({onSubmit, errors}) => {
    return (
<<<<<<< HEAD
        // todo fix this ugly any
        <Form onSubmit={handleSubmit(submit as any)}>
            <Form.Row><Form.Item component={Input} label='E-mail:' {...register('email', {required: true})}
                                 error={errors.email && {type: errors.email.type, message: 'This field is required'}} required/></Form.Row>
            <Form.Row><Form.Item component={InputPassword} label='Password:' {...register('password', {required: true})}
                                 error={errors.password && {type: errors.password.type, message: 'This field is required'}} required/></Form.Row>
            <Form.Row><Form.Item component={InputCheckbox} {...register('rememberMe')} label='Remember me'/></Form.Row>
            <Form.Row><Button type='primary' size='large'><Button.Text>Log in</Button.Text></Button></Form.Row>
=======
        <Form onSubmit={onSubmit} errors={errors}>
            <FormRow>
                <InputText name={'email'} label={'E-mail'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputPassword name={'password'} label={'Password'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputCheckbox name={'rememberMe'} label={'Remember me'}/>
            </FormRow>
            <FormRow>
                <Button type='primary' size='large'>
                    <Button.Text>Log in</Button.Text>
                </Button>
            </FormRow>
>>>>>>> 52a7b24a91f5893b374a8a155e48a7bfe397d94c
        </Form>
    )
}


const LoginFormContainer: React.FC = () => {
    const errors = useSelector((state: StateType) => state.auth.loginErrors)
    const dispatch: ThunkDispatch<StateType, LoginDataType, AuthActionType> = useDispatch()

    const onSubmit = (loginFormData: LoginDataType) => {
        dispatch(login(loginFormData))
    }

    return <LoginForm onSubmit={onSubmit} errors={errors}/>
}

export default LoginFormContainer
