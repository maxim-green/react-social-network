import React, {useEffect} from 'react'
import Form from '../_shared/Form/Form'
import {RegistrationDataType} from '../../api/auth.api'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {ThunkDispatch} from 'redux-thunk'
import {authActions, AuthActionType, register} from '../../redux/reducers/auth.reducer'
import {useForm} from 'react-hook-form'
import {Input} from '../_shared/Input/Input'
import {InputPassword} from '../_shared/Input/InputPassword'
import Button from '../_shared/Button/Button'

type PropsType = {
    registrationSuccessful: boolean
    onSubmit: (formData: RegistrationDataType) => void
}

const RegistrationForm: React.FC<PropsType> = ({registrationSuccessful, onSubmit}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const submit = (formData: RegistrationDataType) => {
        onSubmit(formData)
    }
    return (
        <Form onSubmit={handleSubmit(submit)}>
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
                <Button size="large">Register</Button>
            </Form.Row>
        </Form>
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
