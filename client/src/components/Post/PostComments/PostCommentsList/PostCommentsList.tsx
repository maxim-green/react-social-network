import React from 'react'
import {CommentType} from '../../../../types/types'
import {PostComment} from '../PostComment/PostComment'
import {ShowMoreButton} from '../../../_shared/Button/ShowMoreButton/ShowMoreButton'
import {Row} from '../../../_shared/Flex/Flex'

type PostCommentsType = {
    active: boolean
    postId: string
    authorizedUserId?: string
    onDelete: (commentId: string) => void
    comments: CommentType[]
}
export const PostCommentsList: React.FC<PostCommentsType> = ({
                                                                 active,
                                                                 comments,
                                                                 postId,
                                                                 authorizedUserId,
                                                                 onDelete
                                                             }) => {
    return <>
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

        {comments.length > 3 && <Row padding={5} horizontalAlign={'center'} bordered={true}>
            <ShowMoreButton route={`/post/${postId}`} disabled={!active}/>
        </Row>}
    </>
}
