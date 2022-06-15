import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import {
  getUserData, updateAvatar, updateCoverImage, updateStatus,
} from 'store/reducers/profile.reducer';
import { getUserPosts } from 'store/reducers/posts.reducer';
import { RootState } from 'store/store';
import { Area } from 'react-easy-crop/types';
import { NewPostInputForm } from 'components/_forms/NewPostInputForm/NewPostInputForm';
import { FeedContainer } from 'components/Feed/Feed';
import { Profile } from 'components/Profile/Profile';
import { Helmet } from 'react-helmet';

export const ProfilePage: React.FC = () => {
  const { username }: { username: string } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(getUserData(username));
      dispatch(getUserPosts(username));
    }
  }, [username, dispatch]);

  const authUser = useSelector((state: RootState) => state.auth.user);
  const profileUser = useSelector((state: RootState) => state.profile.user);
  const isOwner = authUser?._id === profileUser._id;
  const posts = useSelector((state: RootState) => state.posts.posts);

  const onAvatarSubmit = (image: File, cropArea: Area) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('crop', JSON.stringify(cropArea));
    dispatch(updateAvatar(formData));
  };

  const onCoverImageSubmit = (image: File, cropArea: Area) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('crop', JSON.stringify(cropArea));
    dispatch(updateCoverImage(formData));
  };

  const onStatusUpdate = (status: string) => {
    dispatch(updateStatus(status));
  };

  if (!authUser && !username) return <Redirect to="/login" />;
  if (authUser && !username) return <Redirect to={`/profile/${authUser.username}`} />;
  return (
    <>
      {profileUser.firstName && profileUser.lastName && (
        <Helmet>
          <title>
            {profileUser.firstName}
            {' '}
            {profileUser.lastName}
          </title>
        </Helmet>
      )}
      <Profile
        user={profileUser}
        isOwner={isOwner}
        onAvatarSubmit={onAvatarSubmit}
        onCoverImageSubmit={onCoverImageSubmit}
        onStatusUpdate={onStatusUpdate}
      />
      {isOwner && <NewPostInputForm />}
      <FeedContainer posts={posts} />
    </>
  );
};
