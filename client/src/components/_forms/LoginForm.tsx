import React from 'react'
import {login} from 'redux/reducers/auth.reducer'
import {LoginDataType} from 'api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from 'redux/store'
import {AuthActionType} from 'redux/reducers/auth.reducer'
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {InputPassword} from 'components/_shared/Input/InputPassword/InputPassword'
import {InputCheckbox} from 'components/_shared/Input/InputCheckbox/InputCheckbox'

type PropsType = {
    onSubmit: (loginFormData: LoginDataType) => void
}

const LoginForm: React.FC<PropsType> = ({onSubmit}) => {
    return (
        <Form onSubmit={onSubmit}>
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
