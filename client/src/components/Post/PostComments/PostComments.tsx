import React from 'react'
import classes from './PostComments.module.scss'
import classnames from 'classnames'
import AddPostCommentForm from 'components/_forms/AddPostCommentForm/AddPostCommentForm'
import {CommentType} from 'types/types'
import {PostCommentsList} from './PostCommentsList/PostCommentsList'
import {Row} from '../../_shared/Flex/Flex'

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
        <Row padding={'15px 30px'} bordered={true}>
            <AddPostCommentForm onAddComment={onAddCommentClick} disabled={!active}/>
        </Row>

        <PostCommentsList
            active={active}
            comments={comments}
            postId={postId}
            authorizedUserId={authorizedUserId}
            onDelete={onDeleteCommentClick}
        />
    </div>
}
