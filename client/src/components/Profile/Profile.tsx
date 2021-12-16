import React, {useEffect} from 'react'
import {addPost, deletePost, getPosts, getUserData, updateAvatar} from '../../redux/reducers/profile.reducer'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfilePosts from './ProfilePosts/ProfilePosts'
import {StateType} from '../../redux/store'
import {ProfileDataType} from '../../api/profile.api'
import {NewPostType, PostType} from '../../types/types'
import {Point} from 'react-easy-crop/types'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    profileData: ProfileDataType
    posts: Array<PostType>
    isAddPostPending: boolean
    onAvatarSubmit: (e: React.FormEvent, image: File, crop: Point) => void
    onNewPostSubmit: (newPostData: NewPostType) => void
    onPostDelete: (id: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
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

const ProfileContainer: React.FC = () => {
    const dispatch = useDispatch()

    const {username}: { username: string } = useParams()
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const authorizedUserId = useSelector((state: StateType) => state.auth.userId)
    const profileData = useSelector((state: StateType) => state.profile.data)
    const posts = useSelector((state: StateType) => state.profile.posts)
    const isAddPostPending = useSelector((state: StateType) => state.profile.isAddPostPending)

    useEffect(() => {
        dispatch(getUserData(username))
        dispatch(getPosts(username))
    }, [getUserData, username, getPosts])

    const onAvatarSubmit = (e: React.FormEvent, image: File, crop: Point) => {
        const formData = new FormData()
        formData.append('avatar', image)
        formData.append('crop', JSON.stringify(crop))
        dispatch(updateAvatar(formData))
    }

    const onNewPostSubmit = (newPostData: NewPostType) => {
        const {newPostText} = newPostData
        dispatch(addPost(newPostText))
    }

    const onPostDelete = (id: string) => {
        dispatch(deletePost(id))
    }

    return (
        <Profile
            authorized={authorized}
            authorizedUserId={authorizedUserId}
            profileData={profileData}
            posts={posts}
            isAddPostPending={isAddPostPending}
            onAvatarSubmit={onAvatarSubmit}
            onNewPostSubmit={onNewPostSubmit}
            onPostDelete={onPostDelete}
        />
    )
}

export default ProfileContainer