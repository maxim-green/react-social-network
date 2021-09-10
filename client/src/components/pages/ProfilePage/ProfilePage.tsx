import React, {useEffect} from 'react'
import {getPosts, getUserData, updateAvatar} from '../../../redux/reducers/profile.reducer'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import {compose} from 'redux'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import {checkAuthorized} from '../../../redux/reducers/auth.reducer'
import {StateType} from '../../../redux/store'
import {ProfileDataType} from '../../../api/profile.api'
import {PostType} from '../../../types/types'

type MapStatePropsType = {
    authorized: boolean
    authorizedUserId: string | null
    profileData: ProfileDataType
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    checkAuthorized: () => void
    getUserData: (userId: string) => void
    updateAvatar: (avatarFormData: FormData) => void
    getPosts: (userId: string) => void
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
                posts={props.posts}
            />
        </>
    )
}

const ProfilePageContainer: React.FC<PropsType> = (props) => {
    const {username}: { username: string } = useParams()

    const {checkAuthorized, getUserData, updateAvatar, getPosts} = props
    useEffect(() => {
        getUserData(username)
        getPosts(username)
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
        profileData: state.profile.data,
        posts: state.profile.posts
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
        mapStateToProps,
        {checkAuthorized, getUserData, updateAvatar, getPosts}
    )
)(ProfilePageContainer)