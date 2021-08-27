import React from 'react'
import Card from '../../common/Card/Card'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import {connect} from 'react-redux'
import {ProfileStateType, updateProfile} from '../../../redux/reducers/profile.reducer'
import {StateType} from '../../../redux/store'
import {ProfileDataType} from '../../../types/types'

type MapStatePropsType = {
    profileData: ProfileDataType
}

type MapDispatchPropsType = {
    updateProfile: (profileData: ProfileDataType) => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const EditProfilePage: React.FC<PropsType & { onSubmit: any }> = (props) => {
    return (
        <Card>
            <EditProfileForm
                onSubmit={props.onSubmit}
                initialValues={props.profileData}
            />
        </Card>
    )
}

const EditProfilePageContainer: React.FC<PropsType> = (props) => {

    const onSubmit = (profileData: ProfileDataType) => {
        props.updateProfile(profileData)
    }

    return (
        <EditProfilePage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        profileData: state.profile.data
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {updateProfile}
)(EditProfilePageContainer)