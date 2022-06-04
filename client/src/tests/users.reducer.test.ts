import {subscribe, unsubscribe, usersActions, usersReducer, UsersStateType} from '../store/reducers/users.reducer'
import {getAuthUserData} from 'store/reducers/auth.reducer'

import {APIResponseType, ResultCodes} from '../api/core.api'

import {userApi} from 'api/user.api'
jest.mock('api/user.api')


const mockUsersApi = userApi as jest.Mocked<typeof userApi>

const dispatchMock = jest.fn()  // фейковый dispatch
const getStateMock = jest.fn() // фейковая функция getState

let dummyState: UsersStateType
// Т.к. тесты могут менять стейт инициализируем стейт заново перед каждым тестом
beforeEach(() => {
    dummyState = {
        users: [
            {
                _id: '1',
                avatar: {large: null, small: null},
                lastName: 'Ivanov',
                firstName: 'Ivan',
                username: 'ivanov.i',
                updatedAt: (new Date()).toString(),
                subscriptions: [
                    {
                        _id: '2',
                        avatar: {large: null, small: null},
                        lastName: 'Petrov',
                        firstName: 'Petr',
                        username: 'petrov.p',
                        updatedAt: (new Date()).toString(),
                        subscriptions: []
                    },
                    {
                        _id: '4',
                        avatar: {large: null, small: null},
                        lastName: 'Smirnov',
                        firstName: 'Anton',
                        username: 'smirnov.a',
                        updatedAt: (new Date()).toString(),
                        subscriptions: []
                    }
                ]
            },
            {
                _id: '2',
                avatar: {large: null, small: null},
                lastName: 'Petrov',
                firstName: 'Petr',
                username: 'petrov.p',
                updatedAt: (new Date()).toString(),
                subscriptions: []
            },
            {
                _id: '3',
                avatar: {large: null, small: null},
                lastName: 'Smirnov',
                firstName: 'Anton',
                username: 'smirnov.a',
                updatedAt: (new Date()).toString(),
                subscriptions: []
            },
            {
                _id: '4',
                avatar: {large: null, small: null},
                lastName: 'Smirnov',
                firstName: 'Anton',
                username: 'smirnov.a',
                updatedAt: (new Date()).toString(),
                subscriptions: []
            }
        ],
        subscribePendingUserIds: []
    }

    dispatchMock.mockClear()
    getStateMock.mockClear()
    mockUsersApi.subscribe.mockClear()
    mockUsersApi.unsubscribe.mockClear()

})


describe('Users reducer is OK', () => {

    test('Follow thunk success', async () => {
        const ApiResponse: APIResponseType<{}> = {
            resultCode: ResultCodes.success,
            message: 'Success',
            data: {}
        }

        mockUsersApi.subscribe.mockResolvedValue(ApiResponse)

        const userId = '1'
        const thunk = subscribe(userId)
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toBeCalledWith(usersActions.addSubscribePendingUserId(userId))
        expect(dispatchMock).toBeCalledWith(usersActions.deleteSubscribePendingUserId(userId))
    })

    test('Unfollow thunk success', async () => {
        const ApiResponse: APIResponseType<{}> = {
            resultCode: ResultCodes.success,
            message: 'Success',
            data: {}
        }

        mockUsersApi.unsubscribe.mockResolvedValue(ApiResponse)

        const userId = '1'
        const thunk = unsubscribe(userId)
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toBeCalledWith(usersActions.addSubscribePendingUserId(userId))
        expect(dispatchMock).toBeCalledWith(usersActions.deleteSubscribePendingUserId(userId))
    })

})
