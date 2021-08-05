import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer as formReducer} from "redux-form"
import {authReducer} from "./reducers/auth.reducer";
import thunkMiddleware from "redux-thunk"
import profileReducer from "./reducers/profile.reducer";
import {appReducer} from "./reducers/app.reducer";
import {usersReducer} from "./reducers/users.reducer";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    form: formReducer,
})

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
)
window.s = store

export default store