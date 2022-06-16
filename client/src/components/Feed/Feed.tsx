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
}

export const Feed: React.FC<Props> = ({
  posts,
}) => {
  const dispatch = useDispatch();
  const authorizedUserId = useSelector((state: RootState) => state.auth.user?._id);

  const onPostAddLike = (postId: string) => {
    dispatch(addPostLike(postId));
  };

  const onPostDeleteLike = (postId: string) => {
    dispatch(deletePostLike(postId));
  };

  const onPostDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const onAddComment = (postId: string, text: string) => {
    dispatch(addPostComment(postId, text));
  };
  const onDeleteComment = (commentId: string) => {
    dispatch(deletePostComment(commentId));
  };

  return (
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
};
