import {usersApi} from '../../api/api'
import {AsyncThunkType, InferValueTypes, ResultCodes, UserType} from '../../types/types'

// INITIAL STATE
const initialState = {
    users: [] as Array<UserType>
}
export type UsersStateType = typeof initialState

// REDUCER
export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_IS_FRIEND': {
            return {
                ...state,
                users: state.users.map(user => (user.userId === action.userId) ? {...user, isFriend: action.isFriend} : user)
            }
        }
        case 'SET_IS_SUBSCRIPTION': {
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
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setIsFriend: (userId: string, isFriend: boolean) => ({type: 'SET_IS_FRIEND', userId, isFriend} as const),
    setIsSubscription: (userId: string, isSubscription: boolean) => ({type: 'SET_IS_SUBSCRIPTION', userId, isSubscription} as const),
}
export type UsersActionType = ReturnType<InferValueTypes<typeof usersActions>>
//endregion

//region THUNK CREATORS // todo: add proper types to dispatch
export const getUsers = (): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.getUsers()
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setUsers(res.data.users))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const addFriend = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.addFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const deleteFriend = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.deleteFriend(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsFriend(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const follow = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.addSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, true))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const unfollow = (userId: string): AsyncThunkType => async (dispatch) => {
    const res = await usersApi.deleteSubscription(userId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(usersActions.setIsSubscription(userId, false))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion