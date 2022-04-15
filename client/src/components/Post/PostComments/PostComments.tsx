import React from 'react'
import classes from './PostComments.module.scss'
import classnames from 'classnames'
import AddPostCommentForm from 'components/_forms/AddPostCommentForm/AddPostCommentForm'
import {PostComment} from 'components/Post/PostComments/PostComment/PostComment'
import {NavLink} from 'react-router-dom'
import {Button} from 'components/_shared/Button/Button'
import {CommentType} from 'types/types'

type PropsType = {
    active: boolean
    postId: string
    authorizedUserId?: string
    comments: CommentType[]
    onAddCommentClick: (text: string) => void
    onDeleteCommentClick: (commentId: string) => void
}

export const PostComments: React.FC<PropsType> = ({
                                                      active,
                                                      postId,
                                                      authorizedUserId,
                                                      comments,
                                                      onAddCommentClick,
                                                      onDeleteCommentClick
                                                  }) => {
    return <div className={classnames(
        classes.comments,
        {[classes.active]: active}
    )}>
        <div className={classes.commentInput}>
            <AddPostCommentForm onAddComment={onAddCommentClick} disabled={!active}/>
        </div>

        <PostCommentsList
            active={active}
            comments={comments}
            postId={postId}
            authorizedUserId={authorizedUserId}
            onDelete={onDeleteCommentClick}
        />
    </div>
}

type PostCommentsType = {
    active: boolean
    postId: string
    authorizedUserId?: string
    onDelete: (commentId: string) => void
    comments: CommentType[]
}
const PostCommentsList: React.FC<PostCommentsType> = ({
                                                          active,
                                                          comments,
                                                          postId,
                                                          authorizedUserId,
                                                          onDelete
                                                      }) => {
    return <div className={classes.commentsList}>
        {comments
            .slice()
            .reverse()
            .slice(0, 3)
            .map(comment => <PostComment
                key={comment._id}
                {...comment}
                authorizedUserId={authorizedUserId}
                onDelete={onDelete}
                disabled={!active}
            />)}

        {comments.length > 3 && <div className={classes.commentsShowMore}>
            <NavLink to={`/post/${postId}`} tabIndex={!active ? -1 : undefined}>
                <Button type={'link'} disabled={!active}><Button.Text>Show more</Button.Text></Button>
            </NavLink>
        </div>}
    </div>
}