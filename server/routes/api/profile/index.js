const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

router.use('/avatar', require('./avatar'))
router.use('/cover', require('./cover'))
router.use('/status', require('./status'))



// /api/profile/:username
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User
            .findOne({username})
            .populate('profile')
            .select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')

        res.status(200).json({resultCode: 0, message: 'GET Profile:Success', data: {user: user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})



// /api/profile
router.put('/', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {firstName, lastName, ...profile} = req.body
        user.firstName = firstName
        user.lastName = lastName
        user.profile = {...user.profile, ...profile}
        await user.save()

        res.status(200).json({resultCode: 0, message: 'ProfileInfo updated'})
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 10, message: 'Token expired'})
        if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: 'Token invalid'})
        res.status(500).json({resultCode: 1, message: 'Something went wrong2 :('})
    }
})


module.exports = router