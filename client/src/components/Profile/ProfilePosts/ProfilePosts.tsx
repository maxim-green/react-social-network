import React from 'react'
import classes from './ProfilePosts.module.scss'
import NewPostInput from '../../NewPostInput/NewPostInput'
import Post from '../../Post/Post'
import {NewPostType, PostType} from '../../../types/types'
import moment from 'moment'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
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
                                               onPostDelete
                                           }) => {
    const isAuthorizedUserProfile = authorized && (authorizedUserId === userId)

    return (
        <>
            {isAuthorizedUserProfile && <NewPostInput isAddPostPending={isAddPostPending} onSubmit={onNewPostSubmit}/>}
            <div className={classes.posts}>
                {
                    posts.slice().reverse().map(post => <Post
                        key={post._id}
                        id={post._id}
                        text={post.text}
                        username={post.author.firstName + ' ' + post.author.lastName}
                        avatar={post.author.avatar.small}
                        date={moment(post.creationDate).format('DD.MM.YYYY')}
                        liked
                        onPostDelete={onPostDelete}
                        isAuthorizedUserProfile={isAuthorizedUserProfile}
                    />)
                }
            </div>
        </>
    )
}

export default ProfilePosts