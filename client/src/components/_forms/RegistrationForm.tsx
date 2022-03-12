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
<<<<<<< HEAD
        // todo fix this ugly any
        <Form onSubmit={handleSubmit(submit as any)}>
            {registrationSuccessful && <div>Registration successful.</div>}
            <Form.Row><Form.Item component={Input} label='First name' {...register('firstName', {required: true})}
                                 error={errors.firstName && {
                                     type: errors.firstName.type,
                                     message: 'This field is required'
                                 }}
                                 required/></Form.Row>
            <Form.Row><Form.Item component={Input} label='Last name' {...register('lastName', {required: true})}
                                 error={errors.lastName && {
                                     type: errors.lastName.type,
                                     message: 'This field is required'
                                 }}
                                 required/></Form.Row>
            <Form.Row><Form.Item component={Input} label='User name' {...register('username', {required: true})}
                                 error={errors.username && {
                                     type: errors.username.type,
                                     message: 'This field is required'
                                 }}
                                 required/></Form.Row>
            <Form.Row><Form.Item component={Input} label='E-mail' {...register('email', {required: true})}
                                 error={errors.email && {type: errors.email.type, message: 'This field is required'}}
                                 required/></Form.Row>
            <Form.Row><Form.Item component={InputPassword} label='Password:' {...register('password', {required: true})}
                                 error={errors.password && {
                                     type: errors.password.type,
                                     message: 'This field is required'
                                 }}
                                 required/></Form.Row>
            <Form.Row>
                <Button size="large"><Button.Text>Register</Button.Text></Button>
            </Form.Row>
=======
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
                <Button size="large">
                    <Button.Text>Register</Button.Text>
                </Button>
            </FormRow>
>>>>>>> 52a7b24a91f5893b374a8a155e48a7bfe397d94c
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
