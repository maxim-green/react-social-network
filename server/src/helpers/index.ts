export * from './error.helpers'
export * from './jwt.helpers'

export const removeItem = <T = any>(array: Array<T>, value: T) => {
    const index = array.indexOf(value)
    if (index > -1) {
        array.splice(index, 1)
    }
}