import React, {useState} from 'react'
import {Card} from 'components/_shared/Card/Card'
import {PostType} from 'types/types'
import {formatDate} from 'utils/functions'
import {PostHeader} from 'components/Post/PostHeader/PostHeader'
import {PostText} from 'components/Post/PostText/PostText'
import {PostControls} from 'components/Post/PostControls/PostControls'
import {PostComments} from 'components/Post/PostComments/PostComments'

// todo: consider connecting to store here.
type PropsType = {
    post: PostType
    comments?: 'shown' | 'folded'
    commentsShown?: number
    onPostAddLike: (id: string) => void
    onPostDeleteLike: (id: string) => void
    onPostDelete: (id: string) => void
    authorizedUserId?: string
    onAddComment: (postId: string, text: string) => void
    onDeleteComment: (commentId: string) => void
}

const Post: React.FC<PropsType> = ({
                                       post,
    comments = 'folded',
                                       commentsShown = 3,
                                       onPostDelete,
                                       onPostAddLike,
                                       onPostDeleteLike,
                                       authorizedUserId,
                                       onAddComment,
                                       onDeleteComment
                                   }) => {
    const [commentSectionActive, setCommentSectionActive] = useState(comments === 'shown')
    const isAuthor = authorizedUserId === post.author._id
    const date = formatDate(post.createdAt)
    const isLiked = authorizedUserId ? post.likes.map(user => user._id).includes(authorizedUserId) : false

    const postDeleteHandler = () => {
        if (onPostDelete) onPostDelete(post._id)
    }

    const toggleLike = () => {
        if (!isLiked) {
            if (onPostAddLike) onPostAddLike(post._id)
        } else {
            if (onPostDeleteLike) onPostDeleteLike(post._id)
        }
    }

    const addCommentHandler = (text: string) => {
        onAddComment(post._id, text)
    }

    const deleteCommentHandler = (commentId: string) => {
        onDeleteComment(commentId)
    }

    const toggleCommentSection = () => {
        commentSectionActive ? setCommentSectionActive(false) : setCommentSectionActive(true)
    }

    return (
        <Card>
            <PostHeader
                id={post._id}
                date={date}
                isAuthor={isAuthor}
                author={post.author}
                onDelete={postDeleteHandler}
            />

            <PostText>
                {post.text}
            </PostText>

            <PostControls
                likes={post.likes}
                isLiked={isLiked}
                onLikeClick={toggleLike}
                onCommentClick={(comments === 'folded') ? toggleCommentSection : undefined}
                onShareClick={() => console.log('share clicked')}
            />

            <PostComments
                postId={post._id}
                authorizedUserId={authorizedUserId}
                comments={post.comments}
                commentsShown={comments === 'shown' ? 0 : commentsShown}
                active={commentSectionActive}
                onAddCommentClick={addCommentHandler}
                onDeleteCommentClick={deleteCommentHandler}
            />

        </Card>
    )
}

export default Post
