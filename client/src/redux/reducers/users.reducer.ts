import {usersApi} from '../../api/api'
import {AsyncThunkType, ResultCodes, UserType} from '../../types/types'

// ACTION STRINGS
const SET_USERS = 'react-social-network/usersReducer/SET_USERS'
const SET_IS_FRIEND = 'react-social-network/usersReducer/SET_IS_FRIEND'
const SET_IS_SUBSCRIPTION = 'react-social-network/usersReducer/SET_IS_SUBSCRIPTION'

// INITIAL STATE
const initialState = {
    users: [] as Array<UserType>
}
type UsersStateType = typeof initialState

// REDUCER
export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_IS_FRIEND: {
            return {
                ...state,
                users: state.users.map(user => (user.userId === action.userId) ? {...user, isFriend: action.isFriend} : user)
            }
        }
        case SET_IS_SUBSCRIPTION: {
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

// ACTION CREATORS
type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
const setUsersAC = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetIsFriendActionType = {type: typeof SET_IS_FRIEND, userId: string, isFriend: boolean}
const setIsFriendAC = (userId: string, isFriend: boolean): SetIsFriendActionType => ({type: SET_IS_FRIEND, userId, isFriend})

type SetIsSubscriptionActionType = {type: typeof SET_IS_SUBSCRIPTION, userId: string, isSubscription: boolean}
const setIsSubscriptionAC = (userId: string, isSubscription: boolean): SetIsSubscriptionActionType => ({type: SET_IS_SUBSCRIPTION, userId, isSubscription})

export type UsersActionType = SetUsersActionType | SetIsFriendActionType | SetIsSubscriptionActionType

// THUNK CREATORS // todo: add proper types to dispatch
export const getUsers = (): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.getUsers()
    if (res.resultCode === ResultCodes.success) {
        dispatch(setUsersAC(res.users))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const addFriend = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.addFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(setIsFriendAC(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const deleteFriend = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.deleteFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(setIsFriendAC(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const follow = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.addSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(setIsSubscriptionAC(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const unfollow = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.deleteSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(setIsSubscriptionAC(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}