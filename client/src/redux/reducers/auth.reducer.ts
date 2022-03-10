import {authApi, LoginDataType, RegistrationDataType} from 'api/auth.api'
import {ResultCodes} from 'api/core.api'
import {InferActionsTypes, ThunkType} from '../store'
import {startMessagesListening, stopMessagesListening} from './dialogs.reducer'
import {AuthUserDataType, ServerValidationErrorType} from 'types/types'

// INITIAL STATE
const initialState = {
    authorized: false,
    user: null as AuthUserDataType | null,
    registrationErrors: [] as Array<ServerValidationErrorType>,
    loginErrors: [] as Array<ServerValidationErrorType>,
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
                user: action.user
            }
        }
        case 'rsn/auth/CLEAR_USER': {
            return {
                ...state,
                authorized: false,
                user: null
            }
        }
        case 'rsn/auth/SET_REGISTRATION_SUCCESSFUL': {
            return {
                ...state,
                registrationSuccessful: action.registrationSuccessful
            }
        }
        case 'rsn/auth/SET_REGISTRATION_ERRORS': {
            return  {
                ...state,
                registrationErrors: action.errors
            }
        }
        case 'rsn/auth/SET_LOGIN_ERRORS': {
            return {
                ...state,
                loginErrors: action.errors
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const authActions = {
    setUser: (user: AuthUserDataType) => ({
        type: 'rsn/auth/SET_USER',
        user
    } as const),
    clearUser: () => ({type: 'rsn/auth/CLEAR_USER'} as const),
    setRegistrationSuccessful: (registrationSuccessful: boolean) => ({
        type: 'rsn/auth/SET_REGISTRATION_SUCCESSFUL',
        registrationSuccessful
    } as const),
    setRegistrationErrors: (errors: Array<ServerValidationErrorType>) => ({
        type: 'rsn/auth/SET_REGISTRATION_ERRORS',
        errors
    } as const),
    setLoginErrors: (errors: Array<ServerValidationErrorType>) => ({
        type: 'rsn/auth/SET_LOGIN_ERRORS',
        errors
    } as const)
}
export type AuthActionType = ReturnType<InferActionsTypes<typeof authActions>>
//endregion

//region THUNK CREATORS
export const login = (loginFormData: LoginDataType): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.login(loginFormData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(checkAuthorized())
        dispatch(startMessagesListening())
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(authActions.setLoginErrors(res.errors))
    }
}

export const logout = (): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.logout()
    if (res.resultCode === ResultCodes.success) {
        dispatch(checkAuthorized())
        dispatch(stopMessagesListening())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

// Checking if user is authorized. If true - setting authorized user data in state. If false - clearing it.
export const checkAuthorized = (): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === ResultCodes.success) {
        const {user} = res.data
        dispatch(authActions.setUser(user))
    } else {
        dispatch(stopMessagesListening())
        dispatch(authActions.clearUser())
    }

    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
    if (res.resultCode === ResultCodes.expiredToken) {
        console.log(res)
    }
}

export const register = (registrationData: RegistrationDataType): ThunkType<AuthActionType> => async (dispatch) => {
    const res = await authApi.register(registrationData)
    if (res.resultCode === ResultCodes.success) {
        dispatch(authActions.setRegistrationSuccessful(true))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(authActions.setRegistrationErrors(res.errors))
    }
}
//endregion