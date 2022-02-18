import express from 'express'

import { auth, requireAuth } from 'middleware'
import { Request, Response } from 'types'

const router = express.Router()

// /coreApi/auth/me
router.get('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        res.status(200).json({resultCode: 0, message: "Authorized", data: {user: req.user.toObject()}})
    } catch (e) {
        res.handleError(e)
    }
})

export default router