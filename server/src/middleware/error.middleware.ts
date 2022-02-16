import {Request, Response, NextFunction} from 'types'
import {HTTPError} from '../utils'

export const withErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    res.handleError = (e) => {
        if (e instanceof HTTPError) {
            return res
                .status(e.statusCode)
                .json(e.responseData)
        }
        console.log(e)
        return res
            .status(500)
            .json({resultCode: 1, message: 'Something went wrong :('})
    }
    next()
}