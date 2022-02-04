const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

// /api/follow/:targetUserId
router.post('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {targetUserId} = req.params
        if (user.subscriptions.includes(targetUserId)) return res.status(409).json({
            resultCode: 1,
            message: 'Resource conflict'
        })

        user.subscriptions.push(targetUserId)
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/follow/:targetUserId
router.delete('/:targetUserId', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {targetUserId} = req.params
        if (!user.subscriptions.includes(targetUserId)) return res.status(404).json({
            resultCode: 1,
            message: 'Requested resource not found'
        })

        const index = user.subscriptions.indexOf(targetUserId)
        user.subscriptions.splice(index, 1)
        user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router