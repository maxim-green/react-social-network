import React from 'react'
import {CommentType} from '../../../../types/types'
import {PostComment} from '../PostComment/PostComment'
import {ShowMoreButton} from '../../../_shared/Button/ShowMoreButton/ShowMoreButton'
import {Row} from '../../../_shared/Flex/Flex'

type PostCommentsType = {
    active: boolean
    postId: string
    commentsShown?: number
    authorizedUserId?: string
    onDelete: (commentId: string) => void
    comments: CommentType[]
}
export const PostCommentsList: React.FC<PostCommentsType> = ({
                                                                 active,
                                                                 comments,
                                                                 commentsShown= 3,
                                                                 postId,
                                                                 authorizedUserId,
                                                                 onDelete
                                                             }) => {
    return <>
        {comments
            .slice()
            .reverse()
            .slice(!!commentsShown ? 0 : undefined, commentsShown ? commentsShown : undefined)
            .map(comment => <PostComment
                key={comment._id}
                {...comment}
                authorizedUserId={authorizedUserId}
                onDelete={onDelete}
                disabled={!active}
            />)}

        {!!commentsShown && comments.length > commentsShown && <Row padding={5} horizontalAlign={'center'} bordered={true}>
            <ShowMoreButton route={`/post/${postId}`} disabled={!active}/>
        </Row>}
    </>
}
