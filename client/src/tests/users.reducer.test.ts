import {follow, unfollow, usersActions, usersReducer, UsersStateType} from '../redux/reducers/users.reducer'

import {APIResponseType, ResultCodes} from '../api/core.api'

jest.mock('../api/users.api')
import {usersApi} from '../api/users.api'
const mockUsersApi = usersApi as jest.Mocked<typeof usersApi>

const dispatchMock = jest.fn()  // фейковый dispatch
const getStateMock = jest.fn() // фейковая функция getState

let dummyState: UsersStateType
// Т.к. тесты могут менять стейт инициализируем стейт заново перед каждым тестом
beforeEach(() => {
    dummyState = {
        users: [
            {
                userId: '1',
                avatar: {large: null, small: null},
                lastName: 'Ivanov',
                firstName: 'Ivan',
                username: 'ivanov.i',
                isSubscription: false
            },
            {
                userId: '2',
                avatar: {large: null, small: null},
                lastName: 'Petrov',
                firstName: 'Petr',
                username: 'petrov.p',
                isSubscription: false
            },
            {
                userId: '3',
                avatar: {large: null, small: null},
                lastName: 'Smirnov',
                firstName: 'Anton',
                username: 'smirnov.a',
                isSubscription: true
            },
            {
                userId: '4',
                avatar: {large: null, small: null},
                lastName: 'Smirnov',
                firstName: 'Anton',
                username: 'smirnov.a',
                isSubscription: true
            }
        ],
        outgoingFriendshipRequests: [],
        incomingFriendshipRequests: []
    }

    dispatchMock.mockClear()
    getStateMock.mockClear()
    mockUsersApi.addSubscription.mockClear()
    mockUsersApi.deleteSubscription.mockClear()

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

        mockUsersApi.addSubscription.mockResolvedValue(ApiResponse)

        const thunk = follow('1')
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

        mockUsersApi.deleteSubscription.mockResolvedValue(ApiResponse)

        const thunk = unfollow('1')
        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toBeCalledWith(usersActions.setIsSubscription('1', false))
    })

})
