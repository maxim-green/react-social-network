const express = require('express')
const router = express.Router()
const {User} = require('../../../models/User')
const {auth, requireAuth} = require('../../../middleware/auth.middleware')

router.get('/',
    auth,
    async (req, res, next) => {
        try {
            if (req.query.subscribed) return next()

            const users = await User.find().select('username firstName lastName avatar subscriptions').lean()

            return res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: {
                    users: users,
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    },
    requireAuth,
    async (req, res) => {
        try {
            const subscriptions = await User.find({_id: {$in: req.user.subscriptions}}).select('username firstName lastName avatar subscriptions').lean()

            return res.status(200).json({resultCode: 0, message: 'Success', data: {users: subscriptions}})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

module.exports = router