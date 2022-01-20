import React from 'react'
import Form, {Button, Input, InputDate} from './Form/Form'
import {ProfileDataType} from '../../api/profile.api'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {useAuthCheck} from '../../utils/hooks'
import {ThunkDispatch} from 'redux-thunk'
import {ProfileActionType, updateProfile} from '../../redux/reducers/profile.reducer'
import {Controller, useForm} from "react-hook-form";
import Spinner from "../common/Spinner/Spinner";

type PropsType = {
    initialValues: ProfileDataType
    onSubmit: (profileData: ProfileDataType) => void
    closeModal?: () => void
}

const EditProfileForm: React.FC<PropsType> = ({initialValues, onSubmit, closeModal}) => {
    const {control, register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        ...initialValues,
            birthDate: initialValues.birthDate
        }})

    const submit = (data: ProfileDataType) => {
        onSubmit(data)
        closeModal && closeModal()
    }

    const backButtonClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        closeModal && closeModal()
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Row>
                <Button size="medium">Save</Button>
                <div style={{marginLeft: 'auto'}}>
                    <Button onClick={backButtonClickHandler} size="medium" type='cancel'>Cancel</Button>
                </div>
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'First name'} required
                           {...register('firstName', {required: true})}
                           error={errors.firstName && {type: errors.firstName.type, message: 'This field is required'}}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Last name'} required
                           {...register('lastName', {required: true})}
                           error={errors.firstName && {type: errors.firstName.type, message: 'This field is required'}}
                />
            </Form.Row>
            <Form.Row>
                <Controller
                    control={control}
                    name={'birthDate'}
                    render={({field}) => <Form.Item
                        component={InputDate}
                        name={field.name}
                        label={'Birth date'}
                        value={field.value}
                        onChange={field.onChange}
                    />}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Country'}
                           {...register('location.country')}
                />
                <Form.Item component={Input} label={'City'}
                           {...register('location.city')}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Bio'}
                           {...register('bio')}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Website'}
                           {...register('contacts.website')}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Vkontakte'}
                           {...register('contacts.vkontakte')}
                />
            </Form.Row>
            <Form.Row>
                <Form.Item component={Input} label={'Github'}
                           {...register('contacts.github')}
                />
            </Form.Row>

        </Form>
    )
}

const EditProfileFormContainer: React.FC<{closeModal?: () => void}> = ({closeModal}) => {
    const profileData = useSelector((state: StateType) => state.auth.profile)
    const dispatch: ThunkDispatch<StateType, ProfileDataType, ProfileActionType> = useDispatch()

    useAuthCheck()

    const onSubmit = (profileData: ProfileDataType) => {
        console.log(profileData)
        dispatch(updateProfile(profileData))
    }

    if (!profileData) return <Spinner />

    return <EditProfileForm
        closeModal={closeModal}
        initialValues={profileData}
        onSubmit={onSubmit}
    />
}

export default EditProfileFormContainer