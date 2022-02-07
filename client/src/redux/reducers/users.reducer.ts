import {UserItemDataType} from '../../types/types'
import {usersApi} from '../../api/users.api'
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
    setFriends: (friends: Array<UserItemDataType>) => ({type: 'rsn/users/SET_FRIENDS', friends} as const),
    setIsFriend: (userId: string, isFriend: boolean) => ({type: 'rsn/users/SET_IS_FRIEND', userId, isFriend} as const),
    setIsSubscription: (userId: string, isSubscription: boolean) => ({type: 'rsn/users/SET_IS_SUBSCRIPTION', userId, isSubscription} as const),
    setOutgoingFriendshipRequests: (outgoingFriendshipRequests: Array<string>) => ({type: 'rsn/users/SET_OUTGOING_FRIENDSHIP_REQUESTS', outgoingFriendshipRequests} as const),
    setIncomingFriendshipRequests: (incomingFriendshipRequests: Array<string>) => ({type: 'rsn/users/SET_INCOMING_FRIENDSHIP_REQUESTS', incomingFriendshipRequests} as const),
    addOutgoingFriendshipRequest: (userId: string) => ({type: 'rsn/users/ADD_OUTGOING_FRIENDSHIP_REQUEST', userId} as const),
    removeOutgoingFriendshipRequest: (userId: string) => ({type: 'rsn/users/REMOVE_OUTGOING_FRIENDSHIP_REQUEST', userId} as const),
    removeIncomingFriendshipRequest: (userId: string) => ({type: 'rsn/users/REMOVE_INCOMING_FRIENDSHIP_REQUEST', userId} as const),
}
export type UsersActionType = ReturnType<InferActionsTypes<typeof usersActions>>
//endregion

//region THUNK CREATORS
export const getUsers = (): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.getUsers()
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setUsers(res.data.users))
        dispatch(usersActions.setIncomingFriendshipRequests(res.data.incomingFriendshipRequests))
        dispatch(usersActions.setOutgoingFriendshipRequests(res.data.outgoingFriendshipRequests))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const subscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.subscribe(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const unsubscribe = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.unsubscribe(userId)

    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion