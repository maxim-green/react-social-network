import { coreApi, handleError, handleResponse } from './core.api';
import { UserItemDataType } from '../types/types';

// GET /users/
// used for getting users list on users page
export type UsersDataType = {
    users: Array<UserItemDataType>
}

export const userApi = {
  getUsers: () => coreApi
    .get('/user')
    .then(handleResponse<UsersDataType>())
    .catch(handleError()),
  subscribe: (userId: string) => coreApi
    .post(`/subscription/${userId}`)
    .then(handleResponse())
    .catch(handleError()),
  unsubscribe: (userId: string) => coreApi
    .delete(`/subscription/${userId}`)
    .then(handleResponse())
    .catch(handleError()),
};
