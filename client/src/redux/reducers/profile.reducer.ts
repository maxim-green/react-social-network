import {profileApi} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {
    AsyncThunkType,
    AvatarType,
    ContactsType,
    FormDataType,
    InferValueTypes,
    LocationType, ProfileDataType,
    ResultCodes
} from '../../types/types'

// INITIAL STATE
const initialState = {
    data: {} as ProfileDataType
}
export type ProfileStateType = typeof initialState

// REDUCER
const reducer = (state: ProfileStateType = initialState, action: ProfileActionType): ProfileStateType => {
    switch (action.type) {
        case 'SET_PROFILE': {
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
        case 'SET_AVATAR': {
            return {
                ...state,
                data: {
                    ...state.data,
                    avatar: {...state.data.avatar, ...action.avatar}
                },
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
    setProfile: (profileData: ProfileDataType) => ({type: 'SET_PROFILE', profileData} as const),
    setAvatar: (avatar: AvatarType) => ({type: 'SET_AVATAR', avatar} as const)
}
export type ProfileActionType = ReturnType<InferValueTypes<typeof profileActions>>
//endregion

//region THUNK CREATORS
export const getUserData = (username: string): AsyncThunkType => async (dispatch) => {
    const res = await profileApi.getProfile(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(profileActions.setProfile(res.data))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const updateProfile = (profileData: ProfileDataType): AsyncThunkType => async (dispatch) => {
    const res = await profileApi.updateProfile(profileData)
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
        dispatch(stopSubmit('editProfile', {_error: res.message}))
    }
}

export const updateAvatar = (formData: FormDataType): AsyncThunkType => async (dispatch) => {
    const res = await profileApi.updateAvatar(formData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(profileActions.setAvatar(res.data))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion