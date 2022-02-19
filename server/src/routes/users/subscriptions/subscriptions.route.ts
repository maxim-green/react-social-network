import express, {Request, Response} from 'express'

import {auth, requireAuth} from 'middleware'
import {getUserSubscriptions} from 'services'

const router = express.Router()

// todo: fill doc file
// /api/users/subscriptions
router.get('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const subscriptions = await getUserSubscriptions(req.user)

        return res.status(200).json({resultCode: 0, message: 'Success', data: {subscriptions}})
    } catch(e) {
        res.handleError(e)
    }
})

export default router
