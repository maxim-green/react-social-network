import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {AuthActionType, authReducer} from './reducers/auth.reducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import profileReducer, {ProfileActionType} from './reducers/profile.reducer'
import {AppActionType, appReducer} from './reducers/app.reducer'
import {UsersActionType, usersReducer} from './reducers/users.reducer'

// generic for extracting action types from actions object
export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never

// includes all action types from all reducer files
export type ActionType = AppActionType | AuthActionType | ProfileActionType | UsersActionType
export type AsyncThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionType>
export type ThunkType<A> = ThunkAction<Promise<void>, StateType, unknown, A>

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    form: formReducer,
})

type RootReducerType = typeof rootReducer   // get root reducer type that returns app state
export type StateType = ReturnType<RootReducerType> // get app state type

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

// @ts-ignore
window.s = store

export default store
//
