import express from 'express'

import {User} from 'models'
import {auth, requireAuth} from 'middleware'
import {Request, Response} from 'types'

import avatarRouter from './avatar/avatar.route'
import coverRouter from './cover/cover.route'
import statusRouter from './status/status.route'

const router = express.Router()

router.use('/avatar', avatarRouter)
router.use('/cover', coverRouter)
router.use('/status', statusRouter)

router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User
            .findOne({username})
            .populate('profile')
            .select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')

        if (!user) return res.status(404).json({ resultCode: 1, message: 'Requested resource not found' })

        res.status(200).json({resultCode: 0, message: 'Success', data: {user: user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

router.put('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        const {firstName, lastName, ...profile} = req.body
        user.firstName = firstName
        user.lastName = lastName
        user.profile = {...user.profile, ...profile}
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

export default router