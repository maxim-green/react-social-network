const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

router.use('/avatar', require('./avatar'))
router.use('/cover', require('./cover'))
router.use('/status', require('./status'))

/**
 * @swagger
 * /profile/:username:
 *   get:
 *     summary: Get user profile
 *     description: Get user profile data by passed username
 *     tags:
 *       - profile
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessfulResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/UserProfile'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// /api/profile/:username
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User
            .findOne({username})
            .populate('profile')
            .select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')

        res.status(200).json({resultCode: 0, message: 'Success', data: {user: user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})



/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Update authorized user profile
 *     tags:
 *       - profile
 *     parameters:
 *       - in: body
 *         name: profile
 *         description: New profile data
 *         schema:
 *           $ref: '#/components/schemas/UserProfileUpdatePayload'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       400:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

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