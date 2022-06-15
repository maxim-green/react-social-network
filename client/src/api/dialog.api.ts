import { coreApi, handleError, handleResponse } from './core.api';
import { DialogType, MessageType, UserItemDataType } from '../types/types';

type DialogDataType = {
    dialog: {
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        users: Array<UserItemDataType>,
        messages: Array<MessageType>
    }
}

type DialogsDataType = {
    dialogs: Array<DialogType>
}

export const dialogApi = {
  getDialogs: () => coreApi
    .get('/dialog')
    .then(handleResponse<DialogsDataType>())
    .catch(handleError()),
  getMessages: (username: string) => coreApi
    .get(`/dialog/${username}`)
    .then(handleResponse<DialogDataType>())
    .catch(handleError()),
  markMessageAsRead: (messageId: string) => coreApi
    .patch(`/message/${messageId}`)
    .then(handleResponse<{message: MessageType, unreadMessagesCount: number}>())
    .catch(handleError()),
};
