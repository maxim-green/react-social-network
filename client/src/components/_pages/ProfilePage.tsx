import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getUserData, updateAvatar, updateCoverImage, updateStatus} from 'redux/reducers/profile.reducer'
import {addPost, getUserPosts} from 'redux/reducers/posts.reducer'
import {StateType} from 'redux/store'
import {Area} from 'react-easy-crop/types'
import {NewPostType} from 'types/types'
import NewPostInputForm from 'components/_forms/NewPostInputForm/NewPostInputForm'
import Feed from 'components/Feed/Feed'
import Profile from 'components/Profile/Profile'


const ProfilePage: React.FC = () => {
    const {username}: { username: string } = useParams()
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const authorizedUserId = useSelector((state: StateType) => state.auth.user?._id)
    const userProfileData = useSelector((state: StateType) => state.profile.user)
    const posts = useSelector((state: StateType) => state.posts.posts)
    const isAddPostPending = useSelector((state: StateType) => state.posts.isAddPostPending)
    const isAuthorizedUserProfile = authorized && (authorizedUserId === userProfileData._id)


    const dispatch = useDispatch()

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

    const onStatusUpdate = (status: string) => {
        dispatch(updateStatus(status))
    }


    return <>
        <Profile
            profileData={userProfileData}
            authorized={authorized}
            authorizedUserId={authorizedUserId}
            onAvatarSubmit={onAvatarSubmit}
            onCoverImageSubmit={onCoverImageSubmit}
            onStatusUpdate={onStatusUpdate}
        />

        {isAuthorizedUserProfile && <NewPostInputForm
            isAddPostPending={isAddPostPending}
            onSubmit={onNewPostSubmit}
        />}

        <Feed posts={posts}/>
    </>
}


export default ProfilePage