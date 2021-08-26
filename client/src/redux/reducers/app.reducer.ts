import {authActions} from './auth.reducer'
import {authApi} from "../../api/api";
import {AsyncThunkType, InferValueTypes} from '../../types/types'

// INITIAL STATE
const initialState = {
    initialized: false
}
type AppStateType = typeof initialState

// REDUCER
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'INITIALIZE_APP': {
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

//region ACTION CREATORS
export const appActions = {
    setInitialized: (initialized: boolean) => ({type: 'INITIALIZE_APP', initialized} as const)
}
export type AppActionType = ReturnType<InferValueTypes<typeof appActions>>
//endregion

//region THUNK CREATORS
// todo refactor repeating code!!!
export const initializeApp = (): AsyncThunkType => async (dispatch) => {
    const res = await authApi.me()
    if (res.resultCode === 0) {
        const {userId, email, username} = res.data
        dispatch(authActions.setUser(userId, email, username))
    }
    if (res.resultCode === 1) {
        console.log(res)
    }
    if (res.resultCode === 10) {
        console.log(res)
    }
    dispatch(appActions.setInitialized(true))
}
//endregion