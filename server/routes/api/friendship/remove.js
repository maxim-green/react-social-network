const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const User = require('../../../models/User')
const {removeItem} = require('../../../utils')

// Endpoint to remove user from friends
// /api/friendship/remove/:targetUserId
router.delete('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {targetUserId} = req.params
        if (!user.friends.includes(targetUserId)) return res.status(400).json({resultCode: 1, message: 'Not a friend'})

        removeItem(user.friends, targetUserId)
        user.save()
        await User.findByIdAndUpdate(targetUserId, {$pull: { friends: user.id }})

        res.status(200).json({resultCode: 0, message: 'Friend successfully removed'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router