import {authApi} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {AsyncThunkType, AuthResultCodes, LoginDataType, RegistrationDataType, ResultCodes} from '../../types/types'

// ACTION STRINGS
const SET_USER = 'authReducer/SET_USER'
const CLEAR_USER = 'authReducer/CLEAR_USER'
const SET_REGISTRATION_SUCCESSFUL = 'authReducer/SET_REGISTRATION_SUCCESSFUL'

// INITIAL STATE
const initialState = {
    authorized: false,
    userId: null as string | null,
    email: null as string | null,
    username: null as string | null,
    registrationSuccessful: false
}
type AuthStateType = typeof initialState

// REDUCER
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                authorized: true,
                userId: action.userId,
                email: action.email,
                username: action.username
            }
        }
        case CLEAR_USER: {
            return {
                ...state,
                authorized: false,
                userId: null,
                email: null,
                username: null
            }
        }
        case SET_REGISTRATION_SUCCESSFUL: {
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

// ACTION CREATORS
export type SetUserActionType = {type: typeof SET_USER, userId: string, email: string, username: string }
export const setUserAC = (userId: string, email: string, username: string): SetUserActionType => ({type: SET_USER, userId, email, username})

export type ClearUserActionType = {type: typeof CLEAR_USER}
export const clearUserAC = (): ClearUserActionType => ({type: CLEAR_USER})

export type SetRegistrationSuccessfulActionType = {type: typeof SET_REGISTRATION_SUCCESSFUL, registrationSuccessful: boolean}
export const setRegistrationSuccessfulAC = (registrationSuccessful: boolean): SetRegistrationSuccessfulActionType => ({type: SET_REGISTRATION_SUCCESSFUL, registrationSuccessful})

export type AuthActionType = SetUserActionType | ClearUserActionType | SetRegistrationSuccessfulActionType

// THUNK CREATORS: string
export const login = (loginFormData: LoginDataType): AsyncThunkType => async (dispatch) => {
    const res = await authApi.login(loginFormData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(checkAuthorized())
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(stopSubmit('login', {_error: res.message}))
    }
}

// todo needs refactoring
export const checkAuthorized = (): AsyncThunkType => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === ResultCodes.success) {
        const {userId, email, username} = res.data
        dispatch(setUserAC(userId, email, username))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(clearUserAC())
        console.log(res)
    }
    if (res.resultCode === AuthResultCodes.expiredToken) {
        dispatch(clearUserAC())
        console.log(res)
    }
}

export const logout = (): AsyncThunkType => async (dispatch) => {
    const res = await authApi.logout()
    if (res.resultCode === ResultCodes.success) {
        dispatch(clearUserAC())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const register = (registrationData: RegistrationDataType): AsyncThunkType => async (dispatch) => {
    const res = await authApi.register(registrationData)
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
        dispatch(setRegistrationSuccessfulAC(true))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(stopSubmit('registration', {_error: res.message}))
    }
}