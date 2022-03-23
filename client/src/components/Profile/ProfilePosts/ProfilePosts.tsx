import React from 'react'
import NewPostInputForm from '../../_forms/NewPostInputForm/NewPostInputForm'
import {NewPostType, PostType} from 'types/types'
import Feed from 'components/Feed/Feed'

type PropsType = {
    authorized: boolean
    authorizedUserId?: string
    userId?: string | null
    posts: Array<PostType>
    isAddPostPending: boolean
    onNewPostSubmit: (newPostData: NewPostType) => void
    onPostDelete: (id: string) => void
}

const ProfilePosts: React.FC<PropsType> = ({
                                               authorized,
                                               authorizedUserId,
                                               userId,
                                               posts,
                                               onNewPostSubmit,
                                               isAddPostPending,
                                           }) => {
    const isAuthorizedUserProfile = authorized && (authorizedUserId === userId)

    return (
        <>
            {isAuthorizedUserProfile && <NewPostInputForm isAddPostPending={isAddPostPending} onSubmit={onNewPostSubmit}/>}
            <Feed posts={posts}/>
        </>
    )
}

export default ProfilePosts