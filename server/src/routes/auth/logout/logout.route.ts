import express from 'express'

import { auth, requireAuth } from 'middleware/index'
import {Request, Response} from 'types/index'

const router = express.Router()

// /coreApi/auth/logout
router.delete('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const { user } = req

        user.refreshToken = ""
        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .json({resultCode: 0, message: "Success"})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

export default router