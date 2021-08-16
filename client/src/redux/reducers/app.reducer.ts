import {setUserAC} from './auth.reducer'
import {authApi} from "../../api/api";
import {AsyncThunkType} from '../../types/types'

// ACTION STRINGS
const INITIALIZE_APP = 'appReducer/INITIALIZE_APP'

// INITIAL STATE
const initialState = {
    initialized: false
}
type AppStateType = typeof initialState

// REDUCER
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case INITIALIZE_APP: {
            return {
                ...state,
                initialized: action.initialized
            }
        }
        default: {
            return state
        }
    }
}

// ACTION CREATORS
type SetInitializedActionType = {type: typeof INITIALIZE_APP, initialized: boolean}
const setInitializedAC = (initialized: boolean): SetInitializedActionType => ({type: INITIALIZE_APP, initialized})

export type AppActionType = SetInitializedActionType

// THUNK CREATORS
// todo refactor repeating code!!!
export const initializeApp = (): AsyncThunkType => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === 0) {
        const {userId, email, username} = res.data
        dispatch(setUserAC(userId, email, username))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
    if (res.resultCode === 10) {
        console.log(res)
    }
    dispatch(setInitializedAC(true))
}