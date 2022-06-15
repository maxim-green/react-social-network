import {
  AvatarType, FormDataType, PostType, UserDataType,
} from 'types/types';
import { profileApi, EditProfileDataType } from 'api/profile.api';
import { ResultCodes } from 'api/core.api';
import { InferActionsTypes, ThunkType } from '../store';

// INITIAL STATE
const initialState = {
  user: {} as UserDataType,
  posts: [] as Array<PostType>,
  isAddPostPending: false as boolean,
};
export type ProfileStateType = typeof initialState

// REDUCER
export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionType,
): ProfileStateType => {
  switch (action.type) {
    case 'rsn/profile/SET_PROFILE': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userProfileData,
        },
      };
    }
    case 'rsn/profile/UPDATE_PROFILE': {
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.userProfileData.firstName,
          lastName: action.userProfileData.lastName,
          bio: action.userProfileData.bio,
          birthDate: action.userProfileData.birthDate,
          location: {
            ...state.user.location,
            ...action.userProfileData.location,
          },
          contacts: {
            ...state.user.contacts,
            ...action.userProfileData.contacts,
          },
        },
      };
    }
    case 'rsn/profile/SET_AVATAR': {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: { ...state.user.avatar, ...action.avatar },
        },
        // post: state.post.map(post => ({...post, author: {...post.author, avatar:
        // action.avatar}}))
      };
    }
    case 'rsn/profile/SET_COVER_IMAGE': {
      return {
        ...state,
        user: {
          ...state.user,
          coverImage: action.coverImage,
        },
      };
    }
    case 'rsn/profile/SET_STATUS': {
      return {
        ...state,
        user: {
          ...state.user,
          status: action.status,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// regions ACTION CREATORS
export const profileActions = {
  setProfile: (userProfileData: UserDataType) => ({
    type: 'rsn/profile/SET_PROFILE',
    userProfileData,
  } as const),
  updateProfile: (userProfileData: EditProfileDataType) => ({
    type: 'rsn/profile/UPDATE_PROFILE',
    userProfileData,
  } as const),
  setAvatar: (avatar: AvatarType) => ({ type: 'rsn/profile/SET_AVATAR', avatar } as const),
  setCoverImage: (coverImage: string) => ({
    type: 'rsn/profile/SET_COVER_IMAGE',
    coverImage,
  } as const),
  setStatus: (status: string) => ({ type: 'rsn/profile/SET_STATUS', status } as const),
};
export type ProfileActionType = ReturnType<InferActionsTypes<typeof profileActions>>
// endregion

// region THUNK CREATORS
export const getUserData = (username: string): ThunkType<ProfileActionType> => async (dispatch) => {
  const res = await profileApi.getProfile(username);

  if (res.resultCode === ResultCodes.success) {
    dispatch(profileActions.setProfile(res.data.user));
  }
  if (res.resultCode === ResultCodes.error) {
    console.log(res);
  }
};

export const updateStatus = (
  status: string,
): ThunkType<ProfileActionType> => async (dispatch) => {
  const res = await profileApi.updateStatus(status);

  if (res.resultCode === ResultCodes.success) {
    dispatch(profileActions.setStatus(status));
  }
  if (res.resultCode === ResultCodes.error) {
    console.log(res);
  }
};

export const updateProfile = (
  profileData: EditProfileDataType,
): ThunkType<ProfileActionType> => async (dispatch) => {
  const res = await profileApi.updateProfile(profileData);

  if (res.resultCode === ResultCodes.success) {
    dispatch(profileActions.updateProfile(profileData));
  }
  if (res.resultCode === ResultCodes.error) {
    console.log(res);
  }
};

export const updateAvatar = (
  formData: FormDataType,
): ThunkType<ProfileActionType> => async (dispatch) => {
  const res = await profileApi.updateAvatar(formData);
  if (res.resultCode === ResultCodes.success) {
    dispatch(profileActions.setAvatar(res.data.avatar));
  }
  if (res.resultCode === ResultCodes.error) {
    console.log(res);
  }
};

export const updateCoverImage = (
  formData: FormDataType,
): ThunkType<ProfileActionType> => async (dispatch) => {
  const res = await profileApi.updateCoverImage(formData);
  if (res.resultCode === ResultCodes.success) {
    dispatch(profileActions.setCoverImage(res.data.coverImage));
  }
  if (res.resultCode === ResultCodes.error) {
    console.log(res);
  }
};

// endregion
