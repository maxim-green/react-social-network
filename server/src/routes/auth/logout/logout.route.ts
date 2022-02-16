import express from 'express'

import { auth, requireAuth } from 'middleware/index'
import {Request, Response} from 'types/index'
import {logoutUser} from 'services'

const router = express.Router()

// /coreApi/auth/logout
router.delete('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        await logoutUser(req.user)

        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .json({resultCode: 0, message: "Success"})
    } catch (e) {
        res.handleError(e)
    }
})

export default router