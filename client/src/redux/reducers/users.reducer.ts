import {usersApi} from "../../api/api";
import {UserType} from "../../types/types";

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
export const usersReducer = (state: UsersStateType = initialState, action: any): UsersStateType => {
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

// THUNK CREATORS // todo: add proper types to dispatch
export const getUsers = () => async (dispatch: any) => {
    const res = await usersApi.getUsers()
    if (res.resultCode === 0) {
        dispatch(setUsersAC(res.users))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}

export const addFriend = (userId: string) => async (dispatch: any) => {
    const res = await usersApi.addFriend(userId)
    if (res.resultCode === 0) {
        dispatch(setIsFriendAC(userId, true))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}

export const deleteFriend = (userId: string) => async (dispatch: any) => {
    const res = await usersApi.deleteFriend(userId)
    if (res.resultCode === 0) {
        dispatch(setIsFriendAC(userId, false))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}

export const follow = (userId: string) => async (dispatch: any) => {
    const res = await usersApi.addSubscription(userId)
    if (res.resultCode === 0) {
        dispatch(setIsSubscriptionAC(userId, true))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}

export const unfollow = (userId: string) => async (dispatch: any) => {
    const res = await usersApi.deleteSubscription(userId)
    if (res.resultCode === 0) {
        dispatch(setIsSubscriptionAC(userId, false))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
}