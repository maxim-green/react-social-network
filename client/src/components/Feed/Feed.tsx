import React from 'react'
import classes from './Feed.module.scss'
import Post from 'components/Post/Post'
import {PostType} from 'types/types'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {addPostLike, deletePost, deletePostLike} from 'redux/reducers/posts.reducer'

type Props = {
    posts: Array<PostType>
    onPostDelete: (id: string) => void
    onPostAddLike: (id: string) => void
    onPostDeleteLike: (id: string) => void
    authorizedUserId?: string
}

const Feed: React.FC<Props> = ({posts, onPostDelete, onPostDeleteLike, authorizedUserId, onPostAddLike}) => {
    return <div className={classes.wrapper}>
        {
            posts.slice().reverse().map(post => <Post
                key={post._id}
                post={post}
                onPostDelete={onPostDelete}
                onPostDeleteLike={onPostDeleteLike}
                onPostAddLike={onPostAddLike}
                authorizedUserId={authorizedUserId}
            />)
        }
    </div>
}

const FeedContainer: React.FC<{ posts: Array<PostType> }> = ({posts}) => {
    const dispatch = useDispatch()
    const authorizedUserId = useSelector((state: StateType) => state.auth.user?._id)

    const postAddLikeHandler = (postId: string) => {
        dispatch(addPostLike(postId))
    }

    const postDeleteLikeHandler = (postId: string) => {
        dispatch(deletePostLike(postId))
    }

    const postDeleteHandler = (postId: string) => {
        dispatch(deletePost(postId))
    }

    return <Feed posts={posts} onPostAddLike={postAddLikeHandler} onPostDeleteLike={postDeleteLikeHandler} onPostDelete={postDeleteHandler} authorizedUserId={authorizedUserId}/>
}

export default FeedContainer