const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const {removeItem} = require('../../../utils')
const User = require('../../../models/User')


// Endpoint to cancel friendship request to user.
// /api/friendship/cancel/:targetUserId
router.delete('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

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

module.exports = router