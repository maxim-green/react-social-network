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

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

// REDUX
//
// includes all action types from all reducer files
export type ActionType = AppActionType | AuthActionType | ProfileActionType | UsersActionType
export type DispatchType = Dispatch<ActionType>
export type AsyncThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionType>

//region API
//
// basic result codes. used by default in ResponseType
// can be extended if needed
export enum ResultCodes {
    success = 0,
    error = 1,
}

// result codes used for authentication responses
// such as expired jwt
export enum AuthResultCodes {
    expiredToken = 10
}

// all server responses have this type
export type ResponseType<D = undefined, R = ResultCodes> = {
    resultCode: R
    message: string
    data: D
}


// below are the types that encapsulated into data property of responses
// or sent to server in POST or PUT request bodies
//
// GET /auth/me/ response
// contains userId, email and username of currently logged in user
export type AuthorizedUserDataType = {
    userId: string
    email: string
    username: string
}

// POST /auth/login/
// contains data needed for login (gathered from login form)
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

// POST /auth/register/
// contains data needed for registration (gathered from registration form)
export type RegistrationDataType = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

// GET /profile/${username}
// PUT /profile/
// used for getting and updating user profile
export type ProfileDataType = {
    userId?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: string,
    status?: string,
    bio?: string,
    interests?: string,
    location?: LocationType,
    contacts?: ContactsType,
    avatar?: AvatarType
}
export type LocationType = { country?: string, city?: string }
export type ContactsType = { [contact: string]: string | undefined }
export type AvatarType = { large?: string, small?: string }

//endregion