const router = require('express').Router()

router.use('/docs', require('./docs'))
router.use('/auth', require('./auth/auth.route'))
router.use('/profile', require('./profile/profile.route'))
router.use('/dialogs', require('./dialogs/dialogs.route'))
router.use('/users', require('./users/users.route'))
router.use('/posts', require('./posts/posts.route'))
router.use('/follow', require('./follow/follow.route'))
router.use('/friendship', require('./friendship'))

module.exports = router