import { userApi } from 'api/user.api';
import {
  subscribe, unsubscribe, usersActions,
} from 'store/reducers/users.reducer';

import { APIResponseType, ResultCodes } from 'api/core.api';

jest.mock('api/user.api');

const mockUsersApi = userApi as jest.Mocked<typeof userApi>;

const dispatchMock = jest.fn(); // фейковый dispatch
const getStateMock = jest.fn(); // фейковая функция getState

// Т.к. тесты могут менять стейт инициализируем стейт заново перед каждым тестом
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  mockUsersApi.subscribe.mockClear();
  mockUsersApi.unsubscribe.mockClear();
});

describe('Users reducer is OK', () => {
  test('Follow thunk success', async () => {
    const ApiResponse: APIResponseType<{}> = {
      resultCode: ResultCodes.success,
      message: 'Success',
      data: {},
    };

    mockUsersApi.subscribe.mockResolvedValue(ApiResponse);

    const userId = '1';
    const thunk = subscribe(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toBeCalledWith(usersActions.addSubscribePendingUserId(userId));
    expect(dispatchMock).toBeCalledWith(usersActions.deleteSubscribePendingUserId(userId));
  });

  test('Unfollow thunk success', async () => {
    const ApiResponse: APIResponseType<{}> = {
      resultCode: ResultCodes.success,
      message: 'Success',
      data: {},
    };

    mockUsersApi.unsubscribe.mockResolvedValue(ApiResponse);

    const userId = '1';
    const thunk = unsubscribe(userId);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toBeCalledWith(usersActions.addSubscribePendingUserId(userId));
    expect(dispatchMock).toBeCalledWith(usersActions.deleteSubscribePendingUserId(userId));
  });
});
