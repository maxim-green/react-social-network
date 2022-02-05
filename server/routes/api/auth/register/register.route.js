const express = require('express')
const router = express.Router()
const User = require('../../../../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

router.post('/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
        check('username', 'Username length should be at least 6 characters').isLength({min: 6}),
        check('firstName', 'Invalid first name').exists({checkFalsy: true}).not().isNumeric(),
        check('lastName', 'Invalid last name').exists({checkFalsy: true}).not().isNumeric(),
    ],
    async (req, res) => {
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
                return res.status(400).json({resultCode: 1, message: "User with this email already exists"})
            }
            candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({resultCode: 1, message: "User with this user name already exists "})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                registrationDate: new Date(),
                email,
                password: hashedPassword,
                username,
                profileData: { firstName, lastName }
            })
            await newUser.save()
            res.status(200).json({resultCode: 0, message: "Registration successful"})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

module.exports = router