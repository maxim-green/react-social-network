import {AppActionType} from '../redux/reducers/app.reducer'
import {AuthActionType} from '../redux/reducers/auth.reducer'
import {ThunkAction} from 'redux-thunk'
import {StateType} from '../redux/store'
import {ProfileActionType} from '../redux/reducers/profile.reducer'
import {Dispatch} from 'react'
import {UsersActionType} from '../redux/reducers/users.reducer'

// don't know if it is right to do so, but it works ;)
const formData = new FormData()
export type FormDataType = typeof formData

export type LocationType = {
    country: string | null
    city: string | null
}

export type ContactsType = {
    [contact: string]: string | null | undefined
}

export type AvatarType = {
    large: string | null
    small: string | null
}

export type RegistrationDataType = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

// type for user-items shown on users page
export type UserType = {
    userId: string
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    isFriend: boolean
    isSubscription: boolean
}

// REDUX
//
// includes all action types from all reducer files
export type ActionType = AppActionType | AuthActionType | ProfileActionType | UsersActionType
export type DispatchType = Dispatch<ActionType>
export type AsyncThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionType>

//region API (types for server responses)
export enum ResultCodes {
    success = 0,
    error = 1,
}
export enum AuthResultCodes {
    expiredToken = 10
}

export type ResponseDataType<D = any, R = ResultCodes> = {
    resultCode: R
    message: string
    data: D
}

export type AuthorizedUserDataType = {
    userId: string
    email: string
    username: string
}



//endregion