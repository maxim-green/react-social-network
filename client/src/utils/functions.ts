import moment from 'moment'

export const capitalize = (sourceString: string): string => {
    return sourceString.charAt(0).toUpperCase() + sourceString.slice(1)
}

export const formatDate = (date: Date | string, format: string = 'DD.MM.YYYY') => {
    return moment(date).format(format)
}

