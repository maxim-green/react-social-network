import {InferActionsTypes, ThunkType} from '../store'
import {DialogType, MessageType} from '../../types/types'
import {socketApi} from '../../api/socket.api'
import {Dispatch} from 'react'
import {dialogsApi} from '../../api/dialogs.api'
import {ResultCodes} from '../../api/core.api'

// INITIAL STATE
const initialState = {
    currentDialogId: null as string | null,
    messages: [] as Array<MessageType>,
    dialogs: [] as Array<DialogType>
}
type DialogsStateType = typeof initialState

// REDUCER
export const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsActionType): DialogsStateType => {
    switch (action.type) {
        case 'rsn/chat/ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, action.message],
                dialogs: state.dialogs.map(dialog => (dialog.id === action.message.dialogId) ? {...dialog, updated: action.message.date} : dialog)
            }
        }
        case 'rsn/chat/SET_DIALOG': {
            return {
                ...state,
                currentDialogId: action.currentDialogId,
                messages: action.messages
            }
        }
        case 'rsn/chat/SET_DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const dialogsActions = {
    setDialog: (currentDialogId: string, messages: Array<MessageType>) => ({type: 'rsn/chat/SET_DIALOG', currentDialogId, messages} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'rsn/chat/SET_DIALOGS', dialogs} as const),
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
export const sendMessage = (message: string, dialogId: string): ThunkType<DialogsActionType> => async (dispatch) => {
    socketApi.sendMessage(message, dialogId)
}

export const getDialogs = (): ThunkType<DialogsActionType> => async (dispatch) => {
    const res =  await dialogsApi.getDialogs()

    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.setDialogs(res.data.dialogs))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const openDialog = (username: string): ThunkType<DialogsActionType> => async (dispatch) => {
    const res = await dialogsApi.getMessages(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.setDialog(res.data.currentDialogId, res.data.messages))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion