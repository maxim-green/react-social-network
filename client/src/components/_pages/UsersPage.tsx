import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUsers, subscribe, unsubscribe } from 'store/reducers/users.reducer';
import { Users } from 'components/Users/Users';

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch();

  const authorized = useSelector((state: RootState) => state.auth.authorized);
  const authorizedUserId = useSelector((state: RootState) => state.auth.user?._id);
  const authorizedUserSubscriptions = useSelector(
    (state: RootState) => state.auth.user?.subscriptions || [],
  );
  const users = useSelector((state: RootState) => state.users.users);
  const subscribePendingUserIds = useSelector(
    (state: RootState) => state.users.subscribePendingUserIds,
  );
  const handleSubscribe = (userId: string) => dispatch(subscribe(userId));
  const handleUnsubscribe = (userId: string) => dispatch(unsubscribe(userId));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, authorized]);

  return (
    <Users
      users={users}
      authorized={authorized}
      authorizedUserId={authorizedUserId}
      authorizedUserSubscriptions={authorizedUserSubscriptions}
      subscribePendingUserIds={subscribePendingUserIds}
      subscribe={handleSubscribe}
      unsubscribe={handleUnsubscribe}
    />
  );
};
