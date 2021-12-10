import React, {useEffect} from 'react'
import {addPost, deletePost, getPosts, getUserData, updateAvatar} from '../../../redux/reducers/profile.reducer'
import {connect} from 'react-redux'
import {useParams} from 'react-router-dom'
import {compose} from 'redux'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import {checkAuthorized} from '../../../redux/reducers/auth.reducer'
import {StateType} from '../../../redux/store'
import {ProfileDataType} from '../../../api/profile.api'
import {NewPostType, PostType} from '../../../types/types'
import {Crop} from 'react-image-crop'
import {Point} from 'react-easy-crop/types'


type MapStatePropsType = {
    authorized: boolean
    authorizedUserId: string | null
    profileData: ProfileDataType
    posts: Array<PostType>
    isAddPostPending: boolean
}

type MapDispatchPropsType = {
    checkAuthorized: () => void
    getUserData: (userId: string) => void
    updateAvatar: (avatarFormData: FormData) => void
    getPosts: (userId: string) => void
    addPost: (text: string) => void
    deletePost: (id: string) => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const ProfilePage: React.FC<PropsType & {
    onAvatarSubmit: (e: Event, image: File, crop: Point) => void
    onNewPostSubmit: (newPostData: NewPostType) => void
    onPostDelete: (id: string) => void
}> = (props) => {
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
                isAddPostPending={props.isAddPostPending}
                onNewPostSubmit={props.onNewPostSubmit}
                onPostDelete={props.onPostDelete}
            />
        </>
    )
}

const ProfilePageContainer: React.FC<PropsType> = (props) => {
    const {username}: { username: string } = useParams()

    const {getUserData, updateAvatar, getPosts, addPost, deletePost} = props
    useEffect(() => {
        getUserData(username)
        getPosts(username)
    }, [getUserData, username, getPosts])

    const onAvatarSubmit = (e: Event, image: File, crop: Point) => {
        const formData = new FormData()
        formData.append('avatar', image)
        formData.append('crop', JSON.stringify(crop))
        updateAvatar(formData)
    }

    const onNewPostSubmit = (newPostData: NewPostType) => {

        const {newPostText} = newPostData
        addPost(newPostText)
    }

    const onPostDelete = (id: string) => {
        deletePost(id)
    }

    return (
        <ProfilePage {...props} onAvatarSubmit={onAvatarSubmit} onNewPostSubmit={onNewPostSubmit} onPostDelete={onPostDelete}/>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        authorized: state.auth.authorized,
        authorizedUserId: state.auth.userId,
        profileData: state.profile.data,
        posts: state.profile.posts,
        isAddPostPending: state.profile.isAddPostPending
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
        mapStateToProps,
        {checkAuthorized, getUserData, updateAvatar, getPosts, addPost, deletePost}
    )
)(ProfilePageContainer)