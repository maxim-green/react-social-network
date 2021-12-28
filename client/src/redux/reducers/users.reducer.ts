import {UserType} from '../../types/types'
import {usersApi} from '../../api/users.api'
import {ResultCodes} from '../../api/core.api'
import {InferActionsTypes, ThunkType} from '../store'

// INITIAL STATE
const initialState = {
    users: [] as Array<UserType>,
    friends: [] as Array<UserType>,
    outgoingFriendshipRequests: [] as Array<string>,
    incomingFriendshipRequests: [] as Array<string>
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
        case 'rsn/users/SET_INCOMING_FRIENDSHIP_REQUESTS': {
            return {
                ...state,
                incomingFriendshipRequests: action.incomingFriendshipRequests
            }
        }
        case 'rsn/users/SET_OUTGOING_FRIENDSHIP_REQUESTS': {
            return {
                ...state,
                outgoingFriendshipRequests: action.outgoingFriendshipRequests
            }
        }
        case 'rsn/users/ADD_OUTGOING_FRIENDSHIP_REQUEST': {
            return {
                ...state,
                outgoingFriendshipRequests: [...state.outgoingFriendshipRequests, action.userId]
            }
        }
        case 'rsn/users/REMOVE_OUTGOING_FRIENDSHIP_REQUEST': {
            return {
                ...state,
                outgoingFriendshipRequests: state.outgoingFriendshipRequests.filter(userId => userId !== action.userId)
            }
        }
        case 'rsn/users/REMOVE_INCOMING_FRIENDSHIP_REQUEST': {
            return {
                ...state,
                incomingFriendshipRequests: state.incomingFriendshipRequests.filter(userId => userId !== action.userId)
            }
        }
        case 'rsn/users/SET_FRIENDS': {
            return {
                ...state,
                friends: action.friends
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
    setFriends: (friends: Array<UserType>) => ({type: 'rsn/users/SET_FRIENDS', friends} as const),
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

export const getFriends = (): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.getFriends()
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setFriends(res.data.friends))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const addFriend = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.addFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.addOutgoingFriendshipRequest(userId))
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

export const cancelFriendshipRequest = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.cancelFriendshipRequest(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.removeOutgoingFriendshipRequest(userId))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const acceptFriendshipRequest = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.acceptFriendshipRequest(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, true))
        dispatch(usersActions.removeIncomingFriendshipRequest(userId))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const declineFriendshipRequest = (userId: string): ThunkType<UsersActionType> => async (dispatch) => {
    const res = await usersApi.declineFriendshipRequest(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, false))
        dispatch(usersActions.removeIncomingFriendshipRequest(userId))
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