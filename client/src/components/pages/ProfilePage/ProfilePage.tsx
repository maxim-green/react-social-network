import React, {useEffect} from 'react'
import {getUserData, ProfileStateType, updateAvatar} from '../../../redux/reducers/profile.reducer'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import {compose} from 'redux'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import {checkAuthorized} from '../../../redux/reducers/auth.reducer'
import {StateType} from '../../../redux/store'

type MapStatePropsType = {
    authorized: boolean
    authorizedUserId: string | null
    profileData: ProfileStateType
}

type MapDispatchPropsType = {
    checkAuthorized: () => void
    getUserData: (userId: string) => void
    updateAvatar: (avatarFormData: FormData) => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const ProfilePage: React.FC<PropsType & { onAvatarSubmit: ({avatar}: { avatar: File }) => void }> = (props) => {
    return (
        <>
            <ProfileInfo
                profileData={props.profileData}
                authorized={props.authorized}
                authorizedUserId={props.authorizedUserId}
                onAvatarSubmit={props.onAvatarSubmit}
            />
            <ProfilePosts
                authorized={props.authorized}
                authorizedUserId={props.authorizedUserId}
                userId={props.profileData.userId}
            />
        </>
    )
}

const ProfilePageContainer: React.FC<PropsType> = (props) => {
    const {username}: { username: string } = useParams()

    const {checkAuthorized, getUserData, updateAvatar} = props
    useEffect(() => {
        checkAuthorized()
        getUserData(username)
    }, [checkAuthorized, getUserData, username])

    const onAvatarSubmit = ({avatar}: { avatar: File }) => {
        const formData = new FormData()
        formData.append('avatar', avatar)
        console.log(formData.entries())
        updateAvatar(formData)
    }

    return (
        <ProfilePage {...props} onAvatarSubmit={onAvatarSubmit}/>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        profileData: state.profile
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
        mapStateToProps,
        {checkAuthorized, getUserData, updateAvatar}
    )
)(ProfilePageContainer)