import {ValidationError} from 'express-validator'
import {ErrorResponseData} from 'types'

export class HTTPError {
    statusCode: number
    responseData: ErrorResponseData

    constructor(statusCode: number,
                responseData: ErrorResponseData) {
        this.statusCode = statusCode
        this.responseData = responseData
    }
}

export const throwValidationError = (errors: Array<ValidationError>) => {
    throw new HTTPError(400, {
        resultCode: 1,
        message: 'Invalid input data',
        errors
    })
}