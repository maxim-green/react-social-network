import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {authReducer} from './reducers/auth.reducer'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './reducers/profile.reducer'
import {appReducer} from './reducers/app.reducer'
import {usersReducer} from './reducers/users.reducer'

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