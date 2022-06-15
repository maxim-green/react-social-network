import React, { useEffect } from 'react';
import { FeedContainer } from 'components/Feed/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedPosts } from 'store/reducers/posts.reducer';
import { getSortedPosts } from 'utils/selectors';
import { Redirect } from 'react-router-dom';
import { NewPostInputForm } from 'components/_forms/NewPostInputForm/NewPostInputForm';
import { useAuth } from 'hooks/useAuth';

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getSortedPosts);

  useEffect(() => {
    dispatch(getFeedPosts());
  }, [dispatch]);

  const authorized = useAuth();
  if (!authorized) return <Redirect to="/login" />;
  return (
    <>
      <NewPostInputForm />
      <FeedContainer posts={posts} />
    </>
  );
};
