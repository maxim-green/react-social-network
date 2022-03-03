import React from 'react'
import {login} from 'redux/reducers/auth.reducer'
import {LoginDataType} from 'api/auth.api'
import {useDispatch} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from 'redux/store'
import {AuthActionType} from 'redux/reducers/auth.reducer'
import Form from 'components/_shared/Form/Form'
import {useForm} from 'react-hook-form'
import {Button} from 'components/_shared/Button/Button'
import {CForm, CFormRow, InputText, InputPassword, Checkbox} from 'components/_shared/CForm/CForm'

type PropsType = {
    onSubmit: (loginFormData: LoginDataType) => void
}

const LoginForm: React.FC<PropsType> = ({onSubmit}) => {
    return (
        <CForm onSubmit={onSubmit}>
            <CFormRow>
                <InputText name={'email'} label={'E-mail'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputPassword name={'password'} label={'Password'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <Checkbox name={'rememberMe'} label={'Remember me'}/>
            </CFormRow>
            <CFormRow>
                <Button type='primary' size='large'>
                    <Button.Text>Log in</Button.Text>
                </Button>
            </CFormRow>
        </CForm>
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
