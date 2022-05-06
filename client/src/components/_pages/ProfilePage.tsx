import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useParams} from 'react-router-dom'
import {getUserData, updateAvatar, updateCoverImage, updateStatus} from 'redux/reducers/profile.reducer'
import {getUserPosts} from 'redux/reducers/posts.reducer'
import {StateType} from 'redux/store'
import {Area} from 'react-easy-crop/types'
import NewPostInputForm from 'components/_forms/NewPostInputForm/NewPostInputForm'
import Feed from 'components/Feed/Feed'
import Profile from 'components/Profile/Profile'
import {Helmet} from 'react-helmet'


const ProfilePage: React.FC = () => {
    let {username}: { username: string } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (username) {
            dispatch(getUserData(username))
            dispatch(getUserPosts(username))
        }
    }, [username, dispatch])


    const authUser = useSelector((state: StateType) => state.auth.user)
    const profileUser = useSelector((state: StateType) => state.profile.user)
    const isOwner = authUser?._id === profileUser._id
    const posts = useSelector((state: StateType) => state.posts.posts)

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

    const onStatusUpdate = (status: string) => {
        dispatch(updateStatus(status))
    }

    if (!authUser && !username) return <Redirect to={`/login`}/>
    if (authUser && !username) return <Redirect to={`/profile/${authUser.username}`}/>
    return <>
        {profileUser.firstName && profileUser.lastName && <Helmet>
            <title>{profileUser.firstName} {profileUser.lastName}</title>
        </Helmet>}
        <Profile
            user={profileUser}
            isOwner={isOwner}
            onAvatarSubmit={onAvatarSubmit}
            onCoverImageSubmit={onCoverImageSubmit}
            onStatusUpdate={onStatusUpdate}
        />
        {isOwner && <NewPostInputForm />}
        <Feed posts={posts}/>
    </>
}


export default ProfilePage