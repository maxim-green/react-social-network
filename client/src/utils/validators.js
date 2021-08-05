export const required = (value) => {
    return !value ? 'This field is required' : undefined
}

export const email = value => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
}

const minLength = (length) => value => {
    return value && !(value.length >= 6) ? `Minimum length is ${length} symbols` : undefined
}
export const minLength6 = minLength(6)