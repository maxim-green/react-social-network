import express, {Request, Response} from 'express'
import {check, validationResult} from 'express-validator'

import {registerUser} from 'services'
import {throwValidationError} from 'helpers'

const router = express.Router()

const validators = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
    check('username', 'Username length should be at least 6 characters').isLength({min: 6}),
    check('firstName', 'Invalid first name').exists({checkFalsy: true}).not().isNumeric(),
    check('lastName', 'Invalid last name').exists({checkFalsy: true}).not().isNumeric(),
]

router.post('/',
    validators,
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throwValidationError(errors.array())

            await registerUser(req.body)

            res.status(200).json({resultCode: 0, message: "Success"})
        } catch (e) {
            res.handleError(e)
        }
    }
)

export default router