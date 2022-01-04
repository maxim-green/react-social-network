import React from 'react'
import Form, {Button, Input} from './Form/Form'
import {useHistory} from 'react-router-dom'
import {ProfileDataType} from '../../api/profile.api'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {useAuthCheck} from '../../utils/hooks'
import {ThunkDispatch} from 'redux-thunk'
import {ProfileActionType, updateProfile} from '../../redux/reducers/profile.reducer'
import {useForm} from "react-hook-form";

type PropsType = {
    initialValues: ProfileDataType
    onSubmit: (profileData: ProfileDataType) => void
}

const EditProfileForm: React.FC<PropsType> = ({initialValues, onSubmit}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const history = useHistory()

    const submit = (data: ProfileDataType) => {
        onSubmit(data)
        history.goBack()
    }

    const backButtonClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        history.goBack()
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
                <Form.Item component={Input} label={'Birth date'}
                           {...register('birthDate')}
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

const EditProfileFormContainer: React.FC = () => {
    const profileData = useSelector((state: StateType) => state.profile.data)
    const dispatch: ThunkDispatch<StateType, ProfileDataType, ProfileActionType> = useDispatch()

    useAuthCheck()

    const onSubmit = (profileData: ProfileDataType) => {
        console.log(profileData)
        dispatch(updateProfile(profileData))
    }

    return <EditProfileForm
        initialValues={profileData}
        onSubmit={onSubmit}
    />
}

export default EditProfileFormContainer