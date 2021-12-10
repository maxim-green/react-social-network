import {UserType} from '../../types/types'
import {usersApi} from '../../api/users.api'
import {ResultCodes} from '../../api/core.api'
import {InferActionsTypes, ThunkType} from '../store'

// INITIAL STATE
const initialState = {
    users: [] as Array<UserType>
}
export type UsersStateType = typeof initialState

// REDUCER
export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case 'rsn/users/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'rsn/users/SET_IS_FRIEND': {
            return {
                ...state,
                users: state.users.map(user => (user.userId === action.userId) ? {...user, isFriend: action.isFriend} : user)
            }
        }
        case 'rsn/users/SET_IS_SUBSCRIPTION': {
            return {
                ...state,
                users: state.users.map(user => (user.userId === action.userId) ? {...user, isSubscription: action.isSubscription} : user)
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const usersActions = {
    setUsers: (users: Array<UserType>) => ({type: 'rsn/users/SET_USERS', users} as const),
    setIsFriend: (userId: string, isFriend: boolean) => ({type: 'rsn/users/SET_IS_FRIEND', userId, isFriend} as const),
    setIsSubscription: (userId: string, isSubscription: boolean) => ({type: 'rsn/users/SET_IS_SUBSCRIPTION', userId, isSubscription} as const),
}
export type UsersActionType = ReturnType<InferActionsTypes<typeof usersActions>>
//endregion

//region THUNK CREATORS
export const getUsers = (): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.getUsers()
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setUsers(res.data.users))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const addFriend = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.addFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const deleteFriend = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.deleteFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const follow = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.addSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const unfollow = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.deleteSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion