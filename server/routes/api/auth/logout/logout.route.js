const express = require('express')
const router = express.Router()
const { auth, requireAuth } = require('../../../../middleware/auth.middleware')

// /coreApi/auth/logout
router.delete('/', auth, requireAuth, async (req, res) => {
    try {
        const { user } = req

        user.refreshToken = ""
        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .json({resultCode: 0, message: "Success"})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router