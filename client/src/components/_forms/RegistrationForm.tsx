import React, {useEffect} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {authActions, AuthActionType, register} from 'redux/reducers/auth.reducer'
import {RegistrationDataType} from 'api/auth.api'
import {Button} from 'components/_shared/Button/Button'
import {CForm, CFormRow, InputText, InputPassword} from 'components/_shared/CForm/CForm'

type PropsType = {
    registrationSuccessful: boolean
    onSubmit: (formData: RegistrationDataType) => void
}

const RegistrationForm: React.FC<PropsType> = ({registrationSuccessful, onSubmit}) => {
    return (
        <CForm onSubmit={onSubmit}>
            {registrationSuccessful && <div>Registration successful.</div>}
            <CFormRow>
                <InputText name={'firstName'} label={'First name'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'lastName'} label={'Last name'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'username'} label={'Username'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'email'} label={'E-mail name'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputPassword name={'password'} label={'Password'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <Button size="large">
                    <Button.Text>Register</Button.Text>
                </Button>
            </CFormRow>
        </CForm>
    )
}

const {setRegistrationSuccessful} = authActions
const RegistrationFormContainer: React.FC = () => {
    const registrationSuccessful = useSelector((state: StateType) => state.auth.registrationSuccessful)
    const dispatch: ThunkDispatch<StateType, RegistrationDataType | boolean, AuthActionType> = useDispatch()

    const onSubmit = async (registrationFormData: RegistrationDataType) => {
        dispatch(register(registrationFormData))
    }

    useEffect(() => {
        dispatch(setRegistrationSuccessful(false))
    }, [dispatch])

    return <RegistrationForm
        onSubmit={onSubmit}
        registrationSuccessful={registrationSuccessful}
    />
}

export default RegistrationFormContainer
