const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')


// /api/users
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
                },
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
                ...friend,
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