import express, {Request, Response} from 'express'

import {auth, requireAuth} from 'middleware'
import {getUserProfile, updateProfile} from 'services'

import avatarRouter from './avatar/avatar.route'
import coverRouter from './cover/cover.route'
import statusRouter from './status/status.route'


const router = express.Router()

router.use('/avatar', avatarRouter)
router.use('/cover', coverRouter)
router.use('/status', statusRouter)

router.get('/:username', async (req: Request, res: Response) => {
    try {
        const user = await getUserProfile(req.params.username)

        res.status(200).json({resultCode: 0, message: 'Success', data: {user: user.toObject()}})
    } catch (e) {
        res.handleError(e)
    }
})

router.put('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        await updateProfile(req.user, req.body)

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.handleError(e)
    }
})

export default router