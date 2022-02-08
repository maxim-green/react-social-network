const express = require('express')
const router = express.Router()

router.use('/register', require('./register/register.route'))
router.use('/refresh-tokens', require('./refresh-tokens/refresh-tokens.route'))
router.use('/login', require('./login/login.route'))
router.use('/logout', require('./logout/logout.route'))
router.use('/me', require('./me/me.route'))

module.exports = router