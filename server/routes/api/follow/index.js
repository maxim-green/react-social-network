const router = require('express').Router()
const auth = require('../../../middleware/auth.middleware')

// /api/follow/:targetUserId
router.post('/:targetUserId', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        if (user.subscriptions.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'User is already in subscriptions'
        })

        user.subscriptions.push(targetUserId)
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Subscription successfully added'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/follow/:targetUserId
router.delete('/:targetUserId', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: 'Not authorized'})
        }

        const {targetUserId} = req.params
        if (!user.subscriptions.includes(targetUserId)) return res.status(400).json({
            resultCode: 1,
            message: 'Not a subscription'
        })

        const index = user.subscriptions.indexOf(targetUserId)
        user.subscriptions.splice(index, 1)
        user.save()

        res.status(200).json({resultCode: 0, message: 'Subscription successfully removed'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router