import express from 'express'
import jwt from 'jsonwebtoken'
import {generateTokens} from '../../../../utils'
import { defineUserByRefreshToken } from '../../../../middleware/auth.middleware'
import {Request, Response} from 'types'

const router = express.Router()

// /api/auth/refresh-tokens
router.post('/', defineUserByRefreshToken,
    async (req: Request, res: Response) => {
        try {
            const {user} = req
            if (!user) return res.status(401).json({resultCode: 1, message: "Invalid token"})

            const {accessToken, refreshToken} = await generateTokens(user)
            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Success"})
        } catch (e) {
            console.log(e)
            if (e instanceof jwt.JsonWebTokenError) return res.status(401).json({resultCode: 1, message: "Invalid token"})
            if (e instanceof jwt.TokenExpiredError) return res.status(401).json({resultCode: 1, message: "Invalid token"})
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

export default router