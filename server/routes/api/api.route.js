const router = require('express').Router()

router.use('/docs', require('./docs'))
router.use('/auth', require('./auth'))
router.use('/profile', require('./profile/profile.route'))
router.use('/dialogs', require('./dialogs'))
router.use('/users', require('./users/users.route'))
router.use('/posts', require('./posts/posts.route'))
router.use('/follow', require('./follow'))
router.use('/friendship', require('./friendship'))

module.exports = router