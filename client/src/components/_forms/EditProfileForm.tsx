import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from 'redux/store'
import {useAuthCheck} from 'utils/hooks'
import {EditProfileDataType} from 'api/profile.api'
import {ProfileActionType, updateProfile} from 'redux/reducers/profile.reducer'
import Spinner from 'components/_shared/Spinner/Spinner'
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {InputDate} from 'components/_shared/Input/InputDate/InputDate'

type PropsType = {
    initialValues: EditProfileDataType
    onSubmit: (profileData: EditProfileDataType) => void
    closeModal?: () => void
}

const EditProfileForm: React.FC<PropsType> = ({initialValues, onSubmit, closeModal}) => {

    const submit = (data: EditProfileDataType) => {
        onSubmit(data)
        closeModal && closeModal()
    }

    const backButtonClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        closeModal && closeModal()
    }

    return (
        <Form onSubmit={submit} initialValues={initialValues}>
            <FormRow>
                <Button size="medium">
                    <Button.Text>
                        Save
                    </Button.Text>
                </Button>
                <div style={{marginLeft: 'auto'}}>
                    <Button onClick={backButtonClickHandler} size="medium" type='cancel'>
                        <Button.Text>
                            Cancel
                        </Button.Text>
                    </Button>
                </div>
            </FormRow>
            <FormRow>
                <InputText name={'firstName'} label={'First name'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputText name={'lastName'} label={'Last name'} rules={{required: true}}/>
            </FormRow>
            <FormRow>
                <InputDate name={'birthDate'} label={'Birth date'}/>
            </FormRow>
            <FormRow>
                <InputText name={'location.country'} label={'Country'}/>
                <InputText name={'location.city'} label={'City'}/>
            </FormRow>
            <FormRow>
                <InputText name={'bio'} label={'Bio'}/>
            </FormRow>
            <FormRow>
                <InputText name={'contacts.website'} label={'Website'}/>
            </FormRow>
            <FormRow>
                <InputText name={'contacts.vkontakte'} label={'Vkontakte'}/>
            </FormRow>
            <FormRow>
                <InputText name={'contacts.github'} label={'Github'}/>
            </FormRow>
        </Form>
    )
}

const EditProfileFormContainer: React.FC<{ closeModal?: () => void }> = ({closeModal}) => {
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
        dispatch(updateProfile(profileData))
    }

    if (!editProfileData) return <Spinner/>

    return <EditProfileForm
        closeModal={closeModal}
        initialValues={editProfileData}
        onSubmit={onSubmit}
    />
}

export default EditProfileFormContainer