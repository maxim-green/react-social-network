import {checkAuthorized} from './auth.reducer'
import {InferActionsTypes, ThunkType} from '../store'
import {startMessagesListening, startSocketListening} from './chat.reducer'

// INITIAL STATE
const initialState = {
    initialized: false
}
type AppStateType = typeof initialState

// REDUCER
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'rsn/app/INITIALIZE_APP': {
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
    setInitialized: (initialized: boolean) => ({type: 'rsn/app/INITIALIZE_APP', initialized} as const)
}
export type AppActionType = ReturnType<InferActionsTypes<typeof appActions>>
//endregion

//region THUNK CREATORS
export const initializeApp = (): ThunkType<AppActionType> => async (dispatch) => {
    await Promise.all([ // put all that needed to be checked to init app inside this array
        dispatch(checkAuthorized())
    ])
    dispatch(startSocketListening())
    dispatch(startMessagesListening())
    dispatch(appActions.setInitialized(true))
}
//endregion