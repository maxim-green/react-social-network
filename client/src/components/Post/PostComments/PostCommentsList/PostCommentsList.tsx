import React from 'react';
import { CommentType } from 'types/types';
import { PostComment } from 'components/Post/PostComments/PostComment/PostComment';
import { ShowMoreButton } from 'components/_shared/Button/ShowMoreButton/ShowMoreButton';
import { Row } from 'components/_shared/Flex/Flex';

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
  commentsShown = 3,
  postId,
  authorizedUserId,
  onDelete,
}) => (
  <>
    {comments
      .slice()
      .reverse()
      .slice(commentsShown ? 0 : undefined, commentsShown || undefined)
      .map((comment) => (
        <PostComment
          key={comment._id}
          _id={comment._id}
          author={comment.author}
          createdAt={comment.createdAt}
          likes={comment.likes}
          text={comment.text}
          authorizedUserId={authorizedUserId}
          onDelete={onDelete}
          disabled={!active}
        />
      ))}

    {!!commentsShown && comments.length > commentsShown && (
    <Row padding={5} horizontalAlign="center" bordered>
      <ShowMoreButton route={`/post/${postId}`} disabled={!active} />
    </Row>
    )}
  </>
);
