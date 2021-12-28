import React from 'react'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'
import Form from '../common/Form/Form'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {required} from '../../utils/validators'
import {useHistory} from 'react-router-dom'
import {capitalize} from '../../utils/functions'
import {ProfileDataType} from '../../api/profile.api'
import arrowBackIcon from '../../assets/images/arrow_back_black_24dp.svg'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import {useAuthCheck} from '../../utils/hooks'
import {ThunkDispatch} from 'redux-thunk'
import {ProfileActionType, updateProfile} from '../../redux/reducers/profile.reducer'

type NativePropsType = {}

type PropsType = InjectedFormProps<ProfileDataType, NativePropsType> & NativePropsType

const EditProfileForm: React.FC<PropsType> = (props) => {
    const {contacts = {}} = props.initialValues

    const history = useHistory()

    const submitHandler = (e: React.FormEvent) => {
        props.handleSubmit(e)
        history.goBack()
    }

    const backButtonClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        history.goBack()
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Row>
                <Form.Item>
                    <Button onClick={backButtonClickHandler} size="md" icon={arrowBackIcon} variant='text'/>
                </Form.Item>
                <Form.Item>
                    <Button caption="Save" size="md"/>
                </Form.Item>
            </Form.Row>
            <Form.Row>
                <Field name="firstName" type="text" component={Input} label="First name" placeholder="First name"
                       validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="lastName" type="text" component={Input} label="Last name" placeholder="Last name"
                       validate={required} block/>
            </Form.Row>
            <Form.Row>
                <Field name="birthDate" type="text" component={Input} label="Birth date" placeholder="Birth date"
                       block/>
            </Form.Row>
            <Form.Row>
                <Form.Item><Field name="location.country" type="text" component={Input} label="Country"
                                  placeholder="Country" block/></Form.Item>
                <Form.Item><Field name="location.city" type="text" component={Input} label="City" placeholder="City"
                                  block/></Form.Item>
            </Form.Row>
            <Form.Row>
                <Field name="bio" type="text" component={Input} label="Bio" placeholder="Bio" block/>
            </Form.Row>
            {
                Object.keys(contacts).map(key => {
                    return <Form.Row>
                        <Field name={'contacts.' + key} type="text" component={Input} label={capitalize(key)}
                               placeholder={capitalize(key)} block/>
                    </Form.Row>
                })
            }
        </Form>
    )
}

const EditProfileReduxForm = reduxForm<ProfileDataType, NativePropsType>({
    form: 'editProfile'
})(EditProfileForm)

const EditProfileFormContainer: React.FC = () => {
    const profileData = useSelector((state: StateType) => state.profile.data)
    const dispatch: ThunkDispatch<StateType, ProfileDataType, ProfileActionType> = useDispatch()

    useAuthCheck()

    const onSubmit = (profileData: ProfileDataType) => {
        dispatch(updateProfile(profileData))
    }

    return <EditProfileReduxForm
        initialValues={profileData}
        onSubmit={onSubmit}
    />
}

export default EditProfileFormContainer