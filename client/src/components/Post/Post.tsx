import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'components/_shared/Card/Card';
import { PostType } from 'types/types';
import { formatDate } from 'utils/functions/functions';
import { PostHeader } from 'components/Post/PostHeader/PostHeader';
import { PostText } from 'components/Post/PostText/PostText';
import { PostControls } from 'components/Post/PostControls/PostControls';
import { PostComments } from 'components/Post/PostComments/PostComments';
import { ErrorBoundary } from 'components/ErrorBoundary';

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

export const Post: React.FC<PropsType> = ({
  post,
  comments = 'folded',
  commentsShown = 3,
  onPostDelete,
  onPostAddLike,
  onPostDeleteLike,
  authorizedUserId,
  onAddComment,
  onDeleteComment,
}) => {
  const [commentSectionActive, setCommentSectionActive] = useState(comments === 'shown');
  const isAuthor = authorizedUserId === post.author._id;
  const date = formatDate(post.createdAt);
  const isLiked = authorizedUserId ? post.likes.map((user) => user._id).includes(authorizedUserId)
    : false;

  const postDeleteHandler = () => {
    if (onPostDelete) onPostDelete(post._id);
  };

  const toggleLike = () => {
    if (!isLiked) {
      if (onPostAddLike) onPostAddLike(post._id);
    } else if (onPostDeleteLike) onPostDeleteLike(post._id);
  };

  const addCommentHandler = (text: string) => {
    onAddComment(post._id, text);
  };

  const deleteCommentHandler = (commentId: string) => {
    onDeleteComment(commentId);
  };

  const toggleCommentSection = () => {
    setCommentSectionActive((prev) => !prev);
  };

  const addPostFormRef = useRef(null);

  useEffect(() => {
    // @ts-ignore todo ???
    if (addPostFormRef?.current && commentSectionActive) addPostFormRef.current.scrollIntoView();
  }, [commentSectionActive]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
