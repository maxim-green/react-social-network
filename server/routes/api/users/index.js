const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const {auth, requireAuth} = require('../../../middleware/auth.middleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        username:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        avatar:
 *          type: object
 *          properties:
 *            small:
 *              type: string
 *            large:
 *              type: string
 *        isFriend:
 *          type: boolean
 *        isSubscription:
 *          type: boolean
 */

// /api/users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of registered users. Used within users page to retrieve users data.
 *     tags:
 *       - users
 *     parameters:
 *       - in: query
 *         name: isFriend
 *         description: If true return only users which are friends of user who sent request. Must be authorized to use this parameter.
 *         schema:
 *           type: boolean
 *         required: false
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     incomingFriendshipRequests:
 *                       type: array
 *                       description: Array filled with ids
 *                       items:
 *                         type: string
 *                     outgoingFriendshipRequests:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.get('/',
    auth,
    async (req, res, next) => {
        try {
            if (req.query.isFriend) return next()

            const users = await User.find().select('username firstName lastName avatar').lean()
            const {user} = req
            let responseUsers
            if (user) {
                const {friends, subscriptions} = user
                responseUsers = users.map(user => ({
                    ...user,
                    isFriend: friends.includes(user._id),
                    isSubscription: subscriptions.includes(user._id)
                }))
            }

            if (!user) {
                responseUsers = users.map(user => ({
                    ...user,
                    isFriend: false,
                    isSubscription: false
                }))
            }

            const incomingFriendshipRequests = user?.incomingFriendshipRequests || []
            const outgoingFriendshipRequests = user?.outgoingFriendshipRequests || []

            return res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: {
                    users: responseUsers,
                    incomingFriendshipRequests,
                    outgoingFriendshipRequests
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
            const friends = await User.find({_id: {$in: req.user.friends}}).select('username firstName lastName avatar').lean()

            const responseFriends = friends.map(friend => ({
                ...friend
                // todo
                // mutualFriends: user.friends.filter(userFriend => friendship.friends.includes(userFriend)),
                // mutualSubscriptions: user.subscriptions.filter(userSubscription => friendship.subscriptions.includes(userSubscription))
            }))

            return res.status(200).json({resultCode: 0, message: 'Success', data: {friends: responseFriends}})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

module.exports = router