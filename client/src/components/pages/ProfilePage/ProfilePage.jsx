import React, {useEffect} from 'react'
import {getUserData, updateAvatar} from "../../../redux/reducers/profile.reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import {checkAuthorized} from "../../../redux/reducers/auth.reducer";

const ProfilePage = (props) => {
    return (
        <>
            <ProfileInfo
                {...props.profileData}
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

const ProfilePageContainer = (props) => {
    const {username} = props.match.params
    const {checkAuthorized, getUserData, updateAvatar} = props
    useEffect(() => {
        checkAuthorized()
        getUserData(username)
    }, [checkAuthorized, getUserData, username])

    const onAvatarSubmit = ({avatar}) => {
        const formData = new FormData()
        formData.append('avatar', avatar)
        updateAvatar(formData)
    }

    return (
        <ProfilePage {...props} onAvatarSubmit={onAvatarSubmit}/>
    )
}

const mapStateToProps = (state) => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        profileData: state.profile
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {checkAuthorized, getUserData, updateAvatar})
)(ProfilePageContainer)