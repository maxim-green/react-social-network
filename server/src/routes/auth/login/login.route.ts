import express, {Request, Response} from 'express'
import {check, validationResult} from 'express-validator'

import {throwValidationError} from 'helpers'
import {loginUser} from 'services'

const router = express.Router()

const validators = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
]
// /coreApi/auth/login
router.post('/',
    validators,
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throwValidationError(errors.array())

            const {accessToken, refreshToken} = await loginUser(req.body)

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