import React, {useEffect} from 'react'
import {ThunkDispatch} from 'redux-thunk'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {authActions, AuthActionType, register} from 'redux/reducers/auth.reducer'
import {RegistrationDataType} from 'api/auth.api'
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {InputPassword} from 'components/_shared/Input/InputPassword/InputPassword'
import {ServerValidationErrorType} from 'types/types'

type PropsType = {
    registrationErrors: Array<ServerValidationErrorType>
    onSubmit: (formData: RegistrationDataType) => void
}

const RegistrationForm: React.FC<PropsType> = ({registrationErrors, onSubmit}) => {
    return (
        <Form onSubmit={onSubmit} errors={registrationErrors}>
            <FormRow>
                <InputText name={'firstName'} label={'First name'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputText name={'lastName'} label={'Last name'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputText name={'username'} label={'Username'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputText name={'email'} label={'E-mail name'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputPassword name={'password'} label={'Password'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <Button size="lg">
                    <Button.Text>Register</Button.Text>
                </Button>
            </FormRow>
        </Form>
    )
}

const {setRegistrationSuccessful} = authActions
const RegistrationFormContainer: React.FC = () => {
    const registrationErrors = useSelector((state: StateType) => state.auth.registrationErrors)
    const dispatch: ThunkDispatch<StateType, RegistrationDataType | boolean, AuthActionType> = useDispatch()

    const onSubmit = async (registrationFormData: RegistrationDataType) => {
        dispatch(register(registrationFormData))
    }

    useEffect(() => {
        dispatch(setRegistrationSuccessful(false))
    }, [dispatch])

    return <RegistrationForm
        onSubmit={onSubmit}
        registrationErrors={registrationErrors}
    />
}

export default RegistrationFormContainer
