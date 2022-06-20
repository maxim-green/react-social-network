import { UserItemDataType } from 'types/types';
import { userApi } from 'api/user.api';
import { ResultCodes } from 'api/core.api';
import { getAuthUserData } from 'store/reducers/auth.reducer';
import { InferActionsTypes, ThunkType } from 'store/store';

// INITIAL STATE
const initialState = {
  users: [] as Array<UserItemDataType>,
  subscribePendingUserIds: [] as Array<string>,
};
export type UsersStateType = typeof initialState

// REDUCER
export const usersReducer = (
  state: UsersStateType = initialState,
  action: UsersActionType,
): UsersStateType => {
  switch (action.type) {
    case 'rsn/users/SET_USERS': {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'rsn/users/ADD_SUBSCRIBE_PENDING_USER_ID': {
      return {
        ...state,
        subscribePendingUserIds: [...state.subscribePendingUserIds, action.userId],
      };
    }
    case 'rsn/users/DELETE_SUBSCRIBE_PENDING_USER_ID': {
      return {
        ...state,
        subscribePendingUserIds: state.subscribePendingUserIds.filter(
          (userId) => userId !== action.userId,
        ),
      };
    }
    default: {
      return state;
    }
  }
};

// region ACTION CREATORS
export const usersActions = {
  setUsers: (users: Array<UserItemDataType>) => ({ type: 'rsn/users/SET_USERS', users } as const),
  addSubscribePendingUserId: (userId: string) => ({
    type: 'rsn/users/ADD_SUBSCRIBE_PENDING_USER_ID',
    userId,
  } as const),
  deleteSubscribePendingUserId: (userId: string) => ({
    type: 'rsn/users/DELETE_SUBSCRIBE_PENDING_USER_ID',
    userId,
  } as const),
};
export type UsersActionType = ReturnType<InferActionsTypes<typeof usersActions>>
// endregion

// region THUNK CREATORS
export const getUsers = (): ThunkType<UsersActionType> => async (dispatch) => {
  const res = await userApi.getUsers();
  if (res.resultCode === ResultCodes.success) {
    dispatch(usersActions.setUsers(res.data.users));
  }
};

export const subscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
  dispatch(usersActions.addSubscribePendingUserId(userId));
  const res = await userApi.subscribe(userId);
  dispatch(usersActions.deleteSubscribePendingUserId(userId));
  if (res.resultCode === ResultCodes.success) {
    dispatch(getAuthUserData());
  }
};

export const unsubscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
  dispatch(usersActions.addSubscribePendingUserId(userId));
  const res = await userApi.unsubscribe(userId);
  dispatch(usersActions.deleteSubscribePendingUserId(userId));
  if (res.resultCode === ResultCodes.success) {
    dispatch(getAuthUserData());
  }
};
// endregion
