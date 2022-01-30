const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/profile', require('./profile'))
router.use('/dialogs', require('./dialogs'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/follow', require('./follow'))

module.exports = router