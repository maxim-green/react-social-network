import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {StateType} from 'redux/store'
import {addPostLike, deletePost, deletePostLike, getPost} from 'redux/reducers/posts.reducer'
import Post from 'components/Post/Post'


const PostPage: React.FC = () => {
    const {id}: { id: string } = useParams()
    const dispatch = useDispatch()
    const post = useSelector((state: StateType) => state.posts.posts[0])
    const authorizedUserId = useSelector((state: StateType) => state.auth.user?._id)

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, id])

    const postAddLikeHandler = (postId: string) => {
        dispatch(addPostLike(postId))
    }

    const postDeleteLikeHandler = (postId: string) => {
        dispatch(deletePostLike(postId))
    }

    const onPostDelete = (id: string) => {
        dispatch(deletePost(id))
    }

    return <>
        {post && <Post
            key={post._id}
            post={post}
            authorizedUserId={authorizedUserId}
            onPostAddLike={postAddLikeHandler}
            onPostDeleteLike={postDeleteLikeHandler}
            onPostDelete={onPostDelete}
        />}
    </>
}

export default PostPage