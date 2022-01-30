const router = require('express').Router()

router.use('/request', require('./request'))
router.use('/accept', require('./accept'))
router.use('/decline', require('./decline'))
router.use('/cancel', require('./cancel'))
router.use('/remove', require('./remove'))

module.exports = router