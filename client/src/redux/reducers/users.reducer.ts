import {UserItemDataType} from '../../types/types'
import {userApi} from '../../api/user.api'
import {ResultCodes} from '../../api/core.api'
import {InferActionsTypes, ThunkType} from '../store'

// INITIAL STATE
const initialState = {
    users: [] as Array<UserItemDataType>,
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
        case 'rsn/users/SET_IS_SUBSCRIPTION': {
            return {
                ...state,
                users: state.users.map(user => (user._id === action.userId) ? {...user, isSubscription: action.isSubscription} : user)
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const usersActions = {
    setUsers: (users: Array<UserItemDataType>) => ({type: 'rsn/users/SET_USERS', users} as const),
    setIsSubscription: (userId: string, isSubscription: boolean) => ({type: 'rsn/users/SET_IS_SUBSCRIPTION', userId, isSubscription} as const),
}
export type UsersActionType = ReturnType<InferActionsTypes<typeof usersActions>>
//endregion

//region THUNK CREATORS
export const getUsers = (): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await userApi.getUsers()
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setUsers(res.data.users))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const subscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await userApi.subscribe(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const unsubscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await userApi.unsubscribe(userId)

    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion