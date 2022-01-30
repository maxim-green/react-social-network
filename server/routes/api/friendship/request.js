const router = require('express').Router()
const User = require('../../../models/User')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

// Endpoint to send friendship request to user.
// /api/friendship/request/:targetUserId
router.post('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

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

module.exports = router