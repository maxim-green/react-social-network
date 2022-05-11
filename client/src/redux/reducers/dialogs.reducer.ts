import {InferActionsTypes, StateType, ThunkType} from '../store'
import {DialogType, MessageType} from 'types/types'
import {socketApi} from 'api/socket.api'
import {Dispatch} from 'react'
import {dialogApi} from 'api/dialog.api'
import {ResultCodes} from 'api/core.api'
import {authApi} from 'api/auth.api'


// INITIAL STATE
const initialState = {
    currentDialogId: null as string | null,
    messages: [] as Array<MessageType>,
    dialogs: [] as Array<DialogType>,
    cachedMessage: null as { text: string, dialogId: string } | null,
    unreadMessagesCount: 0
}
type DialogsStateType = typeof initialState

// REDUCER
export const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsActionType): DialogsStateType => {
    switch (action.type) {
        case 'rsn/chat/ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, action.message],
                dialogs: state.dialogs.map(dialog => (dialog._id === action.message.dialog) ? {
                    ...dialog,
                    updated: action.message.date
                } : dialog)
            }
        }
        case 'rsn/chat/SET_DIALOG': {
            return {
                ...state,
                currentDialogId: action.currentDialogId,
                messages: action.messages
            }
        }
        case 'rsn/chat/UNSET_DIALOG': {
            return {
                ...state,
                currentDialogId: null,
                messages: []
            }
        }
        case 'rsn/chat/SET_DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs
            }
        }
        case 'rsn/chat/SET_UNREAD_MESSAGES_COUNT': {
            return {
                ...state,
                unreadMessagesCount: action.unreadMessagesCount
            }
        }
        case 'rsn/chat/MARK_MESSAGE_AS_READ': {
            return {
                ...state,
                messages: state.messages.map(message => message._id !== action.messageId ? message : {...message, isRead: true})
            }
        }
        case 'rsn/chat/SET_CACHED_MESSAGE': {
            return {
                ...state,
                cachedMessage: {text: action.text, dialogId: action.dialogId}
            }
        }
        case 'rsn/chat/CLEAR_CACHED_MESSAGE': {
            return {
                ...state,
                cachedMessage: null
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const dialogsActions = {
    setDialog: (currentDialogId: string, messages: Array<MessageType>) => ({
        type: 'rsn/chat/SET_DIALOG',
        currentDialogId,
        messages
    } as const),
    unsetDialog: () => ({type: 'rsn/chat/UNSET_DIALOG'} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'rsn/chat/SET_DIALOGS', dialogs} as const),
    addMessage: (message: MessageType) => ({type: 'rsn/chat/ADD_MESSAGE', message} as const),
    setUnreadMessagesCount: (unreadMessagesCount: number) => ({
        type: 'rsn/chat/SET_UNREAD_MESSAGES_COUNT',
        unreadMessagesCount
    } as const),
    markMessageAsRead: (messageId: string) => ({type: 'rsn/chat/MARK_MESSAGE_AS_READ', messageId} as const),
    setCachedMessage: (text: string, dialogId: string) => ({type: 'rsn/chat/SET_CACHED_MESSAGE', text, dialogId} as const),
    clearCachedMessage: () => ({type: 'rsn/chat/CLEAR_CACHED_MESSAGE'} as const)
}
export type DialogsActionType = ReturnType<InferActionsTypes<typeof dialogsActions>>
//endregion

//region THUNK CREATORS
// todo: need to test and debug dialogs. sometimes message not added to state immediately after sending.
let _messageHandler: ((message: MessageType) => void) | null = null
const messageHandlerCreator = (dispatch: Dispatch<DialogsActionType>) => {
    if (_messageHandler) return _messageHandler
    return (message: MessageType) => {
        dispatch(dialogsActions.addMessage(message))
    }
}

let _unreadMessagesHandler: ((unreadMessagesCount: number) => void) | null = null
const unreadMessagesHandlerCreator = (dispatch: Dispatch<DialogsActionType>) => {
    if (_unreadMessagesHandler) return _unreadMessagesHandler
    return (unreadMessagesCount: number) => {
        dispatch(dialogsActions.setUnreadMessagesCount(unreadMessagesCount))
    }
}

let _notAuthorizedHandler: (() => null) | null = null
const notAuthorizedHandlerCreator = (dispatch: Dispatch<ThunkType<DialogsActionType> | DialogsActionType>, getState: () => StateType) => {
    if (_notAuthorizedHandler) return _notAuthorizedHandler
    return async () => {
        console.log('dispatch not authorized')
        dispatch(stopMessagesListening())
        const res = await authApi.refreshToken()
        dispatch(startMessagesListening())
        const {cachedMessage} = getState().dialogs
        if (res.resultCode === ResultCodes.success && cachedMessage) {
            const {text, dialogId} = cachedMessage
            console.log(cachedMessage)
            // todo looks like there is not enough time for connection.
            dispatch(sendMessage(text, dialogId))
        }
        dispatch(dialogsActions.clearCachedMessage())
    }
}

export const startMessagesListening = (): ThunkType<DialogsActionType> => async (dispatch, getState) => {
    socketApi.connect()
    socketApi.subscribe(
        messageHandlerCreator(dispatch),
        unreadMessagesHandlerCreator(dispatch),
        notAuthorizedHandlerCreator(dispatch, getState)
    )
}
export const stopMessagesListening = (): ThunkType<DialogsActionType> => async (dispatch, getState) => {
    socketApi.unsubscribe(
        messageHandlerCreator(dispatch),
        unreadMessagesHandlerCreator(dispatch),
        notAuthorizedHandlerCreator(dispatch, getState)
    )
    socketApi.disconnect()
}

// todo should refresh tokens if not authorized + add authorization verification on backend
export const sendMessage = (message: string, dialogId: string): ThunkType<DialogsActionType> => async (dispatch) => {
    dispatch(dialogsActions.setCachedMessage(message, dialogId))
    socketApi.sendMessage(message, dialogId)
}

export const getDialogs = (): ThunkType<DialogsActionType> => async (dispatch) => {
    const res = await dialogApi.getDialogs()

    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.setDialogs(res.data.dialogs))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const openDialog = (username: string): ThunkType<DialogsActionType> => async (dispatch) => {
    const res = await dialogApi.getMessages(username)
    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.setDialog(res.data.dialog._id, res.data.dialog.messages))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const closeDialog = (): ThunkType<DialogsActionType> => async (dispatch) => {
    dispatch(dialogsActions.unsetDialog())
}

export const readMessages = (dialogId: string): ThunkType<DialogsActionType> => async (dispatch) => {
    console.log(dialogId)
    socketApi.readMessages(dialogId)
}

export const readMessage = (messageId: string): ThunkType<DialogsActionType> => async (dispatch) => {
    const res = await dialogApi.markMessageAsRead(messageId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(dialogsActions.markMessageAsRead(res.data.message._id))
        dispatch(dialogsActions.setUnreadMessagesCount(res.data.unreadMessagesCount))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion
