import React, {useEffect} from 'react'
import {
    getUserData,
    updateAvatar, updateCoverImage,
    updateStatus
} from 'redux/reducers/profile.reducer'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import {StateType} from 'redux/store'
import {NewPostType, PostType, UserDataType} from 'types/types'
import {Area} from 'react-easy-crop/types'
import {addPost, deletePost, getUserPosts} from 'redux/reducers/posts.reducer'
import Spinner from 'components/_shared/Spinner/Spinner'

type PropsType = {
    authorized: boolean
    authorizedUserId?: string
    profileData: UserDataType
    posts: Array<PostType>
    isAddPostPending: boolean
    onAvatarSubmit: (image: File, cropArea: Area) => void
    onCoverImageSubmit: (image: File, cropArea: Area) => void
    onNewPostSubmit: (newPostData: NewPostType) => void
    onPostDelete: (id: string) => void
    onStatusUpdate: (string: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <>
            {props.profileData && <ProfileInfo
                profileData={props.profileData}
                authorized={props.authorized}
                authorizedUserId={props.authorizedUserId}
                onAvatarSubmit={props.onAvatarSubmit}
                onCoverImageSubmit={props.onCoverImageSubmit}
                onStatusUpdate={props.onStatusUpdate}
            />}
            <ProfilePosts
                authorized={props.authorized}
                authorizedUserId={props.authorizedUserId}
                userId={props.profileData._id}
                posts={props.posts}
                isAddPostPending={props.isAddPostPending}
                onNewPostSubmit={props.onNewPostSubmit}
                onPostDelete={props.onPostDelete}
            />
        </>
    )
}

const ProfileContainer: React.FC = () => {
    const dispatch = useDispatch()

    const {username}: { username: string } = useParams()
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const authorizedUserId = useSelector((state: StateType) => state.auth.user?._id)
    const userProfileData = useSelector((state: StateType) => state.profile.user)
    const posts = useSelector((state: StateType) => state.posts.posts)
    const isAddPostPending = useSelector((state: StateType) => state.posts.isAddPostPending)

    useEffect(() => {
        dispatch(getUserData(username))
        dispatch(getUserPosts(username))
    }, [username, dispatch])

    const onAvatarSubmit = (image: File, cropArea: Area) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('crop', JSON.stringify(cropArea))
        dispatch(updateAvatar(formData))
    }

    const onCoverImageSubmit = (image: File, cropArea: Area) => {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('crop', JSON.stringify(cropArea))
        dispatch(updateCoverImage(formData))
    }

    const onNewPostSubmit = (newPostData: NewPostType) => {
        const {newPostText} = newPostData
        dispatch(addPost(newPostText))
    }

    const onPostDelete = (id: string) => {
        dispatch(deletePost(id))
    }

    const onStatusUpdate = (status: string) => {
        dispatch(updateStatus(status))
    }

    if (!userProfileData._id) return <Spinner/>

    return (
            <Profile
                authorized={authorized}
                authorizedUserId={authorizedUserId}
                profileData={userProfileData}
                posts={posts}
                isAddPostPending={isAddPostPending}
                onAvatarSubmit={onAvatarSubmit}
                onCoverImageSubmit={onCoverImageSubmit}
                onNewPostSubmit={onNewPostSubmit}
                onPostDelete={onPostDelete}
                onStatusUpdate={onStatusUpdate}
            />
    )
}

export default ProfileContainer