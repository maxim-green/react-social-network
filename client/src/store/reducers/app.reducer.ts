import { getAuthUserData } from './auth.reducer';
import { InferActionsTypes, ThunkType } from '../store';
import { startMessagesListening, stopMessagesListening } from './dialogs.reducer';

// INITIAL STATE
const initialState = {
  initialized: false,
};
type AppStateType = typeof initialState

// REDUCER
export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionType,
): AppStateType => {
  switch (action.type) {
    case 'rsn/app/INITIALIZE_APP': {
      return {
        ...state,
        initialized: action.initialized,
      };
    }
    default: {
      return state;
    }
  }
};

// region ACTION CREATORS
export const appActions = {
  setInitialized: (initialized: boolean) => ({
    type: 'rsn/app/INITIALIZE_APP',
    initialized,
  } as const),
};
export type AppActionType = ReturnType<InferActionsTypes<typeof appActions>>
// endregion

// region THUNK CREATORS
export const initializeApp = (): ThunkType<AppActionType> => async (dispatch) => {
  await Promise.all([ // put all that needed to be checked to init app inside this array
    dispatch(getAuthUserData()),
    dispatch(startMessagesListening()),
  ]);
  dispatch(appActions.setInitialized(true));
};

export const deinitializeApp = (): ThunkType<AppActionType> => async (dispatch) => {
  dispatch(stopMessagesListening());
  dispatch(appActions.setInitialized(false));
};
// endregion
