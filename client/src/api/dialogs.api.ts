import {coreApi, handleError, handleResponse} from './core.api'
import {MessageType} from '../types/types'

type MessagesDataType = {
    dialogId: string,
    messages: Array<MessageType>
}

export const dialogsApi = {
    getMessages: (username: string) => coreApi
        .get(`/dialogs/${username}`)
        .then(handleResponse<MessagesDataType>())
        .catch(handleError())
}