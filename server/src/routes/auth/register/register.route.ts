import express from 'express'
import bcrypt from 'bcryptjs'
import {check, validationResult} from 'express-validator'

import {User} from 'models/index'
import {Request, Response} from 'types/index'

const router = express.Router()

router.post('/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
        check('username', 'Username length should be at least 6 characters').isLength({min: 6}),
        check('firstName', 'Invalid first name').exists({checkFalsy: true}).not().isNumeric(),
        check('lastName', 'Invalid last name').exists({checkFalsy: true}).not().isNumeric(),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    message: 'Invalid registration data',
                    errors: errors.array()
                })
            }

            const {email, password, username, firstName, lastName} = req.body

            let candidate = await User.findOne({email})
            if (candidate) {
                return res.status(409).json({resultCode: 1, message: "User with this email already exists"})
            }
            candidate = await User.findOne({username})
            if (candidate) {
                return res.status(409).json({resultCode: 1, message: "User with this user name already exists "})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                registrationDate: new Date(),
                email,
                password: hashedPassword,
                username,
                firstName,
                lastName
            })
            await newUser.save()
            res.status(200).json({resultCode: 0, message: "Success"})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

export default router