import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {RootState} from 'store/store'
import {
    addPostComment,
    addPostLike,
    deletePost,
    deletePostComment,
    deletePostLike,
    getPost
} from 'store/reducers/posts.reducer'
import Post from 'components/Post/Post'


const PostPage: React.FC = () => {
    const {id}: { id: string } = useParams()
    const dispatch = useDispatch()
    const post = useSelector((state: RootState) => state.posts.posts[0])
    const authorizedUserId = useSelector((state: RootState) => state.auth.user?._id)

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

    const addCommentHandler = (postId: string, text: string) => {
        dispatch(addPostComment(postId, text))
    }
    const deleteCommentHandler = (commentId: string) => {
        dispatch(deletePostComment(commentId))
    }

    return <>
        {post && <Post
            comments={'shown'}
            key={post._id}
            post={post}
            authorizedUserId={authorizedUserId}
            onPostAddLike={postAddLikeHandler}
            onPostDeleteLike={postDeleteLikeHandler}
            onPostDelete={onPostDelete}
            onAddComment={addCommentHandler}
            onDeleteComment={deleteCommentHandler}
        />}
    </>
}

export default PostPage
