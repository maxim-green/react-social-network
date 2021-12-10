import React, {useEffect} from 'react'
import Card from '../../common/Card/Card'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import {connect, useDispatch} from 'react-redux'
import {updateProfile} from '../../../redux/reducers/profile.reducer'
import {StateType} from '../../../redux/store'
import {ProfileDataType} from '../../../api/profile.api'
import {Redirect} from 'react-router'
import {checkAuthorized} from '../../../redux/reducers/auth.reducer'
import {useAuthCheck} from '../../../utils/hooks'

type MapStatePropsType = {
    profileData: ProfileDataType
    authorized: boolean
}

type MapDispatchPropsType = {
    updateProfile: (profileData: ProfileDataType) => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const EditProfilePage: React.FC<PropsType & { onSubmit: any }> = (props) => {
    return (
        <Card>
            {props.authorized && <EditProfileForm
                onSubmit={props.onSubmit}
                initialValues={props.profileData}
            />}
            {!props.authorized && <Redirect to={'/login'}/>}
        </Card>
    )
}

const EditProfilePageContainer: React.FC<PropsType> = (props) => {
    useAuthCheck()

    const onSubmit = (profileData: ProfileDataType) => {
        props.updateProfile(profileData)
    }

    return (
        <EditProfilePage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        profileData: state.profile.data,
        authorized: state.auth.authorized
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {updateProfile}
)(EditProfilePageContainer)