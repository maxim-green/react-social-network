import express from 'express'

import {auth, requireAuth} from 'middleware'
import {User} from 'models'
import {Request, Response, NextFunction} from 'types'

const router = express.Router()

router.get('/',
    auth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.query.subscribed) return next()

            const users = await User.find().select('username firstName lastName avatar subscriptions').lean()

            return res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: {
                    users: users,
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    },
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            const subscriptions = await User.find({_id: {$in: req.user.subscriptions}}).select('username firstName lastName avatar subscriptions').lean()

            return res.status(200).json({resultCode: 0, message: 'Success', data: {users: subscriptions}})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

export default router