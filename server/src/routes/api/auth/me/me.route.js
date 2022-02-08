const express = require('express')
const router = express.Router()
const { auth, requireAuth } = require('../../../../middleware/auth.middleware')

// /coreApi/auth/me
router.get('/', auth, requireAuth, async (req, res) => {
    try {
        res.status(200).json({resultCode: 0, message: "Authorized", data: {user: req.user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router