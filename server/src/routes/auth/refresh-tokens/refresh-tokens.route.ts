import express from 'express'

import {Request, Response} from 'types'
import {refreshTokens} from 'services'

const router = express.Router()

// /api/auth/refresh-tokens
router.post('/',
    async (req: Request, res: Response) => {
        try {
            const {accessToken, refreshToken} = await refreshTokens(req.cookies.refreshToken)
            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Success"})
        } catch (e) {
            res.handleError(e)
        }
    }
)

export default router