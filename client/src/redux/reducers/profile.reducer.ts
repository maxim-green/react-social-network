import {profileApi} from "../../api/api";
import {stopSubmit} from "redux-form";
import {AvatarType, ContactsType, LocationType} from "../../types/types";

// ACTION STRINGS
const SET_PROFILE = 'react-social-network/profile/SET_PROFILE'
const SET_AVATAR = 'react-social-network/profile/SET_AVATAR'

// INITIAL STATE
const initialState = {
    userId: null as string | null,
    firstName: null as string | null,
    lastName: null as string | null,
    birthDate: null as string | null,
    status: null as string | null,
    bio: null as string | null,
    interests: null as string | null,
    location: {
        country: null,
        city: null,
    } as LocationType | null,
    contacts: {
        website: null,
        phone: null,
        email: null,
        vkontakte: null,
        facebook: null,
        github: null,
        telegram: null,
    } as ContactsType | null,
    avatar: {
        large: null,
        small: null,
    } as AvatarType | null
}
type ProfileStateType = typeof initialState

// REDUCER
const reducer = (state: ProfileStateType = initialState, action: any): ProfileStateType => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state,
                ...action.profileData,
                location: {...state.location, ...action.profileData.location},
                contacts: {...state.contacts, ...action.profileData.contacts},
                avatar: {...state.avatar, ...action.profileData.avatar}
            }
        }
        case SET_AVATAR: {
            return {
                ...state,
                avatar: {...state.avatar, ...action.avatar}
            }
        }
        default: {
            return state
        }
    }
}
export default reducer

// ACTION CREATORS
type SetProfileActionType = { type: typeof SET_PROFILE, profileData: ProfileStateType }
export const setProfileAC = (profileData: ProfileStateType): SetProfileActionType => ({type: SET_PROFILE, profileData})

type SetAvatarActionType = { type: typeof SET_AVATAR, avatar: AvatarType }
export const setAvatarAC = (avatar: AvatarType): SetAvatarActionType => ({type: SET_AVATAR, avatar})

// THUNK CREATORS // todo: add proper types for dispatch and formData
export const getUserData = (username: string) => async (dispatch: any) => {
    const res = await profileApi.getProfile(username)
    if (res.resultCode === 0) {
        dispatch(setProfileAC(res.data))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}

export const updateProfile = (profileData: ProfileStateType) => async (dispatch: any) => {
    const res = await profileApi.updateProfile(profileData)
    if (res.resultCode === 0) {
        console.log(res)
    }
    if (res.resultCode === 1) {
        console.log(res)
        dispatch(stopSubmit('editProfile', {_error: res.message}))
    }
}

export const updateAvatar = (formData: any) => async (dispatch: any) => {
    const res = await profileApi.updateAvatar(formData)
    if (res.resultCode === 0) {
        dispatch(setAvatarAC(res.avatar))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}