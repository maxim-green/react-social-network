import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {StateType} from 'redux/store'
import {useAuthCheck} from 'utils/hooks'
import {EditProfileDataType} from 'api/profile.api'
import {ProfileActionType, updateProfile} from 'redux/reducers/profile.reducer'
import Spinner from 'components/_shared/Spinner/Spinner'
import {Button} from 'components/_shared/Button/Button'
import {CForm, CFormRow, InputText, InputDate} from 'components/_shared/CForm/CForm'

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
        <CForm onSubmit={submit} initialValues={initialValues}>
            <CFormRow>
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
            </CFormRow>
            <CFormRow>
                <InputText name={'firstName'} label={'First name'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'lastName'} label={'Last name'} rules={{required: true}}/>
            </CFormRow>
            <CFormRow>
                <InputDate name={'birthDate'} label={'Birth date'}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'location.country'} label={'Country'}/>
                <InputText name={'location.city'} label={'City'}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'bio'} label={'Bio'}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'contacts.website'} label={'Website'}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'contacts.vkontakte'} label={'Vkontakte'}/>
            </CFormRow>
            <CFormRow>
                <InputText name={'contacts.github'} label={'Github'}/>
            </CFormRow>
        </CForm>
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