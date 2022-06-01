import {applyMiddleware, combineReducers, createStore, Action} from 'redux'
import {AuthActionType, authReducer} from './reducers/auth.reducer'

import profileReducer, {ProfileActionType} from './reducers/profile.reducer'
import postsReducer, {PostsActionType} from './reducers/posts.reducer'
import {AppActionType, appReducer} from './reducers/app.reducer'
import {UsersActionType, usersReducer} from './reducers/users.reducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {dialogsReducer} from './reducers/dialogs.reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    posts: postsReducer,
    dialogs: dialogsReducer,
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)

// @ts-ignore added temporarily until redux dev tools not installed
window.s = store

export default store

export type RootState = ReturnType<typeof store.getState> // get root state type
export type RootDispatch = typeof store.dispatch  // get root dispatch type

// generic for extracting action types from actions object
export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never

// includes all action types from all reducer files
export type ThunkType<A extends Action> = ThunkAction<Promise<void>, RootState, unknown, A>

