import React from 'react'
import Form from '../_shared/Form/Form'
import {EditProfileDataType} from '../../api/profile.api'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {useAuthCheck} from '../../utils/hooks'
import {ThunkDispatch} from 'redux-thunk'
import {ProfileActionType, updateProfile} from '../../redux/reducers/profile.reducer'
import {Controller, useForm} from "react-hook-form";
import Spinner from "../_shared/Spinner/Spinner";
import {Input} from '../_shared/Input/Input'
import {InputDate} from '../_shared/Input/InputDate'
import Button from '../_shared/Button/Button'

type PropsType = {
    initialValues: EditProfileDataType
    onSubmit: (profileData: EditProfileDataType) => void
    closeModal?: () => void
}

const EditProfileForm: React.FC<PropsType> = ({initialValues, onSubmit, closeModal}) => {
    const {control, register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        ...initialValues,
            birthDate: initialValues.birthDate
        }})

    const submit = (data: EditProfileDataType) => {
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
    const editProfileData: EditProfileDataType = useSelector((state: StateType) => ({
        firstName: state.profile.user?.firstName,
        lastName: state.profile.user?.lastName,
        birthDate: state.profile.user?.birthDate,
        bio: state.profile.user?.bio,
        location: state.profile.user?.location,
        contacts: state.profile.user?.contacts
    }))
    const dispatch: ThunkDispatch<StateType, EditProfileDataType, ProfileActionType> = useDispatch()

    useAuthCheck()

    const onSubmit = (profileData: EditProfileDataType) => {
        console.log(profileData)
        dispatch(updateProfile(profileData))
    }

    if (!editProfileData) return <Spinner />

    return <EditProfileForm
        closeModal={closeModal}
        initialValues={editProfileData}
        onSubmit={onSubmit}
    />
}

export default EditProfileFormContainer