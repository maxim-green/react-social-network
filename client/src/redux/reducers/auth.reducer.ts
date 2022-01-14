import {authApi, LoginDataType, RegistrationDataType} from '../../api/auth.api'
import {ResultCodes} from '../../api/core.api'
import {InferActionsTypes, ThunkType} from '../store'
import {ProfileDataType} from '../../api/profile.api'
import {startMessagesListening, startSocketListening, stopMessagesListening, stopSocketListening} from './chat.reducer'

// INITIAL STATE
const initialState = {
    authorized: false,
    userId: null as string | null,
    email: null as string | null,
    username: null as string | null,
    profile: null as ProfileDataType | null,
    registrationSuccessful: false
}
type AuthStateType = typeof initialState

// REDUCER
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case 'rsn/auth/SET_USER': {
            return {
                ...state,
                authorized: true,
                userId: action.userId,
                email: action.email,
                username: action.username,
                profile: action.profile
            }
        }
        case 'rsn/auth/CLEAR_USER': {
            return {
                ...state,
                authorized: false,
                userId: null,
                email: null,
                username: null
            }
        }
        case 'rsn/auth/SET_REGISTRATION_SUCCESSFUL': {
            return {
                ...state,
                registrationSuccessful: action.registrationSuccessful
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const authActions = {
    setUser: (userId: string, email: string, username: string, profile: ProfileDataType) => ({
        type: 'rsn/auth/SET_USER',
        userId,
        email,
        username,
        profile
    } as const),
    clearUser: () => ({type: 'rsn/auth/CLEAR_USER'} as const),
    setRegistrationSuccessful: (registrationSuccessful: boolean) => ({
        type: 'rsn/auth/SET_REGISTRATION_SUCCESSFUL',
        registrationSuccessful
    } as const)
}
export type AuthActionType = ReturnType<InferActionsTypes<typeof authActions>>
//endregion

//region THUNK CREATORS
export const login = (loginFormData: LoginDataType): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.login(loginFormData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(checkAuthorized())
        dispatch(startSocketListening())
        dispatch(startMessagesListening())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const checkAuthorized = (): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === ResultCodes.success) {
        const {userId, email, username, profile} = res.data
        console.log('Check Auth', profile)
        dispatch(authActions.setUser(userId, email, username, profile))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(authActions.clearUser())
        console.log(res)
    }
    if (res.resultCode === ResultCodes.expiredToken) {
        dispatch(authActions.clearUser())
        console.log(res)
    }
}

export const logout = (): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.logout()
    if (res.resultCode === ResultCodes.success) {
        dispatch(authActions.clearUser())
        dispatch(stopMessagesListening())
        dispatch(stopSocketListening())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const register = (registrationData: RegistrationDataType): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.register(registrationData)
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
        dispatch(authActions.setRegistrationSuccessful(true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion