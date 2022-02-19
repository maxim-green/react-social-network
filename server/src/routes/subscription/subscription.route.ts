import express, {Request, Response} from 'express'

import {auth, requireAuth} from 'middleware'
import {createSubscription, deleteSubscription} from 'services'
const router = express.Router()

// /api/subscription/:targetUserId
router.post('/:targetUserId', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        await createSubscription(req.user, req.params.targetUserId)

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.handleError(e)
    }
})

// /api/subscription/:targetUserId
router.delete('/:targetUserId', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        await deleteSubscription(req.user, req.params.targetUserId)

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.handleError(e)
    }
})

export default router
