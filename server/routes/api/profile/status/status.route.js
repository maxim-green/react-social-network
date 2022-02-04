const router = require('express').Router()
const { auth, requireAuth } = require('../../../../middleware/auth.middleware')

router.put('/', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const { status } = req.body

        user.profile.status = status
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router