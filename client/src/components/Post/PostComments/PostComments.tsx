import React, {useEffect, useRef} from 'react'
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
    commentsShown?: number
    onAddCommentClick: (text: string) => void
    onDeleteCommentClick: (commentId: string) => void
}

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export const PostComments: React.FC<PropsType> = ({
                                                      active,
                                                      postId,
                                                      commentsShown = 3,
                                                      authorizedUserId,
                                                      comments,
                                                      onAddCommentClick,
                                                      onDeleteCommentClick
                                                  }) => {
    return <div className={classnames(
        classes.comments,
        {[classes.active]: active}
    )}>
        <Row padding={'10px 10px'} bordered={true}>
                <AddPostCommentForm onAddComment={onAddCommentClick} disabled={!active}/>
        </Row>

        <PostCommentsList
            active={active}
            comments={comments}
            commentsShown={commentsShown}
            postId={postId}
            authorizedUserId={authorizedUserId}
            onDelete={onDeleteCommentClick}
        />
    </div>
}
