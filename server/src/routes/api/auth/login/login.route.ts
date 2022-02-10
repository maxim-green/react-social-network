import express from 'express'
import {User} from '../../../../models/User'
import bcrypt from 'bcryptjs'
import {check, validationResult} from 'express-validator'
import {generateTokens} from '../../../../utils'
import {Request, Response} from 'types'

const router = express.Router()
// /coreApi/auth/login
router.post('/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    message: 'Invalid login data',
                    errors: errors.array()
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(401).json({resultCode: 1, message: "Wrong e-mail or password"})
            }

            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                return res.status(401).json({resultCode: 1, message: "Wrong e-mail or password"})
            }

            const {accessToken, refreshToken} = await generateTokens(user)

            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Success"})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

export default router