import express, {Request, Response} from 'express'

import { auth, requireAuth } from 'middleware'
import {updateStatus} from 'services'

const router = express.Router()

router.put('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        await updateStatus(req.user, req.body.status)

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.handleError(e)
    }
})

export default router