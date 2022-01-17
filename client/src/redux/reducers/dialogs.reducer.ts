import {InferActionsTypes, ThunkType} from '../store'
import {MessageType} from '../../types/types'
import {socketApi} from '../../api/socket.api'
import {Dispatch} from 'react'
import {dialogsApi} from '../../api/dialogs.api'
import {ResultCodes} from '../../api/core.api'

// INITIAL STATE
const initialState = {
    dialogId: null as string | null,
    messages: [] as Array<MessageType>
}
type DialogsStateType = typeof initialState

// REDUCER
export const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsActionType): DialogsStateType => {
    switch (action.type) {
        case 'rsn/chat/ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        case 'rsn/chat/SET_DIALOG': {
            return {
                ...state,
                dialogId: action.dialogId,
                messages: action.messages
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const dialogsActions = {
    setDialog: (dialogId: string, messages: Array<MessageType>) => ({type: 'rsn/chat/SET_DIALOG', dialogId, messages} as const),
    addMessage: (message: MessageType) => ({type: 'rsn/chat/ADD_MESSAGE', message} as const),
}
export type DialogsActionType = ReturnType<InferActionsTypes<typeof dialogsActions>>
//endregion

//region THUNK CREATORS
let _messageHandler: ((message: MessageType) => void) | null = null
const messageHandlerCreator = (dispatch: Dispatch<DialogsActionType>) => {
    if (_messageHandler) return _messageHandler
    return (message: MessageType) => dispatch(dialogsActions.addMessage(message))
}

export const startMessagesListening = (): ThunkType<DialogsActionType> => async (dispatch) => {
    socketApi.connect()
    socketApi.joinDialogs()
    socketApi.subscribe(messageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType<DialogsActionType> => async (dispatch) => {
    socketApi.unsubscribe(messageHandlerCreator(dispatch))
    socketApi.disconnect()
}
export const sendMessage = (message: string): ThunkType<DialogsActionType> => async (dispatch) => {
    socketApi.sendMessage(message)
}

export const openDialog = (username: string): ThunkType<DialogsActionType> => async (dispatch) => {
    const res = await dialogsApi.getMessages(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.setDialog(res.data.dialogId, res.data.messages))
    }
    if (res.resultCode === ResultCodes.error) {

    }
}
//endregion