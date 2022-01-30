const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const auth = require('../../../middleware/auth.middleware')


// /api/users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('username firstName lastName avatar').lean()
        console.log(users[0])
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
})

// /api/users/friends
router.get('/friends/', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const friends = await User.find({_id: {$in: user.friends}}).select('username firstName lastName avatar').lean()

        const responseFriends = friends.map(friend => ({
            ...friend,
            // todo
            // mutualFriends: user.friends.filter(userFriend => friend.friends.includes(userFriend)),
            // mutualSubscriptions: user.subscriptions.filter(userSubscription => friend.subscriptions.includes(userSubscription))
        }))

        return res.status(200).json({resultCode: 0, message: 'Success', data: {friends: responseFriends}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// initiator creates new friendship
// /api/users/friend/:targetUserId
router.post('/friend/:targetUserId', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        const targetUser = await User.findById(targetUserId)

        if (!targetUser) return res.status(400).json({resultCode: 1, message: 'User does not exist'})
        if (user.friends.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'User is already in friends'
        })
        if (user.outgoingFriendshipRequests.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'Friendship request is already exists'
        })

        user.outgoingFriendshipRequests.push(targetUserId)
        await user.save()
        targetUser.incomingFriendshipRequests.push(user.id)
        await targetUser.save()

        res.status(200).json({resultCode: 0, message: 'Friendship request created'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

const removeItem = (array, value) => {
    const index = array.indexOf(value)
    if (index > -1) {
        array.splice(index, 1)
    }
}

// reciever accepts friendship
// /api/users/friend/:targetUserId/accept
router.post('/friend/:targetUserId/accept', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        const targetUser = await User.findById(targetUserId)

        if (targetUserId === user.id) return res.status(400).json({resultCode: 1, message: 'Wrong id'})
        if (!user.incomingFriendshipRequests.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })
        if (!targetUser.outgoingFriendshipRequests.includes(user.id)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })

        user.friends.push(targetUserId)
        targetUser.friends.push(user.id)

        removeItem(user.incomingFriendshipRequests, targetUserId)
        user.save()
        removeItem(targetUser.outgoingFriendshipRequests, user.id)
        targetUser.save()

        res.status(200).json({resultCode: 0, message: 'Friend successfully added'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// reciever declines friendship
// /api/users/friend/:targetUserId/decline
router.post('/friend/:targetUserId/decline', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        const targetUser = await User.findById(targetUserId)

        if (targetUserId === user.id) return res.status(400).json({resultCode: 1, message: 'Wrong id'})
        if (!user.incomingFriendshipRequests.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })
        if (!targetUser.outgoingFriendshipRequests.includes(user.id)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })

        removeItem(user.incomingFriendshipRequests, targetUserId)
        user.save()
        removeItem(targetUser.outgoingFriendshipRequests, user.id)
        targetUser.save()

        res.status(200).json({resultCode: 0, message: 'Friendship declined'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// initiator cancels friendship
// /api/users/friend/:targetUserId/cancel
router.post('/friend/:targetUserId/cancel', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        const targetUser = await User.findById(targetUserId)

        if (targetUserId === user.id) return res.status(400).json({resultCode: 1, message: 'Wrong id'})
        if (!user.outgoingFriendshipRequests.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })
        if (!targetUser.incomingFriendshipRequests.includes(user.id)) return res.status(400).json({
            resultCode: 1,
            message: 'Wrong id'
        })

        removeItem(user.outgoingFriendshipRequests, targetUserId)
        user.save()
        removeItem(targetUser.incomingFriendshipRequests, user.id)
        targetUser.save()

        res.status(200).json({resultCode: 0, message: 'Friendship request canceled'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/users/friend/:targetUserId
router.delete('/friend/:targetUserId', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        if (!user.friends.includes(targetUserId)) return res.status(400).json({resultCode: 1, message: 'Not a friend'})

        const index = user.friends.indexOf(targetUserId)
        user.friends.splice(index, 1)
        user.save()
        // await User.findByIdAndUpdate(req.userId, {$pull: { friends: targetUserId }})

        res.status(200).json({resultCode: 0, message: 'Friend successfully removed'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router