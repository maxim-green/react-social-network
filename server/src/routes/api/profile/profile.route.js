const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

router.use('/avatar', require('./avatar/avatar.route'))
router.use('/cover', require('./cover/cover.route'))
router.use('/status', require('./status/status.route'))

router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User
            .findOne({username})
            .populate('profile')
            .select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')

        if (!user) return res.status(404).json({ resultCode: 1, message: 'Requested resource not found' })

        res.status(200).json({resultCode: 0, message: 'Success', data: {user: user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

router.put('/', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {firstName, lastName, ...profile} = req.body
        user.firstName = firstName
        user.lastName = lastName
        user.profile = {...user.profile, ...profile}
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


module.exports = router