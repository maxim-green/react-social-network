import React from 'react';
import { Post } from 'components/Post/Post';
import { PostType } from 'types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  addPostComment, addPostLike, deletePost, deletePostComment, deletePostLike,
} from 'store/reducers/posts.reducer';
import classes from './Feed.module.scss';

type Props = {
    posts: Array<PostType>
    onPostDelete: (id: string) => void
    onPostAddLike: (id: string) => void
    onPostDeleteLike: (id: string) => void
    authorizedUserId?: string
    onAddComment: (postId: string, text: string) => void
    onDeleteComment: (commentId: string) => void
}

const Feed: React.FC<Props> = ({
  posts,
  onPostDelete,
  onPostDeleteLike,
  authorizedUserId,
  onPostAddLike,
  onAddComment,
  onDeleteComment,
}) => (
  <div className={classes.wrapper}>
    {
            posts.slice().reverse().map((post) => (
              <Post
                key={post._id}
                post={post}
                commentsShown={3}
                onPostDelete={onPostDelete}
                onPostDeleteLike={onPostDeleteLike}
                onPostAddLike={onPostAddLike}
                authorizedUserId={authorizedUserId}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
              />
            ))
        }
  </div>
);

export const FeedContainer: React.FC<{ posts: Array<PostType> }> = ({ posts }) => {
  const dispatch = useDispatch();
  const authorizedUserId = useSelector((state: RootState) => state.auth.user?._id);

  const postAddLikeHandler = (postId: string) => {
    dispatch(addPostLike(postId));
  };

  const postDeleteLikeHandler = (postId: string) => {
    dispatch(deletePostLike(postId));
  };

  const postDeleteHandler = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const addCommentHandler = (postId: string, text: string) => {
    dispatch(addPostComment(postId, text));
  };
  const deleteCommentHandler = (commentId: string) => {
    dispatch(deletePostComment(commentId));
  };

  return (
    <Feed
      posts={posts}
      onPostAddLike={postAddLikeHandler}
      onPostDeleteLike={postDeleteLikeHandler}
      onAddComment={addCommentHandler}
      onDeleteComment={deleteCommentHandler}
      onPostDelete={postDeleteHandler}
      authorizedUserId={authorizedUserId}
    />
  );
};
