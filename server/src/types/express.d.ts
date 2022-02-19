import {MongooseDocument} from './custom'
import {PopulatedUserType} from './User'

declare global {
    namespace Express {
        export interface Request {
            user?: MongooseDocument<PopulatedUserType>
        }

        export interface Response {
            handleError?: (e: any) => void
        }
    }
}
