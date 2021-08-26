import {authApi} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {
    AsyncThunkType,
    AuthResultCodes,
    InferValueTypes,
    LoginDataType,
    RegistrationDataType,
    ResultCodes
} from '../../types/types'

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
        case 'SET_USER': {
            return {
                ...state,
                authorized: true,
                userId: action.userId,
                email: action.email,
                username: action.username,
            }
        }
        case 'CLEAR_USER': {
            return {
                ...state,
                authorized: false,
                userId: null,
                email: null,
                username: null
            }
        }
        case 'SET_REGISTRATION_SUCCESSFUL': {
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
    setUser: (userId: string, email: string, username: string) => ({type: 'SET_USER', userId, email, username} as const),
    clearUser: () => ({type: 'CLEAR_USER'} as const),
    setRegistrationSuccessful: (registrationSuccessful: boolean) => ({type: 'SET_REGISTRATION_SUCCESSFUL', registrationSuccessful} as const)
}
export type AuthActionType = ReturnType<InferValueTypes<typeof authActions>>
//endregion

//region THUNK CREATORS
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
        dispatch(authActions.setUser(userId, email, username))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(authActions.clearUser())
        console.log(res)
    }
    if (res.resultCode === AuthResultCodes.expiredToken) {
        dispatch(authActions.clearUser())
        console.log(res)
    }
}

export const logout = (): AsyncThunkType => async (dispatch) => {
    const res = await authApi.logout()
    if (res.resultCode === ResultCodes.success) {
        dispatch(authActions.clearUser())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const register = (registrationData: RegistrationDataType): AsyncThunkType => async (dispatch) => {
    const res = await authApi.register(registrationData)
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
        dispatch(authActions.setRegistrationSuccessful(true))
    }
    if (res.resultCode === ResultCodes.error) {
        dispatch(stopSubmit('registration', {_error: res.message}))
    }
}
//endregion