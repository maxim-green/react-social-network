import express, {Request, Response} from 'express'

import {auth} from 'middleware'
import {getUsers} from 'services'

import postsRouter from './posts'
import subscriptionsRouter from './subscriptions'

const router = express.Router()

router.use('/', postsRouter)
router.use('/subscriptions', subscriptionsRouter)

router.get('/',
    auth,
    async (req: Request, res: Response) => {
        try {
            const users = await getUsers()

            return res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: {users}
            })
        } catch (e) {
            res.handleError(e)
        }
    }
)

export default router