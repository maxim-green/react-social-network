import {follow, usersActions, usersReducer, UsersStateType} from '../redux/reducers/users.reducer'

import {usersApi} from '../api/users.api'
import {APIResponseType, ResultCodes} from '../api/core.api'

jest.mock('../api/users.api')
const usersApiMock = usersApi

const result: APIResponseType<{}> = {
    resultCode: ResultCodes.success,
    message: 'Success',
    data: {}
}

// @ts-ignore
usersApiMock.addSubscription.mockReturnValue(result)

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
})


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

// todo: https://youtu.be/asJetd53pYw?list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN&t=2639
test('Follow thunk success', async () => {
    const thunk = follow('1')
    const dispatchMock = jest.fn()  // фейковый dispatch

    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})