import {
  Action, applyMiddleware, combineReducers, createStore,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/auth.reducer';
import { profileReducer } from './reducers/profile.reducer';
import { postsReducer } from './reducers/posts.reducer';
import { appReducer } from './reducers/app.reducer';
import { usersReducer } from './reducers/users.reducer';
import { dialogsReducer } from './reducers/dialogs.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer,
  posts: postsReducer,
  dialogs: dialogsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export type RootState = ReturnType<typeof store.getState> // get root state type
export type RootDispatch = typeof store.dispatch // get root dispatch type

// generic for extracting action types from actions object
export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never

// includes all action types from all reducer files
export type ThunkType<A extends Action> = ThunkAction<Promise<void>, RootState, unknown, A>
