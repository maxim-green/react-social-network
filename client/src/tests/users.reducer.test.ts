import {subscribe, unsubscribe, usersActions, usersReducer, UsersStateType} from '../store/reducers/users.reducer'

import {APIResponseType, ResultCodes} from '../api/core.api'

jest.mock('../api/users.api')
import {userApi} from '../api/user.api'
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
                subscriptions: []
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
    }

    dispatchMock.mockClear()
    getStateMock.mockClear()
    mockUsersApi.subscribe.mockClear()
    mockUsersApi.unsubscribe.mockClear()

})


describe('Users reducer is OK', () => {

    test('Follow action success', () => {
        const newState = usersReducer(dummyState, usersActions.setIsSubscription('2', true))

        expect(newState.users[0].isSubscription).toBeFalsy()
        expect(newState.users[1].isSubscription).toBeTruthy()
    })

    test('Unfollow action success', () => {
        const newState = usersReducer(dummyState, usersActions.setIsSubscription('3', false))

        expect(newState.users[2].isSubscription).toBeFalsy()
        expect(newState.users[3].isSubscription).toBeTruthy()
    })

    test('Follow thunk success', async () => {
        const ApiResponse: APIResponseType<{}> = {
            resultCode: ResultCodes.success,
            message: 'Success',
            data: {}
        }

        mockUsersApi.subscribe.mockResolvedValue(ApiResponse)

        const thunk = subscribe('1')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toBeCalledWith(usersActions.setIsSubscription('1', true))
    })

    test('Unfollow thunk success', async () => {
        const ApiResponse: APIResponseType<{}> = {
            resultCode: ResultCodes.success,
            message: 'Success',
            data: {}
        }

        mockUsersApi.unsubscribe.mockResolvedValue(ApiResponse)

        const thunk = unsubscribe('1')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toBeCalledWith(usersActions.setIsSubscription('1', false))
    })

})
