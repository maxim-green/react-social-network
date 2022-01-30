const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const {removeItem} = require('../../../utils')
const User = require('../../../models/User')

// Endpoint to accept friendship request from user.
// /api/friendship/accept/:targetUserId
router.put('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

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

module.exports = router