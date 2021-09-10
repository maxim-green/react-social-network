import {FormAction, stopSubmit} from 'redux-form'
import {AvatarType, FormDataType, PostType} from '../../types/types'
import {profileApi, ProfileDataType} from '../../api/profile.api'
import {ResultCodes} from '../../api/core.api'
import {InferActionsTypes, ThunkType} from '../store'
import {postsApi, PostsDataType} from '../../api/posts.api'

// INITIAL STATE
const initialState = {
    data: {} as ProfileDataType,
    posts: [] as Array<PostType>
}
export type ProfileStateType = typeof initialState

// REDUCER
const reducer = (state: ProfileStateType = initialState, action: ProfileActionType): ProfileStateType => {
    switch (action.type) {
        case 'rsn/profile/SET_PROFILE': {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.profileData,
                    location: {...state.data.location, ...action.profileData.location},
                    contacts: {...state.data.contacts, ...action.profileData.contacts},
                    avatar: {...state.data.avatar, ...action.profileData.avatar}
                },
            }
        }
        case 'rsn/profile/SET_AVATAR': {
            return {
                ...state,
                data: {
                    ...state.data,
                    avatar: {...state.data.avatar, ...action.avatar}
                },
            }
        }
        case 'rsn/profile/SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        default: {
            return state
        }
    }
}
export default reducer

//regions ACTION CREATORS
export const profileActions = {
    setProfile: (profileData: ProfileDataType) => ({type: 'rsn/profile/SET_PROFILE', profileData} as const),
    setAvatar: (avatar: AvatarType) => ({type: 'rsn/profile/SET_AVATAR', avatar} as const),
    setPosts: (posts: Array<PostType>) => ({type: 'rsn/profile/SET_POSTS', posts} as const)
}
export type ProfileActionType = ReturnType<InferActionsTypes<typeof profileActions>>
//endregion

//region THUNK CREATORS
export const getUserData = (username: string): ThunkType<ProfileActionType> => async (dispatch) => {
    const res = await profileApi.getProfile(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(profileActions.setProfile(res.data))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const updateProfile = (profileData: ProfileDataType): ThunkType<ProfileActionType | FormAction> => async (dispatch) => {
    const res = await profileApi.updateProfile(profileData)
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
        dispatch(stopSubmit('editProfile', {_error: res.message}))
    }
}

export const updateAvatar = (formData: FormDataType): ThunkType<ProfileActionType> => async (dispatch) => {
    const res = await profileApi.updateAvatar(formData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(profileActions.setAvatar(res.data))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const getPosts = (username: string): ThunkType<ProfileActionType> => async (dispatch) => {
    const res = await postsApi.getUserPosts(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(profileActions.setPosts(res.data.posts))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion