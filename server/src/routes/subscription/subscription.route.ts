import express from 'express'

import {auth, requireAuth} from 'middleware/index'
import {Request, Response} from 'types/index'
import {User} from 'models/index'
const router = express.Router()

// /api/subscription/:targetUserId
router.post('/:targetUserId', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req
        const targetUser = await User.findById(req.params.targetUserId).lean()

        if (user.subscriptions.includes(targetUser)) return res.status(409).json({
            resultCode: 1,
            message: 'Resource conflict'
        })

        user.subscriptions.push(targetUser)
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/subscription/:targetUserId
router.delete('/:targetUserId', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req
        const targetUser = await User.findById(req.params.targetUserId).lean()

        if (!user.subscriptions.includes(targetUser)) return res.status(404).json({
            resultCode: 1,
            message: 'Requested resource not found'
        })

        const index = user.subscriptions.indexOf(targetUser)
        user.subscriptions.splice(index, 1)
        user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

export default router
