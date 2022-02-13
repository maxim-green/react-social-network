import express from 'express'

import { auth, requireAuth } from 'middleware/index'
import {Request, Response} from 'types/index'

const router = express.Router()

router.put('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        const { status } = req.body

        user.status = status
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

export default router