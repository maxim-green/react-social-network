import express, {Request, Response} from 'express'

import {auth, requireAuth} from 'middleware'
import {getUnreadMessagesCount, markMessageAsRead} from 'services'

const router = express.Router()

// /api/message/
router.patch('/:id', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const message = await markMessageAsRead(req.params.id, req.user)
        const unreadMessagesCount = await getUnreadMessagesCount(req.user.id)

        res.status(200).json({resultCode: 0, message: 'Success', data: {message, unreadMessagesCount}})
    } catch (e) {
        res.handleError(e)
    }
})

export default router
